<script setup lang="ts">
import type {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/vue3";
import { blocks } from "~/data/mapping";

definePageMeta({
  title: "Booking",
  description: "Book a laptop cart",
  layout: "full-width",
});

const router = useRouter();
const route = useRoute("laptops-cart-id");

const dayjs = useDayjs();

const prompts = ref({
  create: false,
  delete: false,
});

const calendar = ref();

const metaData = ref<DateSelectArg>();

const targetPose = ref({
  x: 0,
  y: 0,
});

const newEvent = ref({
  name: "",
  room: "",
  block: {
    start: "",
    end: "",
  },
});

const handleDateSelect = (selectInfo: DateSelectArg) => {
  let calendarApi = selectInfo.view.calendar;

  if (!selectInfo.jsEvent) return;

  // set to the mouse position
  targetPose.value.x = selectInfo.jsEvent.x - selectInfo.jsEvent.offsetX;
  targetPose.value.y = selectInfo.jsEvent.y - selectInfo.jsEvent.offsetY;

  targetPose.value.x = Math.min(
    Math.max(targetPose.value.x, 0),
    window.innerWidth - 350
  );
  targetPose.value.y = Math.min(
    Math.max(targetPose.value.y, 0),
    window.innerHeight - 550
  );

  prompts.value.create =
    metaData.value?.startStr === selectInfo.startStr
      ? !prompts.value.create
      : true;

  calendarApi.unselect(); // clear date selection

  metaData.value = selectInfo;
};

const handleEventClick = (clickInfo: EventClickArg) => {
  if (
    confirm(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    )
  ) {
    clickInfo.event.remove();
  }
};

const calendarOptions = ref<CalendarOptions>({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  nowIndicator: true,
  editable: true,
  weekends: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  height: "50rem",
  windowResizeDelay: 0,
  selectLongPressDelay: 200,
});

const addEvent = (e: SubmitEvent) => {
  e.preventDefault();
  if (
    !newEvent.value.name ||
    !newEvent.value.room ||
    !newEvent.value.block.start ||
    !newEvent.value.block.end
  )
    return;

  const startBlock = blocks[newEvent.value.block.start];
  const endBlock = blocks[newEvent.value.block.end];

  const calendarApi = calendar.value?.getApi();

  calendarApi.addEvent({
    title: `${newEvent.value.name} - ${newEvent.value.room}`,
    start: `${metaData.value?.startStr}T${startBlock.start}`,
    end: `${metaData.value?.startStr}T${endBlock.end}`,
    allDay: false,
    extendedProps: {
      room: newEvent.value.room,
      block: `${newEvent.value.block.start} ${
        newEvent.value.block.end === newEvent.value.block.start
          ? ""
          : "- " + newEvent.value.block.end.split(" ")[1]
      }`,
    },
  });

  clear();
};

const clear = () => {
  newEvent.value = {
    name: "",
    room: "",
    block: {
      start: "",
      end: "",
    },
  };
  prompts.value.create = false;
  prompts.value.delete = false;
};
</script>

<template>
  <div class="relative w-full">
    <Transition>
      <div
        class="absolute z-50 duration-200 ease-in-out transition-all"
        :style="`top: ${targetPose.y}px; left: ${targetPose.x}px;`"
        v-if="prompts.create"
      >
        <div class="card bg-base-300 border" id="newEventPrompt">
          <div class="card-body">
            <div class="form-control gap-2">
              <h2 class="text-2xl font-bold">New booking</h2>
              <span>{{ dayjs(metaData?.start).format("dddd, MMMM DD") }}</span>
              <!-- Info -->
              <InputBasic
                type="text"
                placeholder="Name"
                v-model="newEvent.name"
              />
              <InputBasic
                type="number"
                placeholder="Room Number"
                v-model="newEvent.room"
              />

              <!-- Blocks -->
              <InputDropdown
                :options="Object.keys(blocks)"
                placeholder="Start block"
                v-model="newEvent.block.start"
                @change="newEvent.block.end = newEvent.block.start"
              />
              <InputDropdown
                :options="Object.keys(blocks)"
                placeholder="End block"
                v-model="newEvent.block.end"
              />
              <div class="grid grid-cols-2 gap-2">
                <Button
                  class="btn-success w-full"
                  @click="addEvent"
                  tooltip="Confirm"
                  :disabled="
                    !newEvent.name ||
                    !newEvent.room ||
                    !newEvent.block.start ||
                    !newEvent.block.end
                  "
                >
                  <Icon name="mdi:check" />
                </Button>
                <Button
                  class="btn-error w-full"
                  @click="clear()"
                  tooltip="cancel"
                >
                  <Icon name="mdi:cancel" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <FullCalendar :options="calendarOptions" ref="calendar">
      <template #eventContent="arg">
        <div class="fc-daygrid-event-dot"></div>
        <span class="fc-event-time">{{ arg.event.extendedProps.block }}</span>
        <span class="fc-event-title">{{ arg.event.title }} - </span>
      </template>
    </FullCalendar>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply duration-100 ease-in-out transition-opacity;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
