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

export interface ConfigDoc extends DocumentData {
  blocks: {
    name: string;
    start: string;
    end: string;
  }[];

  floors: {
    name: string;
    carts: {
      id: number;
      name: string;
      location: {
        room: string;
        floor: string | number;
      };
      color: string;
    }[];
    rooms: {
      name: string;
      floor: number;
    }[];
  }[];
}
