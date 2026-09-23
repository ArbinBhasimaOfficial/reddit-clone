export const APP_ROUTES = {
  HOME: '/',
  POST: {
    CREATE: '/urd/post/create',
    VIEW: (slug: string) => `/post/${slug}` as const,
    EDIT: (id: string) => `/urd/post/${id}/edit` as const,
  },
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  DASHBOARD: '/urd',
} as const;