import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';

export const Socials = () => {
  return (
    <Button
      variant='secondary'
      className='flex w-full gap-2 font-medium'
    >
      <FcGoogle className='size-12' />

    </Button>
  );
};
