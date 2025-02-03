import { PriorityType } from '@tegonhq/types';

export const Priorities = ['', 'Срочно', 'Высокий', 'Средний', 'Низкий'];
export const PrioritiesShorthand = ['', 'P0', 'P1', 'P2', 'P3'];

export function getPriorities(type?: PriorityType) {
  if (type && type === PriorityType.ShorthandPriority) {
    return PrioritiesShorthand;
  }

  return Priorities;
}
