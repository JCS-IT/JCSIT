import type { Floor } from "@/types";

export const blocks: Record<string, { start: string; end: string }> = {
  "Before School": {
    start: "07:00",
    end: "09:00",
  },
  "Block 1": {
    start: "09:00",
    end: "10:30",
  },
  "Block 2": {
    start: "10:30",
    end: "12:00",
  },
  Lunch: {
    start: "12:00",
    end: "12:30",
  },
  "Block 3": {
    start: "12:30",
    end: "14:00",
  },
  "Block 4": {
    start: "14:00",
    end: "15:30",
  },
  "After School": {
    start: "15:30",
    end: "22:00",
  },
};

export const FloorMap: Floor[] = [
  {
    name: "Main Floor",
    carts: [
      {
        id: 9,
        name: "Poseidon Cart",
        location: {
          room: "1601",
          floor: "1",
        },
        color: {
          bg: "133955",
          text: "ffffff",
        },
      },
      {
        id: 10,
        name: "Hades Cart",
        location: {
          room: "1601",
          floor: "1",
        },
        color: {
          bg: "615316",
          text: "ffffff",
        },
      },
    ],
  },
  {
    name: "Second Floor",
    carts: [
      {
        id: 5,
        name: "Gold Cart",
        location: {
          room: "LC2",
          floor: "2",
        },
        color: {
          bg: "f0c434",
          text: "000000",
        },
      },
      {
        id: 6,
        name: "Silver Cart",
        location: {
          room: "LC2",
          floor: "2",
        },
        color: {
          bg: "cad3d7",
          text: "000000",
        },
      },
      {
        id: 7,
        name: "Bronze Cart",
        location: {
          room: "LC2",
          floor: "2",
        },
        color: {
          bg: "c67d1c",
          text: "000000",
        },
      },
      {
        id: 8,
        name: "Zinc Cart",
        location: {
          room: "LC2",
          floor: "2",
        },
        color: {
          bg: "655b55",
          text: "ffffff",
        },
      },
    ],
  },
  {
    name: "Third Floor",
    carts: [
      {
        id: 1,
        name: "Red Cart",
        location: {
          room: "LC3",
          floor: "3",
        },
        color: {
          bg: "ff0000",
          text: "000000",
        },
      },
      {
        id: 2,
        name: "Green Cart",
        location: {
          room: "LC3",
          floor: "3",
        },
        color: {
          bg: "00ff00",
          text: "000000",
        },
      },
      {
        id: 3,
        name: "Blue Cart",
        location: {
          room: "LC3",
          floor: "3",
        },
        color: {
          bg: "0000ff",
          text: "ffffff",
        },
      },
      {
        id: 4,
        name: "Yellow Cart",
        location: {
          room: "LC3",
          floor: "3",
        },
        color: {
          bg: "ffff00",
          text: "000000",
        },
      },
    ],
  },
];
