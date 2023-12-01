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

definePageMeta({
  title: "Booking",
  description: "Book a laptop cart",
});

const router = useRouter();
const route = useRoute("laptops-booking");

const dayjs = useDayjs();

const prompt = ref(false);

const calendar = ref();

const metaData = ref<DateSelectArg>();

const mouse = ref({
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
  if (!selectInfo.jsEvent) return;

  mouse.value.x = selectInfo.jsEvent.clientX - selectInfo.jsEvent.offsetX;
  mouse.value.y = selectInfo.jsEvent.clientY - selectInfo.jsEvent.offsetY;
  prompt.value = true;

  let calendarApi = selectInfo.view.calendar;

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

  prompt.value = false;
  newEvent.value = { name: "", cart: "", block: "" };
};

const cancel = () => {
  newEvent.value = { name: "", cart: "", block: "" };
  prompt.value = false;
};
</script>

<template>
  <div
    class="absolute z-50 duration-200 ease-in-out transition-all"
    :style="`top: ${mouse.y}px; left: ${mouse.x}px;`"
    v-if="prompt"
  >
    <div class="card bg-base-300 border">
      <div class="card-body">
        <div class="form-control gap-2">
          <span> </span>
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
            <Button class="btn-error w-full" @click="cancel()" tooltip="cancel">
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
</template>
