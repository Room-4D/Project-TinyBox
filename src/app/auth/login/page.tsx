'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Loader2, Lock, Mail } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema } from '@/schemas';
import { loginAction } from '@/server/auth/actions/login';

import { AuthCard } from '@/components/auth/auth-card';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { execute, isPending } = useAction(loginAction, {
    onSuccess() {
      toast.success('Login successful!');
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    execute(values);
  }

  return (
    <AuthCard
      cardTitle='Login to your account'
      backButtonHref='/auth/register'
      backButtonLabel="Don't have an account yet?"
      showSocials
    >
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400' />
                      <Input
                        type='email'
                        className='pl-10'
                        placeholder='your-mail@example.com'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400' />
                      <Input
                        type='password'
                        className='pl-10'
                        placeholder='••••••••'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='my-4 w-full'
            >
              {isPending ? <Loader2 className='animate-spin' /> : <p>Login</p>}
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
