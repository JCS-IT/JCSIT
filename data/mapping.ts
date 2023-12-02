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

interface Cart {
  id: number;
  name: string;
  location: string;
  color: {
    bg: string;
    text: string;
  };
}

export const carts: Cart[] = [
  // LC3
  {
    id: 1,
    name: "Red Cart",
    location: "LC3",
    color: {
      bg: "ff0000",
      text: "000000",
    },
  },
  {
    id: 2,
    name: "Green Cart",
    location: "LC3",
    color: {
      bg: "00ff00",
      text: "000000",
    },
  },
  {
    id: 3,
    name: "Blue Cart",
    location: "LC3",
    color: {
      bg: "0000ff",
      text: "ffffff",
    },
  },
  {
    id: 4,
    name: "Yellow Cart",
    location: "LC3",
    color: {
      bg: "ffff00",
      text: "000000",
    },
  },

  // LC2

  {
    id: 5,
    name: "Gold Cart",
    location: "LC2",
    color: {
      bg: "f0c434",
      text: "000000",
    },
  },
  {
    id: 6,
    name: "Silver Cart",
    location: "LC2",
    color: {
      bg: "cad3d7",
      text: "000000",
    },
  },
  {
    id: 7,
    name: "Bronze Cart",
    location: "LC2",
    color: {
      bg: "c67d1c",
      text: "000000",
    },
  },
  {
    id: 8,
    name: "Zinc Cart",
    location: "LC2",
    color: {
      bg: "655b55",
      text: "ffffff",
    },
  },

  // Misc

  {
    id: 9,
    name: "Poseidon Cart",
    location: "Band",
    color: {
      bg: "133955",
      text: "ffffff",
    },
  },
  {
    id: 10,
    name: "Hades Cart",
    location: "Office",
    color: {
      bg: "615316",
      text: "ffffff",
    },
  },
] as const;
