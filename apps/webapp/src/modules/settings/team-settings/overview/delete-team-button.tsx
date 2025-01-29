import { Button } from '@tegonhq/ui/components/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tegonhq/ui/components/popover';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useCurrentTeam } from 'hooks/teams';

import { useDeleteTeamMutation } from 'services/team';

import { useContextStore } from 'store/global-context-provider';

export const DeleteTeamButton = observer(() => {
  const [open, setOpen] = React.useState(false);
  const team = useCurrentTeam();
  const { issuesStore } = useContextStore();
  const issues = issuesStore.getIssuesForTeam({ teamId: team.id });
  const { mutate: deleteTeamMutation, isLoading } = useDeleteTeamMutation({});

  const deleteTeam = () => {
    deleteTeamMutation({
      teamId: team.id,
    });
  };

  const getContentForPopover = () => {
    if (issues.length > 0) {
      return (
        <div className="flex items-center">
            Невозможно удалить команду — пожалуйста, удалите все задачи ({issues.length}) перед удалением.
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        <div className="text-sm">
            Вы уверены, что хотите удалить эту команду? Это действие не может быть отменено.
        </div>
        <Button
          variant="destructive"
          onClick={deleteTeam}
          isLoading={isLoading}
        >
            Да, удалить команду
        </Button>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-fit mt-2"
          variant="destructive"
          onClick={() => setOpen(true)}
          isLoading={isLoading}
        >
            Удалить эту команду
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">{getContentForPopover()}</PopoverContent>
    </Popover>
  );
});
