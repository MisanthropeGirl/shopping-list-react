export interface Item {
  name: string;
  crossedOff: boolean;
  quantity?: number;
  price?: number;
}

export interface Feedback {
  msg: string;
  type?: "error";
}
