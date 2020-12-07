import Element from "@/interfaces/Element";

export default interface Action {
  readonly id: number,
  readonly type: string,
  element: Element,
  readonly date: string,
};
