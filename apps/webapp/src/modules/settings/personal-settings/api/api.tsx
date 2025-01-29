import { SettingSection } from 'modules/settings/setting-section';

import { PersonalTokens } from './personal-tokens';

export function API() {
  return (
    <SettingSection
      title="Личные ключи API"
      description="Вы можете создавать личные токены, чтобы развертывать свои действия на платформе"
    >
      <PersonalTokens />
    </SettingSection>
  );
}
