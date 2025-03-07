/* eslint-disable react/no-unescaped-entities */
import { zodResolver } from '@hookform/resolvers/zod';
import { RiMailFill } from '@remixicon/react';
import { Button } from '@tegonhq/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@tegonhq/ui/components/form';
import { Input } from '@tegonhq/ui/components/input';
import { useToast } from '@tegonhq/ui/components/use-toast';
import { ArrowLeft, Inbox } from '@tegonhq/ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createCode } from 'supertokens-web-js/recipe/passwordless';
import { z } from 'zod';

import { AuthLayout } from 'common/layouts/auth-layout';
import { AuthGuard } from 'common/wrappers/auth-guard';

export const AuthSchema = z.object({
  email: z.string().email(),
});

export function Auth() {
  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: '',
    },
  });
  const [emailSent, setEmailSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const onSubmit = async ({ email }: { email: string }) => {
    setLoading(true);
    try {
      const response = await createCode({
        email,
      });

      if (response.status === 'SIGN_IN_UP_NOT_ALLOWED') {
        // the reason string is a user friendly message
        // about what went wrong. It can also contain a support code which users
        // can tell you so you know why their sign in / up was not allowed.
        toast({
          variant: 'destructive',
          title: 'Ошибка!',
          description: response.reason,
        });
      } else {
        setEmailSent(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you,
        toast({
          variant: 'destructive',
          title: 'Ошибка!',
          description: err.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка!',
          description: 'Ой! Что-то пошло не так.',
        });
      }
    }

    setLoading(false);
  };

  if (emailSent) {
    return (
      <AuthLayout>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col w-[360px] gap-4 items-center">
            <h1 className="text-lg text-center">Мы отправили вам волшебную ссылку</h1>
            <Inbox size={32} />
            <div className="text-center text-muted-foreground">
              Мы отправили вам письмо, содержащее волшебную ссылку, которая войдет в вашу учетную запись.
            </div>
          </div>
          <div className="flex justify-start items-center">
            <Button
              variant="ghost"
              className="flex items-center gap-1"
              onClick={() => setEmailSent(false)}
            >
              <ArrowLeft size={14} />
              Назад
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col w-[360px]">
        <h1 className="text-lg text-center">Добро пожаловать!</h1>
        <div className="text-center text-muted-foreground mt-1 mb-8">
          Создать аккаунт или войти
        </div>

        <div className="flex flex-col gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Электронная почта"
                        className="h-9"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  className="flex gap-2"
                  size="xl"
                  full
                  type="submit"
                  isLoading={loading}
                  variant="secondary"
                >
                  <RiMailFill size={18} /> Отправить волшебную ссылку.
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">

        </div>
      </div>
    </AuthLayout>
  );
}

Auth.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthGuard>{page}</AuthGuard>;
};
