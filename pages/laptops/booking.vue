<script setup lang="ts">
import type {
  CalendarOptions,
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventSourceInput,
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

const targetCart = ref<number | null>(null);

const events = ref<EventSourceInput[]>([
  [
    { title: "event 1", date: "2023-11-29", color: "red" },
    { title: "event 2", date: "2023-11-30", color: "green" },
  ],
  [
    { title: "event 4", date: "2023-11-30", color: "green" },
    { title: "event 3", date: "2023-11-29", color: "red" },
  ],
]);

const currentEvents = ref<EventApi[]>([]);

const handleDateSelect = (selectInfo: DateSelectArg) => {
  let title = prompt("Please enter a new title for your event");
  let calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: Math.random().toString(36),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }
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
});

watch(targetCart, (cart) => {
  if (cart) {
    calendarOptions.value.events = events.value[cart - 1];
  }
});
</script>

<template>
  <div class="flex gap-2">
    <Button v-for="number in 10" :key="number" @click="targetCart = number">
      {{ number }}
    </Button>
  </div>
  <div v-if="targetCart">
    <FullCalendar :options="calendarOptions" class="w-full h-full" />
  </div>
</template>
