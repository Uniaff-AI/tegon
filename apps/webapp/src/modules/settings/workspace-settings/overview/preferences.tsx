import { PriorityType } from '@tegonhq/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tegonhq/ui/components/select';
import { observer } from 'mobx-react-lite';

import { SettingSection } from 'modules/settings/setting-section';

import { useCurrentWorkspace } from 'hooks/workspace';

import { useUpdateWorkspacePreferencesMutation } from 'services/workspace';

export const Preferences = observer(() => {
  const workspace = useCurrentWorkspace();

  const { mutate: updateWorkspacePreferences } =
    useUpdateWorkspacePreferencesMutation({});
  const onValueChange = (value: string) => {
    updateWorkspacePreferences({
      priorityType: value as PriorityType,
    });
  };

  return (
    <SettingSection
      title="Настройки рабочей области"
      description="Управляйте настройками вашей рабочей области"
    >
      <div className="flex flex-col">
        <h3 className="text-lg"> Приоритетное предпочтение </h3>
        <p className="text-muted-foreground">
          С помощью выбранных вами настроек приоритетов вы можете автоматически назначать приоритеты для задач, такие как высокий, средний, низкий или срочный, на основе определённых вами правил.
        </p>

        <div className="flex gap-1 max-w-[500px] mt-2">
          <Select
            onValueChange={onValueChange}
            defaultValue={
              workspace.preferences?.priorityType ??
              PriorityType.DescriptivePriority
            }
          >
            <SelectTrigger className="flex gap-1 items-center">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                key={PriorityType.DescriptivePriority}
                value={PriorityType.DescriptivePriority}
              >
                Описание (Срочный, Высокий, Средний, Низкий)
              </SelectItem>
              <SelectItem
                key={PriorityType.ShorthandPriority}
                value={PriorityType.ShorthandPriority}
              >
                Краткое обозначение (P0, P1, P2)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </SettingSection>
  );
});
