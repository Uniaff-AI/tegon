import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@tegonhq/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@tegonhq/ui/components/form';
import { Input } from '@tegonhq/ui/components/input';
import { Separator } from '@tegonhq/ui/components/separator';
import { useToast } from '@tegonhq/ui/components/use-toast';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SettingSection } from 'modules/settings/setting-section';

import type { TeamType } from 'common/types';

import { useCurrentTeam } from 'hooks/teams/use-current-team';

import { useUpdateTeamMutation } from 'services/team';

import { DeleteTeamButton } from './delete-team-button';
import { OverviewSchema } from './overview.interface';
import { Preferences } from './preferences';

export const Overview = observer(() => {
  const currentTeam = useCurrentTeam();
  const { toast } = useToast();
  const {
    replace,
    query: { workspaceSlug },
  } = useRouter();

  const { mutate: updateTeam } = useUpdateTeamMutation({
    onSuccess: (data: TeamType) => {
      replace(`/${workspaceSlug}/settings/teams/${data.identifier}/overview`);

      toast({
        title: 'Команда обновлена',
        description: 'Данные команды успешно обновлены',
      });
    },
  });

  const form = useForm<z.infer<typeof OverviewSchema>>({
    resolver: zodResolver(OverviewSchema),
    defaultValues: {
      name: currentTeam.name,
      identifier: currentTeam.identifier,
    },
  });

  React.useEffect(() => {
    form.setValue('name', currentTeam?.name);
    form.setValue('identifier', currentTeam?.identifier);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTeam]);

  async function onSubmit(values: z.infer<typeof OverviewSchema>) {
    updateTeam({
      ...values,
      teamId: currentTeam.id,
    });
  }

  if (!currentTeam) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <SettingSection title="Команда" description=" Управляйте настройками вашей команды">
        <div className="max-w-[250px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название команды</FormLabel>
                    <FormControl>
                      <Input placeholder="Название" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Идентификатор команды</FormLabel>
                    <FormControl>
                      <Input placeholder="Идентификатор" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="secondary"
                isLoading={form.formState.isSubmitting}
              >
                Обновить
              </Button>
            </form>
          </Form>
        </div>
      </SettingSection>

      <Separator className="my-4" />
      <Preferences />
      <Separator className="my-4" />

      <SettingSection title="Опасная зона" description="Продолжайте с осторожностью">
        <div className="flex flex-col">
          <h3 className="text-lg"> Удалить команду </h3>

          <p className="text-muted-foreground">
            Если вы хотите безвозвратно удалить эту команду и все её данные, включая (но не ограничиваясь) пользователей, задачи и комментарии, вы можете сделать это ниже.
          </p>

          <DeleteTeamButton />
        </div>
      </SettingSection>
    </div>
  );
});
