'use client';
import { DoorOpenIcon, Grid, Loader2, Plus, UserPlus2 } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { APP_ROUTES } from '@/lib/app-routes';
import { useGetUserAPI } from '@/hooks/api/useUser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserCircleIcon } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/lib/api/auth.api';
import { toast } from '../ui/toast';
import { queryKeys } from '@/lib/react-query/query-mutations-keys';

function AppHeader() {
  const { data: user, isLoading } = useGetUserAPI();

  return (
    <header className="border-b border-border backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label="Common ground home"
        >
          <span className="grid size-8 place-items-center rounded-[11px] bg-foreground text-background shadow-sm transition-transform group-hover:-rotate-3">
            <span className="size-2.5 rounded-full bg-background" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em] sm:text-base">
            common<span className="text-muted-foreground">ground</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isLoading ? null : (
            <>
              {user ? (
                <>
                  <Link
                    href={APP_ROUTES.DASHBOARD}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <Grid className="size-4" aria-hidden="true" />
                    Dashboard
                  </Link>
                  <Link href={APP_ROUTES.POST.CREATE} className={buttonVariants({})}>
                    <Plus className="size-4" aria-hidden="true" />
                    New post
                  </Link>
                  <UserAccountPopover />
                </>
              ) : (
                <>
                  <Link
                    href={APP_ROUTES.AUTH.LOGIN}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <DoorOpenIcon className="size-4" aria-hidden="true" />
                    Login
                  </Link>
                  <Link
                    href={APP_ROUTES.AUTH.SIGNUP}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <UserPlus2 className="size-4" aria-hidden="true" />
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function UserAccountPopover() {
  const { mutateAsync: triggerLogout, isPending } = useMutation({
    mutationFn: logout,
  });
  const queryClient = useQueryClient();

  async function logutWithInvalidation() {
    const response = await triggerLogout();
    await queryClient.invalidateQueries({
      queryKey: queryKeys.getUser(),
    });

    return response;
  }

  function handleLogout() {
    toast.promise(logutWithInvalidation(), {
      loading: 'Logging you out...',
      error: 'Error while logging you out',
      success: () => {
        window.location.href = APP_ROUTES.AUTH.LOGIN;

        return 'Successfully logged out';
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <UserCircleIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem disabled={isPending} onClick={handleLogout}>
            {isPending ? <Loader2 className="size-3 animate-spin" /> : null}
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default AppHeader;