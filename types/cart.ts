import { z } from "zod";

export const Cart = z.object({
  id: z.number().min(1).max(10),
  name: z.string(),
  location: z.string(),
});

export type Cart = z.infer<typeof Cart>;
