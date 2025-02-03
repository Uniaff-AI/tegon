import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@tegonhq/ui/components/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@tegonhq/ui/components/form';
import { Input } from '@tegonhq/ui/components/input';
import { useToast } from '@tegonhq/ui/components/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { TeamType } from 'common/types';

import { useCurrentWorkspace } from 'hooks/workspace';

import { useCreateTeamMutation } from 'services/team';

import { SettingSection } from '../setting-section';

export const CreateNewTeamSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Название команды должно содержать как минимум 2 символа',
    })
    .max(50),
  identifier: z.string().min(3).max(3),
});

export function CreateNewTeam() {
  const form = useForm<z.infer<typeof CreateNewTeamSchema>>({
    resolver: zodResolver(CreateNewTeamSchema),
    defaultValues: {
      name: '',
      identifier: '',
    },
  });
  const { toast } = useToast();

  const workspace = useCurrentWorkspace();
  const { mutate: createTeam } = useCreateTeamMutation({
    onSuccess: (data: TeamType) => {
      toast({
        title: 'Создано!',
        description: `Новая команда ${data.name} создана`,
      });
      form.reset();
    },
  });

  const onSubmit = (values: { name: string; identifier: string }) => {
    createTeam({ ...values, workspaceId: workspace.id });
  };

  return (
    <SettingSection
      title="Создать новую команду"
      description=" Создайте новую команду, чтобы управлять отдельными рабочими процессами"
    >
      <div className="max-w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название команды</FormLabel>
                  <FormControl>
                    <Input placeholder="Например, Engineering" {...field} />
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
                  <FormDescription>
                    Это используется в качестве идентификатора (например, ENG-123) для всех задач команды.
                  </FormDescription>

                  <FormControl>
                    <Input placeholder="Например, ENG" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end items-center">
              <Button
                type="submit"
                variant="secondary"
                isLoading={form.formState.isSubmitting}
              >
                Создать
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </SettingSection>
  );
}
