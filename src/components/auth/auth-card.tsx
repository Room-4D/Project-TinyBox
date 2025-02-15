import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';

import { Socials } from './socials';

type Props = {
  children: React.ReactNode;
  cardTitle: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocials?: boolean;
};

export const AuthCard = ({ children, cardTitle, backButtonLabel, backButtonHref, showSocials }: Props) => {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center'>
          <h2 className='text-3xl'>{cardTitle}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {children}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>Or continue with</span>
            </div>
          </div>
          {showSocials && <Socials />}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          variant='link'
          className='w-full font-medium'
        >
          <Link
            aria-label={backButtonLabel}
            href={backButtonHref}
          >
            {backButtonLabel}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
