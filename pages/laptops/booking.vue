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

definePageMeta({
  title: "Booking",
  description: "Book a laptop cart",
});

const router = useRouter();
const route = useRoute("laptops-booking");

const prompt = ref(false);

const mouse = ref({
  x: 0,
  y: 0,
});

const currentEvents = ref<EventApi[]>([]);

const handleDateSelect = (selectInfo: DateSelectArg) => {
  if (!selectInfo.jsEvent) return;

  mouse.value.x = selectInfo.jsEvent.clientX - selectInfo.jsEvent.offsetX + 30;
  mouse.value.y = selectInfo.jsEvent.clientY - selectInfo.jsEvent.offsetY + 30;
  prompt.value = true;

  // let title = prompt("Please enter a new title for your event");
  let calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // clear date selection

  // if (title) {
  //   calendarApi.addEvent({
  //     id: Math.random().toString(36),
  //     title,
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //     allDay: selectInfo.allDay,
  //   });
  // }
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

const handleEvents = (events: EventApi[]) => {
  currentEvents.value = events;
};

const calendarOptions = ref<CalendarOptions>({
  aspectRatio: 2,
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: [],
  nowIndicator: true,
  editable: true,
  weekends: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  height: "50rem",
});
</script>

<template>
  <div
    class="absolute z-50 duration-200 ease-in-out transition-all"
    :style="`top: ${mouse.y}px; left: ${mouse.x}px;`"
    v-if="prompt"
  >
    <div class="card bg-base-300">
      <div class="card-body">x: {{ mouse.x }} y: {{ mouse.y }}</div>
    </div>
  </div>
  <FullCalendar :options="calendarOptions" />
</template>
