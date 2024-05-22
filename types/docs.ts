import type { DocumentData } from "firebase/firestore";

export interface BookingDoc extends DocumentData {
  [key: string]: {
    title: string;
    start: string;
    end: string;
    extendedProps: {
      email: string;
      room: string;
      block: string;
    };
  }[];
}
