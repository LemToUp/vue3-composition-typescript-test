import Item from "@/interfaces/Item";

export default interface Element {
  readonly id: number,
  name: string,
  items: Array<Item>
};
