import AuthPage from '../_components/auth-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create an account · common ground',
  description: 'Create your common ground account.',
};

function SignupPage() {
  return <AuthPage mode="signup" />;
}

export default SignupPage;