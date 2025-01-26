'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Loader2, Lock, Mail, User } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterSchema } from '@/schemas';
import { loginAction } from '@/server/auth/actions/login';

import { AuthCard } from '@/components/auth/auth-card';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerAction } from '@/server/auth/actions/register';

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { execute, isPending } = useAction(registerAction, {
    onSuccess() {
      toast.success('Registration successful!');
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    execute(values);
  }

  return (
    <AuthCard
      cardTitle='Register an account'
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account?'
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400' />
                      <Input
                        type='text'
                        className='pl-10'
                        placeholder='John Doe'
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
              {isPending ? <Loader2 className='animate-spin' /> : <p>Register</p>}
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
