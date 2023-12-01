export const blocks = {
  "Block 1": {
    start: "09:00",
    end: "10:30",
  },
  "Block 2": {
    start: "10:30",
    end: "12:00",
  },
  "Block 3": {
    start: "12:30",
    end: "14:00",
  },
  "Block 4": {
    start: "14:00",
    end: "15:30",
  },
};

export const carts = [
  // LC3
  {
    id: 1,
    name: "Red Cart",
    location: "LC3",
  },
  {
    id: 2,
    name: "Green Cart",
    location: "LC3",
  },
  {
    id: 3,
    name: "Blue Cart",
    location: "LC3",
  },
  {
    id: 4,
    name: "Yellow Cart",
    location: "LC3",
  },

  // LC2

  {
    id: 5,
    name: "Gold Cart",
    location: "LC2",
  },
  {
    id: 6,
    name: "Silver Cart",
    location: "LC2",
  },
  {
    id: 7,
    name: "Bronze Cart",
    location: "LC2",
  },
  {
    id: 8,
    name: "Zinc Cart",
    location: "LC2",
  },

  // Misc

  {
    id: 9,
    name: "Poseidon Cart",
    location: "Band",
  },
  {
    id: 10,
    name: "Hades Cart",
    location: "Office",
  },
] as const;
