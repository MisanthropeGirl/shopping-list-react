export interface Item {
  name: string;
  crossedOff: boolean;
}

export interface Feedback {
  msg: string;
  type?: "error";
}
