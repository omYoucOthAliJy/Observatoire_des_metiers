import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        Cookies.remove("currentUser");
        router.push('/login');
    }, [router]);

    return null;
}
