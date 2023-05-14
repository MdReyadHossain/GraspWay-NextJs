import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/logout');
                console.log(response.data);
                sessionStorage.clear();
                router.push('../login');
            } catch (error) {
                console.log("Logout Error: " + error);
                // router.push('/login');
            }
        }
        getData();
    })

    return null;
}