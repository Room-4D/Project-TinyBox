import { assertAuthenticated } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const user = await assertAuthenticated();

  return (
    <div className='flex min-h-screen flex-col'>
      <p className='text-lg font-semibold'>Welcome back {user.name} 👋</p>
      {children}
    </div>
  );
}