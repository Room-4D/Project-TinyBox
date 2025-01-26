import { getCurrentSession } from '@/server/auth/session';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/auth/login');
  }

  return <div>Hello World</div>;
}
