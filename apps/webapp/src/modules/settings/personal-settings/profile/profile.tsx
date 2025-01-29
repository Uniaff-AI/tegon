import { SettingSection } from 'modules/settings/setting-section';

import { ProfileForm } from './profile-form';

export function Profile() {
  return (
    <SettingSection title="Профиль" description=" Управляйте своим профилем">
      <ProfileForm />
    </SettingSection>
  );
}
