import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@tegonhq/ui/components/select';
import { BulletListLine, StackLine } from '@tegonhq/ui/icons';
import { observer } from 'mobx-react-lite';

import { useProject } from 'hooks/projects';
import { useCurrentTeam } from 'hooks/teams';

import { useContextStore } from 'store/global-context-provider';

export const GroupingOrderingOptions = observer(() => {
  const { applicationStore } = useContextStore();
  const project = useProject();
  const team = useCurrentTeam();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={applicationStore.displaySettings.grouping}
        onValueChange={(value: string) => {
          applicationStore.updateDisplaySettings({
            grouping: value,
          });
        }}
      >
        <SelectTrigger className="h-7 py-1 flex gap-1 items-center">
          <StackLine size={16} />
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-xs font-normal">Группировать по </SelectLabel>
            <SelectItem value="status">Статусу</SelectItem>
            <SelectItem value="assignee">Assignee</SelectItem>
            <SelectItem value="priority">Приоритетам</SelectItem>
            <SelectItem value="label">Заголовкам</SelectItem>
            {!project && <SelectItem value="project">Проектам</SelectItem>}
            {!team && <SelectItem value="team">Командам</SelectItem>}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={applicationStore.displaySettings.ordering}
        onValueChange={(value: string) => {
          applicationStore.updateDisplaySettings({
            ordering: value,
          });
        }}
      >
        <SelectTrigger className="h-7 py-1 flex gap-1 items-center">
          <BulletListLine size={16} />
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-xs font-normal">Отсортировать по </SelectLabel>

            <SelectItem value="status">Статусу</SelectItem>
            <SelectItem value="assignee">Assignee</SelectItem>
            <SelectItem value="priority">Приоритету</SelectItem>
            <SelectItem value="updated_at">Последние обновления</SelectItem>
            <SelectItem value="created_at">Последние созданные</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});
