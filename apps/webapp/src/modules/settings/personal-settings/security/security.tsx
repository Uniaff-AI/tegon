import { SettingSection } from 'modules/settings/setting-section';

import { SecurityForm } from './security-form';

export function Security() {
  return (
    <SettingSection title="Безопасность" description="Смените свой пароль">
      <SecurityForm />
    </SettingSection>
  );
}
