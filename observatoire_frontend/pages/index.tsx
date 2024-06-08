import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { UserApi } from '@/api/user.api';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();


  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      const data = JSON.parse(currentUser || "{}");
      if (data.user.firstConnection) {
        router.push('/identification');
      } else {
        router.push('acceuil');
      }
    } else {
        router.push('/login');
    }
}, [router]);

  return null;
}
