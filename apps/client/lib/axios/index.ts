import { env } from '../../env.mjs';
import axios from 'axios';

const BASE_ENDPOINT = env.NEXT_PUBLIC_BASE_SERVER_API_ENDPOINT;

export const axiosV1 = axios.create({
  baseURL: `${BASE_ENDPOINT}/v1`,
  withCredentials: true,
});