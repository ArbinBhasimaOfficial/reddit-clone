'use client';
import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function RootProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default RootProvider;