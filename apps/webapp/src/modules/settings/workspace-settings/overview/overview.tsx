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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SettingSection } from 'modules/settings/setting-section';

import { useUpdateWorkspaceMutation } from 'services/workspace';

import { useContextStore } from 'store/global-context-provider';

import { OverviewSchema } from './overview.interface';
import { Preferences } from './preferences';

export const Overview = observer(() => {
  const { workspaceStore } = useContextStore();

  const { toast } = useToast();
  const { mutate: updateWorkspace } = useUpdateWorkspaceMutation({
    onSuccess: () => {
      toast({
        title: 'Сохранено!',
        description: 'Информация о вашей рабочей области была обновлена',
      });
    },
  });

  const form = useForm<z.infer<typeof OverviewSchema>>({
    resolver: zodResolver(OverviewSchema),
    defaultValues: {
      name: workspaceStore.workspace.name,
    },
  });

  async function onSubmit(values: z.infer<typeof OverviewSchema>) {
    updateWorkspace({
      name: values.name,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="text-xl"> Workspace </h2>
      </div>

      <SettingSection
        title="Профиль"
        description="Управляйте всеми настройками вашей организации"
      >
        <div className="max-w-[500px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название рабочей области</FormLabel>
                    <FormControl>
                      <Input placeholder="Tesla" {...field} />
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
          <h3 className="text-lg"> Удалить рабочую область </h3>

          <p className="text-muted-foreground">
              Если вы хотите безвозвратно удалить эту рабочую область и все её данные, включая (но не ограничиваясь) пользователей, задачи и комментарии, вы можете сделать это ниже.
          </p>

          <Button className="w-fit mt-2" variant="destructive">
              Удалить эту рабочую область
          </Button>
        </div>
      </SettingSection>
    </div>
  );
});
