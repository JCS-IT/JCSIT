export interface Cart {
  id: number;
  name: string;
  location: {
    room: string;
    floor: string;
  };
  color: {
    bg: string;
    text: string;
  };
}

export interface Floor {
  name: string;
  carts: Cart[];
}

export interface NewEvent {
  name: string;
  room: number | null;
  block: {
    start: string;
    end: string;
  };
}
