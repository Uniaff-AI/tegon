import { Labels } from './labels';
import { Members } from './members';
import { Overview } from './overview';
import { Templates } from './templates';
import { Workflow } from './workflow';

export const SECTION_COMPONENTS = {
  overview: Overview,
  workflow: Workflow,
  labels: Labels,
  members: Members,
  templates: Templates,
};

export const SECTION_TITLES = {
  overview: 'Обзор',
  workflow: 'Рабочий процесс',
  labels: 'Метки',
  members: 'Участники',
  templates: 'Шаблоны',
};

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type SECTION_COMPONENTS_KEYS = StringKeys<typeof SECTION_COMPONENTS>;
