import { Box } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      {/* Logo Banner maybe for large screens? Can remove if u want */}
      <div className='hidden h-full flex-col gap-4 items-center justify-center bg-blue-100 lg:flex'>
        <Box className='size-20' />
        <p className='text-xs font-semibold'>Sometimes all you need is a tinybox</p>
      </div>
      <div className='flex flex-col justify-center items-center'>{children}</div>
    </div>
  );
}
