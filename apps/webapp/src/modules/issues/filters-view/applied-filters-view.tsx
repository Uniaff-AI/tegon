import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useContextStore } from 'store/global-context-provider';

import {
  IssueStatusDropdown,
  IssueAssigneeDropdown,
  IssueLabelDropdown,
  IssuePriorityDropdown,
  IssueProjectDropdown,
  IssueCycleDropdown,
} from './filter-dropdowns';
import { FilterItemView } from './filter-item-view';
import { isEmpty } from './filter-utils';

export const AppliedFiltersView = observer(() => {
  const { applicationStore } = useContextStore();
  const filters = applicationStore.filters;

  return (
    <>
      {!isEmpty(filters) && (
        <div
          className="flex gap-1 flex-wrap"
          onClick={(e) => e.stopPropagation()}
        >
          <FilterItemView
            name="Статус"
            filterKey="status"
            filter={filters.status}
            Component={IssueStatusDropdown}
          />

          <FilterItemView
            name="Исполнитель"
            filterKey="assignee"
            filter={filters.assignee}
            Component={IssueAssigneeDropdown}
          />

          <FilterItemView
            name="Метка"
            filterKey="label"
            filter={filters.label}
            isArray
            Component={IssueLabelDropdown}
          />

          <FilterItemView
            name="Приоритет"
            filterKey="priority"
            filter={filters.priority}
            Component={IssuePriorityDropdown}
          />

          <FilterItemView
            name="Цикл"
            filterKey="cycle"
            filter={filters.cycle}
            Component={IssueCycleDropdown}
          />

          <FilterItemView
            name="Проект"
            filterKey="project"
            filter={filters.project}
            Component={IssueProjectDropdown}
          />

          <FilterItemView
            name="Родительские задачи"
            filterKey="isParent"
            filter={filters.isParent}
            Component={() => <>parent</>}
          />

          <FilterItemView
            name="Подзадачи"
            filterKey="isSubIssue"
            filter={filters.isSubIssue}
            Component={() => <>sub-issue</>}
          />

          <FilterItemView
            name="Заблокированные задачи"
            filterKey="isBlocked"
            filter={filters.isBlocked}
            Component={() => <>blocked</>}
          />

          <FilterItemView
            name="Блокирующие задачи"
            filterKey="isBlocking"
            filter={filters.isBlocking}
            Component={() => <>blocking</>}
          />
        </div>
      )}
    </>
  );
});
