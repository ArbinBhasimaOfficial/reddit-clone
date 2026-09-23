import AuthPage from '../_components/auth-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in · common ground',
  description: 'Sign in to your common ground account.',
};

function LoginPage() {
  return <AuthPage mode="login" />;
}

export default LoginPage;