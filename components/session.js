import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Session() {
    const router = useRouter();

    useEffect(() => {
        const session = sessionStorage.getItem('email');
        if (!session)
            router.push('/login');
    }, []);

    return null;
};
