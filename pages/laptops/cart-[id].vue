<script setup lang="ts">
import type {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/vue3";
import { blocks, carts } from "~/data/mapping";
import { onClickOutside } from "@vueuse/core";

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

onClickOutside(calendar, () => {
  prompts.value.create = false;
  prompts.value.delete = false;
});

const metaData = ref<DateSelectArg>();

const targetPose = ref({
  x: 0,
  y: 0,
});

const newEvent = ref({
  name: "",
  cart: "",
  block: "",
});

const currentEvents = ref<EventApi[]>([]);

const handleDateSelect = (selectInfo: DateSelectArg) => {
  let calendarApi = selectInfo.view.calendar;

  if (!selectInfo.jsEvent) return;

  // set to the mouse position
  targetPose.value.x = selectInfo.jsEvent.x - selectInfo.jsEvent.offsetX * 1.25;
  targetPose.value.y = selectInfo.jsEvent.y - selectInfo.jsEvent.offsetY * 1.25;

  targetPose.value.x = Math.min(
    Math.max(targetPose.value.x, 0),
    window.innerWidth - 350
  );
  targetPose.value.y = Math.min(
    Math.max(targetPose.value.y, 0),
    window.innerHeight - 465
  );

  calendarApi.unselect(); // clear date selection

  prompts.value.create =
    metaData.value?.startStr === selectInfo.startStr
      ? !prompts.value.create
      : true;

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
});

const addEvent = (e: SubmitEvent) => {
  e.preventDefault();
  if (!newEvent.value.name || !newEvent.value.cart || !newEvent.value.block)
    return;

  const cart = carts.find((c) => c.name === newEvent.value.cart);
  // @ts-expect-error - Hack but it works
  const block = blocks[newEvent.value.block];

  if (!cart || !block) return;

  const calendarApi = calendar.value?.getApi();

  calendarApi.addEvent({
    title: newEvent.value.name,
    start: `${metaData.value?.startStr}T${block.start}`,
    end: `${metaData.value?.startStr}T${block.end}`,
    allDay: false,
    extendedProps: {
      cart,
      block: newEvent.value.block,
    },
  });

  prompts.value.create = false;
  newEvent.value = { name: "", cart: "", block: "" };
};

const cancel = () => {
  newEvent.value = { name: "", cart: "", block: "" };
  prompts.value.create = false;
  prompts.value.delete = false;
};
</script>

<template>
  <div class="relative w-full">
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
            <InputText
              placeholder="Name"
              v-model="newEvent.name"
              tooltip="test"
            />
            <InputDropdown
              placeholder="Select a cart"
              :options="
                carts.map((c) => {
                  return {
                    label: `Cart ${c.id} (${c.name.split(' ')[0]} | ${
                      c.location
                    })`,
                    value: c.name,
                  };
                })
              "
              v-model="newEvent.cart"
            />
            <InputDropdown
              :options="[...Array(4).keys()].map((i) => `Block ${i + 1}`)"
              placeholder="Select a block"
              v-model="newEvent.block"
            />
            <div class="grid grid-cols-2 gap-2">
              <Button
                class="btn-success w-full"
                @click="addEvent"
                tooltip="Confirm"
              >
                <Icon name="mdi:check" />
              </Button>
              <Button
                class="btn-error w-full"
                @click="cancel()"
                tooltip="cancel"
              >
                <Icon name="mdi:cancel" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FullCalendar :options="calendarOptions" ref="calendar">
      <template #eventContent="arg">
        <div class="fc-daygrid-event-dot"></div>
        <span class="fc-event-time">{{ arg.event.extendedProps.block }}</span>
        <span class="fc-event-title">{{ arg.event.title }}</span>
      </template>
    </FullCalendar>
  </div>
</template>
