import { ApiResponse, LoginInput, SignupInput } from '@reddit-clone/shared';
import { axiosV1 } from '../axios';

export async function checkLogin(args?: { accessToken?: string }) {
  const res = await axiosV1.get<ApiResponse>(
    '/auth/check',
    args?.accessToken
      ? {
          headers: {
            Authorization: `Bearer ${args.accessToken}`,
          },
        }
      : undefined,
  );
  return res.data;
}

export async function login(args: LoginInput) {
  const res = await axiosV1.post<ApiResponse>('/auth/login', args);
  return res.data;
}

export async function signup(args: SignupInput) {
  const res = await axiosV1.post<ApiResponse>('/auth/signup', args);
  return res.data;
}

export async function logout() {
  const res = await axiosV1.post<ApiResponse>('/auth/logout');
  return res.data;
}