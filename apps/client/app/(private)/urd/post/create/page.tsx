'use client';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostCreateInput, postCreateSchema } from '@reddit-clone/shared';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { createNewPost } from '@/lib/api/post.api';
import { toast } from '@/components/ui/toast';
function CreateNewPost() {
  const { mutateAsync: triggerCreate, isPending } = useMutation({
    mutationFn: createNewPost,
    mutationKey: ['createNewPost'],
  });

  function handleCreatePost(data: PostCreateInput) {
    toast.promise(triggerCreate(data), {
      loading: 'Creating post...',
      success: 'Post created successfully!',
      error: 'Failed to create post.',
    });
  }

  const form = useForm<PostCreateInput>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      content: '',
      title: '',
    },
  });

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            New post
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Share something with the community
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Start a conversation, ask a question, or share something worth discussing.
          </p>
        </header>

        <FormProvider {...form}>
          <form
            className="rounded-xl border bg-card p-5 shadow-sm sm:p-7"
            onSubmit={form.handleSubmit(handleCreatePost)}
          >
            <FieldGroup className="gap-6">
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-medium" htmlFor="post-title">
                      Title
                    </FieldLabel>
                    <Input
                      className="h-11 bg-background px-3 text-sm md:text-sm"
                      id="post-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Give your post a clear title"
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
                name="content"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-medium" htmlFor="post-content">
                      Body
                    </FieldLabel>
                    <Textarea
                      className="min-h-52 resize-y bg-background px-3 py-3 text-sm leading-6 md:text-sm"
                      id="post-content"
                      aria-invalid={fieldState.invalid}
                      placeholder="Write your post here..."
                      autoComplete="off"
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="mt-6 flex justify-end border-t pt-5">
              <Button loading={isPending} type="submit">
                Create post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}

export default CreateNewPost;