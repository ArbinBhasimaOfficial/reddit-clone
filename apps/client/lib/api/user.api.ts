import { ApiResponse, CleanedUser } from '@reddit-clone/shared';
import { axiosV1 } from '../axios';

export async function getUserData() {
  const res = await axiosV1.get<ApiResponse<CleanedUser>>('/user');
  return res.data;
}