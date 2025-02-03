import { WorkflowCategoryEnum } from '@tegonhq/types';
import { IsOptional, IsString } from 'class-validator';

export class CreateTeamInput {
  @IsString()
  name: string;

  @IsString()
  identifier: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

export class TeamRequestParams {
  @IsString()
  teamId: string;
}

export enum IssueEstimateValues {
  EXPONENTIAL,
  FIBONACCI,
  LINEAR,
  T_SHIRT,
}

export enum Priorities {
  NO_PRIORITY_FIRST,
  NO_PRIORITY_LAST,
}

export const workflowSeedData = [
  {
    name: 'Триаж',
    category: WorkflowCategoryEnum.TRIAGE,
    color: '0',
    position: 0,
  },
  {
    name: 'Неопределенный',
    category: WorkflowCategoryEnum.BACKLOG,
    color: '1',
    position: 0,
  },
  {
    name: 'Реестр задач',
    category: WorkflowCategoryEnum.BACKLOG,
    color: '2',
    position: 1,
  },
  {
    name: 'Сделать',
    category: WorkflowCategoryEnum.UNSTARTED,
    color: '3',
    position: 0,
  },
  {
    name: 'В процессе',
    category: WorkflowCategoryEnum.STARTED,
    color: '4',
    position: 0,
  },
  {
    name: 'На проверке',
    category: WorkflowCategoryEnum.STARTED,
    color: '5',
    position: 1,
  },
  {
    name: 'Готово',
    category: WorkflowCategoryEnum.COMPLETED,
    color: '6',
    position: 0,
  },
  {
    name: 'Отменено',
    category: WorkflowCategoryEnum.CANCELED,
    color: '3',
    position: 0,
  },
];
