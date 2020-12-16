import Element from '@/interfaces/Element'
import { Types } from '@/enums/History'

export default interface Action {
  readonly id: number;
  readonly type: Types;
  element: Element;
  readonly date: string;
};
