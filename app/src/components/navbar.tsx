"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, UserRound, Archive } from 'lucide-react';
import { clearToken, getToken } from './server-components/logger-handler';

const Navbar: React.FC = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const savedToken = getToken();
        setToken(savedToken);
    }, []);

    return (
        <div className='flex p-2 border-b-2 border-slate-400 shadow-md shadow-gray-500 justify-between'>
            <div className='flex p-2'>
                <Link href='/' className='items-center text-center font-bold text-xl'>ComputerShop.net</Link>
            </div>
            <div className='flex p-2 space-x-4 justify-end'>
                {token ? (
                    <Link href="/user/my-info"> <Archive /> </Link>
                ) : <></>}
                {token ? (
                    <button onClick={() => { 
                        clearToken();
                        window.location.reload();
                    }}>Logout</button> 
                ) : (
                    <Link href='/login' className=''> <UserRound /> </Link>
                )}
                <Link href='/user/cart' className=''> <ShoppingCart /> </Link>
            </div>
        </div>
    );
};

export default Navbar;
