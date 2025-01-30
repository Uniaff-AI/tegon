import { Button } from '@tegonhq/ui/components/button';
import { Input } from '@tegonhq/ui/components/input';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { SettingSection } from 'modules/settings/setting-section';

import type { LabelType } from 'common/types';

import { useContextStore } from 'store/global-context-provider';

import { EditLabel } from './edit-label';
import { Label } from './label';
import { NewLabel } from './new-label';

export const Labels = observer(() => {
  const { labelsStore } = useContextStore();

  const [showNewLabelCreation, setNewLabelCreation] = React.useState(false);
  const [editLabelState, setEditLabelState] = React.useState(undefined);
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <SettingSection
      title="Метки рабочего пространства"
      description="  Используйте метки и группы меток, чтобы помогать организовывать и фильтровать задачи в вашей рабочей области. Метки, созданные в этом разделе, доступны для использования всеми командами. Чтобы создавать метки или группы меток, которые будут использоваться только определёнными командами, добавьте их в настройках меток, относящихся к конкретной команде."
    >
      <div className="flex flex-col">
        <div className="mb-4">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Button
                disabled={showNewLabelCreation}
                variant="secondary"
                size="lg"
                onClick={() => {
                  setNewLabelCreation(true);
                }}
              >
                Новая метка
              </Button>
            </div>
            <div className="flex">
              <Input
                placeholder="Фильтр по имени"
                onChange={(e) => setSearchValue(e.currentTarget.value)}
              />
            </div>
          </div>

          {showNewLabelCreation && (
            <div className="my-3">
              <NewLabel onCancel={() => setNewLabelCreation(false)} />
            </div>
          )}
        </div>

        <div>
          {labelsStore.labels
            .filter(
              (label: LabelType) =>
                label.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                !label.teamId,
            )
            .map((label: LabelType) => {
              if (editLabelState === label.id) {
                return (
                  <EditLabel
                    key={label.name}
                    label={label}
                    onCancel={() => setEditLabelState(undefined)}
                  />
                );
              }

              return (
                <Label
                  key={label.name}
                  label={label}
                  setEditLabelState={(labelId) => setEditLabelState(labelId)}
                />
              );
            })}
        </div>
      </div>
    </SettingSection>
  );
});
