<script setup lang="ts">
import type { CalendarOptions } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const router = useRouter();
const route = useRoute("laptops-booking");

const calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: [
    { title: "event 1", date: "2023-11-29", color: "red" },
    { title: "event 2", date: "2023-11-30", color: "green" },
  ],
};

definePageMeta({
  title: "Booking",
  description: "Book a laptop cart",
});
</script>

<template>
  <div>
    <h1>Cart: {{ route.query.cart }}</h1>
    <FullCalendar :options="calendarOptions" class="w-full h-full" />
  </div>
</template>
