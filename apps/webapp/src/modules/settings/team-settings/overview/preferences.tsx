import { RiClipboardLine } from '@remixicon/react';
import { Button } from '@tegonhq/ui/components/button';
import { Input } from '@tegonhq/ui/components/input';
import { useToast } from '@tegonhq/ui/components/use-toast';
import copy from 'copy-to-clipboard';
import { observer } from 'mobx-react-lite';

import { SettingSection } from 'modules/settings/setting-section';

import { useCurrentTeam } from 'hooks/teams';

export const Preferences = observer(() => {
  const team = useCurrentTeam();
  const { toast } = useToast();

  const teamEmail = `triage+${team?.id}@tegon.ai`;

  return (
    <SettingSection
      title="Настройки команды"
      description="Управляйте настройками вашей команды"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h3 className="text-lg"> Создать по электронной почте </h3>

          <p className="text-muted-foreground">
            С помощью уникального адреса электронной почты, созданного для вашей команды, вы можете отправлять или пересылать письма, и мы автоматически будем создавать задачи в списке на рассмотрение из них
          </p>

          <div className="flex gap-1 max-w-[500px] mt-2">
            <Input value={teamEmail} />
            <Button
              variant="ghost"
              onClick={() => {
                copy(teamEmail);
                toast({
                  description: 'Адрес электронной почты скопирован в буфер обмена',
                });
              }}
            >
              <RiClipboardLine size={16} className="text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </SettingSection>
  );
});
