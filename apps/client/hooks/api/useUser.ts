import { getUserData } from '@/lib/api/user.api';
import { queryKeys } from '@/lib/react-query/query-mutations-keys';
import { useQuery } from '@tanstack/react-query';

export function useGetUserAPI() {
  return useQuery({
    queryKey: queryKeys.getUser(),
    queryFn: getUserData,
  });
}