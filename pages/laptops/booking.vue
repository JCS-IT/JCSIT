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
</script>

<template>
  <div>
    <FullCalendar :options="calendarOptions" class="w-full h-full" />
  </div>
</template>
