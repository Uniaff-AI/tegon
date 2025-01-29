import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tegonhq/ui/components/select';
import { useTheme } from 'next-themes';

import { SettingSection } from 'modules/settings/setting-section';

export function Preferences() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl"> Настройки </h2>
      <SettingSection
        title="Тема"
        description="Выберите предпочитаемую тему для приложения."
      >
        <Select
          value={theme}
          onValueChange={(value: string) => {
            setTheme(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select your theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="light">Светлая</SelectItem>
              <SelectItem value="dark">Темная</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </SettingSection>
    </div>
  );
}
