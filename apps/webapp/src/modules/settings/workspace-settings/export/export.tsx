import { Button } from '@tegonhq/ui/components/button';

import { SettingSection } from 'modules/settings/setting-section';

import { useCurrentWorkspace } from 'hooks/workspace';

export function Export() {
  const workspace = useCurrentWorkspace();

  return (
    <SettingSection
      title="Экспортировать"
      description="Экспортируйте данные ваших задач в формате CSV."
    >
      <Button
        variant="secondary"
        onClick={() => {
          window.open(
            `/api/v1/issues/export?workspaceId=${workspace.id}`,
            '_blank',
          );
        }}
      >
        Экспорт CSV
      </Button>
    </SettingSection>
  );
}
