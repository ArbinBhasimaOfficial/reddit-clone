import { createEnv } from '@t3-oss/env-nextjs'; // or core package
import * as z from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_SERVER_API_ENDPOINT: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_SERVER_API_ENDPOINT: process.env.NEXT_PUBLIC_BASE_SERVER_API_ENDPOINT,
  },
});