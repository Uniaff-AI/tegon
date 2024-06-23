/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { observer } from 'mobx-react-lite';

import { getWorkflowColor } from 'common/status-color';
import { type IssueType } from 'common/types/issue';
import { WORKFLOW_CATEGORY_ICONS } from 'common/types/status';

import { useTeamWithId } from 'hooks/teams';
import { useTeamWorkflows } from 'hooks/workflows';

interface ModalIssueItemProps {
  issue: IssueType;
}

export const ModalIssueItem = observer(({ issue }: ModalIssueItemProps) => {
  const team = useTeamWithId(issue.teamId);
  const workflows = useTeamWorkflows(team.identifier);
  const workflow = workflows.find((workflow) => workflow.id === issue.stateId);

  const CategoryIcon = WORKFLOW_CATEGORY_ICONS[workflow.name];

  return (
    <div className="cursor-pointer flex items-center rounded-md">
      <CategoryIcon
        size={16}
        className="text-muted-foreground mr-3"
        color={getWorkflowColor(workflow).color}
      />
      <div className="text-sm text-foreground mr-3 min-w-[50px]">{`${team.identifier}-${issue.number}`}</div>
      <div className="text-sm text-muted-foreground max-w-[300px]">
        <div className="truncate"> {issue.title}</div>
      </div>
    </div>
  );
});
