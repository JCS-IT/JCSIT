import type { z } from "zod";
import type { NewEventSchema } from "~/shared";

export * from "./docs";
export * from "./funny";

export type NewEvent = z.infer<typeof NewEventSchema>;

export interface Laptop {
  id: string;
  cart: number;
  exists: boolean;
}

export interface Cart {
  id: number;
  name: string;
  location: {
    room: string;
    floor: string | number;
  };
  color: string;
}

export interface Floor {
  name: string;
  carts: Cart[];
}
