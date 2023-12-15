<script setup lang="ts">
import { blocks } from "@/data";
import type { ConfigData, NewEvent } from "@/types";
import type {
  CalendarApi,
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/vue3";
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

const configData = useDocument<ConfigData>(
  doc(useFirestore(), "global/config"),
);

definePageMeta({
  title: "Booking",
  description: "Book a laptop cart",
  layout: "full-width",
});

const router = useRouter();
const route = useRoute("cart-id");

const dialog = ref<HTMLDialogElement | null>(null);

const prompts = ref({
  create: false,
  delete: false,
});

const calendar = ref();

const metaData = ref<DateSelectArg | null>(null);

const targetPose = ref({
  x: 0,
  y: 0,
});

const handleDateSelect = (selectInfo: DateSelectArg) => {
  let calendarApi = selectInfo.view.calendar;

  if (!selectInfo.jsEvent) return;

  if (screen.width > 768) {
    targetPose.value.x = selectInfo.jsEvent.x - selectInfo.jsEvent.offsetX;
    targetPose.value.y = selectInfo.jsEvent.y - selectInfo.jsEvent.offsetY;

    targetPose.value.x = Math.min(
      Math.max(targetPose.value.x, 0),
      window.innerWidth - 350,
    );
    targetPose.value.y = Math.min(
      Math.max(targetPose.value.y, 0),
      window.innerHeight - 525,
    );

    prompts.value.create =
      metaData.value?.startStr === selectInfo.startStr
        ? !prompts.value.create
        : true;
  } else {
    dialog.value?.showModal();
  }

  calendarApi.unselect(); // clear date selection

  metaData.value = selectInfo;
};

const handleEventClick = (clickInfo: EventClickArg) => {
  if (
    confirm(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`,
    )
  ) {
    clickInfo.event.remove();
  }
};

const cartsData = useDocument(
  doc(useFirestore(), "global/carts").withConverter({
    fromFirestore: (
      snap: QueryDocumentSnapshot<{
        [cart: string]: {
          title: string;
          start: string;
          end: string;
          extendedProps: {
            room: string;
            block: string;
          };
        }[];
      }>,
    ) => {
      const api: CalendarApi = calendar.value?.getApi();

      const data = snap.data();

      api.removeAllEvents();

      data[`cart-${route.params.id}`]?.forEach((event) => {
        api.addEvent({
          title: event.title,
          start: event.start,
          end: event.end,
          extendedProps: event.extendedProps,
        });
      });

      return data[`cart-${route.params.id}`];
    },
    toFirestore: (data) => {
      return data;
    },
  }),
);

const calendarOptions = ref<CalendarOptions>({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  nowIndicator: true,
  editable: true,
  weekends: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  defaultAllDay: false,
  select: handleDateSelect,
  eventClick: handleEventClick,
  height: "50rem",
  windowResizeDelay: 0,
  selectLongPressDelay: 0,
  eventAdd: async (e) => {
    await updateDoc(doc(useFirestore(), "global/carts"), {
      [`cart-${route.params.id}`]: arrayUnion({
        title: e.event.title,
        start: e.event.startStr,
        end: e.event.endStr,
        extendedProps: e.event.extendedProps,
      }),
    });
  },
  eventRemove: async (e) => {
    await updateDoc(doc(useFirestore(), "global/carts"), {
      [`cart-${route.params.id}`]: arrayRemove({
        title: e.event.title,
        start: e.event.startStr,
        end: e.event.endStr,
        extendedProps: e.event.extendedProps,
      }),
    });
  },
});

const addEvent = (data: NewEvent) => {
  if (!data.name || !data.room || !data.block.start || !data.block.end) return;

  const startBlock = blocks[data.block.start];
  const endBlock = blocks[data.block.end];

  const calendarApi: CalendarApi = calendar.value?.getApi();

  calendarApi.addEvent({
    title: `${data.name} - ${data.room}`,
    start: `${metaData.value?.startStr}T${startBlock.start}`,
    end: `${metaData.value?.startStr}T${endBlock.end}`,
    extendedProps: {
      room: data.room,
      block: `${data.block.start} ${
        data.block.end === data.block.start
          ? ""
          : "- " + data.block.end.split(" ")[1]
      }`,
    },
  });

  prompts.value.create = false;
  dialog.value?.close();
};
</script>

<template>
  <div class="relative w-full" v-if="configData">
    <dialog ref="dialog" class="modal">
      <NewBooking
        :metaData="metaData"
        @submit="addEvent"
        @cancel="dialog?.close()"
        class="modal-box"
        :blocks="configData?.blocks"
      />
    </dialog>
    <Transition>
      <div
        :style="`top: ${targetPose.y}px; left: ${targetPose.x}px`"
        class="absolute z-50 duration-200 ease-in-out transition-all"
        v-if="prompts.create"
      >
        <NewBooking
          :metaData="metaData"
          @submit="addEvent"
          @cancel="prompts.create = false"
          :blocks="configData?.blocks"
        />
      </div>
    </Transition>

    <FullCalendar :options="calendarOptions" ref="calendar">
      <template #eventContent="arg">
        <div class="fc-daygrid-event-dot"></div>
        <span class="fc-event-time">{{ arg.event.extendedProps.block }}</span>
        <span class="fc-event-title">{{ arg.event.title }}</span>
      </template>
    </FullCalendar>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 150ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
