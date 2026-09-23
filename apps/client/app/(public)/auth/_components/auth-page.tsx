'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/ui/password';
import { toast } from '@/components/ui/toast';
import { login, signup } from '@/lib/api/auth.api';
import { APP_ROUTES } from '@/lib/app-routes';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ApiResponse,
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from '@reddit-clone/shared';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ArrowRight, MessageSquareQuote, ShieldCheck, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

type AuthMode = 'login' | 'signup';

const content = {
  login: {
    eyebrow: 'Welcome back',
    title: 'Pick up where you left off.',
    description: 'Sign in to return to your communities, saved posts, and ongoing conversations.',
    panelTitle: 'Good conversations are better when you come back to them.',
    panelDescription:
      'Your feed is ready with the questions, ideas, and communities that matter to you.',
    submitLabel: 'Sign in',
    switchPrompt: 'New to common ground?',
    switchLabel: 'Create an account',
    switchHref: APP_ROUTES.AUTH.SIGNUP,
  },
  signup: {
    eyebrow: 'Join the community',
    title: 'Create your place in the conversation.',
    description: 'A few details are all you need to start sharing, learning, and connecting.',
    panelTitle: 'Find your people. Share what you know. Stay curious.',
    panelDescription:
      'Common ground brings thoughtful questions and useful answers into one welcoming place.',
    submitLabel: 'Create account',
    switchPrompt: 'Already have an account?',
    switchLabel: 'Sign in',
    switchHref: APP_ROUTES.AUTH.LOGIN,
  },
} as const;

function AuthPage({ mode }: { mode: AuthMode }) {
  const pageContent = content[mode];
  const isLogin = mode === 'login';

  return (
    <section className="grid min-h-[calc(100dvh-4rem)] overflow-hidden bg-background text-foreground lg:grid-cols-[minmax(0,0.85fr)_minmax(32rem,1.15fr)]">
      <aside className="relative isolate overflow-hidden bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-14 lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-16">
        <div
          className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full border border-primary-foreground/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-10 -top-10 -z-10 size-44 rounded-full border border-primary-foreground/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-28 -z-10 size-80 rounded-full border border-primary-foreground/10"
          aria-hidden="true"
        />

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 px-3 py-1.5 text-xs font-medium text-primary-foreground/75">
            <span className="size-1.5 rounded-full bg-primary-foreground" />A place for thoughtful
            people
          </div>

          <h2 className="mt-8 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-balance sm:text-4xl lg:mt-12 lg:text-5xl">
            {pageContent.panelTitle}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-primary-foreground/65 sm:text-base">
            {pageContent.panelDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:mt-16 lg:grid-cols-1">
          <CommunityPoint
            icon={MessageSquareQuote}
            title="Speak freely"
            description="Start conversations that are worth having."
          />
          <CommunityPoint
            icon={UsersRound}
            title="Find your circle"
            description="Discover people who care about the same things."
          />
          <CommunityPoint
            icon={ShieldCheck}
            title="Stay in control"
            description="Your profile and preferences remain yours."
          />
        </div>
      </aside>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8 sm:py-16 lg:px-14">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {pageContent.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-4xl">
              {pageContent.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {pageContent.description}
            </p>
          </div>

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <p className="mt-7 text-center text-sm text-muted-foreground">
            {pageContent.switchPrompt}{' '}
            <Link
              href={pageContent.switchHref}
              className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {pageContent.switchLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    mutateAsync: triggerLogin,
    isPending,
    error,
  } = useMutation<ApiResponse, AxiosError<ApiResponse>>({
    mutationFn: login,
    mutationKey: ['login'],
  });

  const onSubmit = (data: LoginInput) => {
    toast.promise(triggerLogin(data), {
      loading: 'Logging in...',
      success: () => {
        window.location.href = APP_ROUTES.DASHBOARD;
        return 'Login successful';
      },
      error: 'Failed to log in.',
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-7">
        {error?.response?.data?.message && (
          <Alert variant="destructive-filled">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error?.response?.data?.message}</AlertDescription>
          </Alert>
        )}
        <CardContent className="p-0 flex flex-col gap-5">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium" htmlFor="login-email">
                  Email
                </FieldLabel>
                <Input
                  className="h-11 bg-background px-3 text-sm md:text-sm"
                  id="login-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@example.com"
                  autoComplete="off"
                  autoFocus
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium" htmlFor="login-password">
                  Password
                </FieldLabel>
                <PasswordInput
                  className="h-11 bg-background px-3 text-sm md:text-sm"
                  id="login-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  autoFocus
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Button loading={isPending} type="submit" className="h-11 w-full rounded-xl text-sm">
            Login <ArrowRight />
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

function RegisterForm() {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    mutateAsync: triggerSignup,
    isPending: isSigningUp,
    error: signupError,
  } = useMutation<ApiResponse, AxiosError<ApiResponse>>({
    mutationFn: signup,
    mutationKey: ['signup'],
  });

  const {
    mutateAsync: triggerLogin,
    isPending: isLoggingIn,
    error: loginError,
  } = useMutation<ApiResponse, AxiosError<ApiResponse>, LoginInput>({
    mutationFn: login,
    mutationKey: ['login'],
  });

  async function signupAndLogin(data: RegisterInput) {
    await triggerSignup(data);
    await triggerLogin({ email: data.email, password: data.password });
  }

  const onSubmit = (data: RegisterInput) => {
    toast.promise(signupAndLogin(data), {
      loading: 'Signing up...',
      success: () => {
        window.location.href = APP_ROUTES.DASHBOARD;
        return 'Signup successful';
      },
      error: (err: AxiosError<ApiResponse>) => {
        const statusCode = err.response?.status;

        if (statusCode === 409) {
          // this is email conflict, so show error in email field
          form.setError('email', { message: 'This email is already in use.' });
        }
        return 'Failed to signup';
      },
    });
  };

  const error = signupError || loginError;

  const isPending = isSigningUp || isLoggingIn;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-7">
        {error?.response?.data?.message && (
          <Alert variant="destructive-filled">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error?.response?.data?.message}</AlertDescription>
          </Alert>
        )}

        <CardContent className="p-0 flex flex-col gap-5">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium" htmlFor="register-name">
                  Name
                </FieldLabel>
                <Input
                  className="h-11 bg-background px-3 text-sm md:text-sm"
                  id="register-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Jhon Doe"
                  autoComplete="off"
                  autoFocus
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium" htmlFor="register-email">
                  Email
                </FieldLabel>
                <Input
                  className="h-11 bg-background px-3 text-sm md:text-sm"
                  id="register-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@example.com"
                  autoComplete="off"
                  autoFocus
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium" htmlFor="login-password">
                  Password
                </FieldLabel>
                <PasswordInput
                  className="h-11 bg-background px-3 text-sm md:text-sm"
                  id="login-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  autoFocus
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium" htmlFor="register-confirm-password">
                  Confirm Password
                </FieldLabel>
                <PasswordInput
                  className="h-11 bg-background px-3 text-sm md:text-sm"
                  id="register-confirm-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  autoFocus
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Button loading={isPending} type="submit" className="h-11 w-full rounded-xl text-sm">
            Signup <ArrowRight />
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

function CommunityPoint({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof MessageSquareQuote;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-foreground/10 text-primary-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-primary-foreground/55">{description}</p>
      </div>
    </div>
  );
}

export default AuthPage;