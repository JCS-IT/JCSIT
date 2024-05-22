import type {
  CalendarOptions,
  DateSelectArg,
  EventAddArg,
} from "@fullcalendar/core";
import type FullCalendar from "@fullcalendar/vue3";

import dayjs from "#build/dayjs.imports.mjs";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { arrayUnion, doc, runTransaction, updateDoc } from "firebase/firestore";
import { z } from "zod";
import { blocks } from "~/data";
import type { NewEvent } from "~/types";

export const NewEventSchema = z.object({
  name: z.string().min(1),
  email: z
    .string()
    .min(1, { message: "Email required" })
    .email("Please enter a valid email")
    .refine((e) => e.endsWith("@cbe.ab.ca"), {
      message: "Please enter a valid CBE email",
    }),
  room: z.number().min(4).max(4).or(z.null()),
  block: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
});

export const BaseCalendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  nowIndicator: true,
  editable: true,
  weekends: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  defaultAllDay: false,
  height: "49rem",
  windowResizeDelay: 0,
  selectLongPressDelay: 0,
};

export const handleDateSelect = (
  selectInfo: DateSelectArg,
  targetPose: Ref<{ x: number; y: number }>,
  prompts: Ref<{ create: boolean }>,
  metaData: Ref<DateSelectArg | null>,
  dialog: Ref<HTMLDialogElement | null>,
) => {
  let calendarApi = selectInfo.view.calendar;

  if (!selectInfo.jsEvent) return;

  if (screen.width > 768) {
    targetPose.value.x = selectInfo.jsEvent.x - selectInfo.jsEvent.offsetX;
    targetPose.value.y = selectInfo.jsEvent.y - selectInfo.jsEvent.offsetY;

    targetPose.value.x = Math.min(
      Math.max(targetPose.value.x, 0),
      window.innerWidth - 500,
    );
    targetPose.value.y = Math.min(
      Math.max(targetPose.value.y, 0),
      window.innerHeight - 640,
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

export const addEvent = (
  data: NewEvent,
  calendar: Ref<typeof FullCalendar>,
  metaData: Ref<DateSelectArg | null>,
  prompts: Ref<{ create: boolean }>,
  dialog: Ref<HTMLDialogElement | null>,
) => {
  if (
    !data.name ||
    !data.email ||
    !data.room ||
    !data.block.start ||
    !data.block.end
  )
    return;

  const startBlock = blocks.find((b) => b.name == data.block.start);
  const endBlock = blocks.find((b) => b.name == data.block.end);

  if (!startBlock || !endBlock) return;

  const calendarApi = calendar.value?.getApi();

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

export const addBooking = async (e: EventAddArg, target: string) => {
  const ref = doc(useFirestore(), "bookings", dayjs().year().toString());
  const { title, startStr: start, endStr: end, extendedProps } = e.event;
  const payload = {
    [target]: arrayUnion({
      title,
      start,
      end,
      extendedProps,
    }),
  };

  await runTransaction(useFirestore(), async (t) => {
    const doc = await t.get(ref);

    if (doc.exists()) {
      t.update(ref, payload);
    } else {
      t.set(ref, payload);
    }
  });
};

export const removeBooking = async (e: EventAddArg, target: string) => {
  const ref = doc(useFirestore(), "bookings", dayjs().year().toString());
  const { title, startStr: start, endStr: end, extendedProps } = e.event;
  const payload = {
    [target]: arrayUnion({
      title,
      start,
      end,
      extendedProps,
    }),
  };

  await updateDoc(ref, payload);
};
