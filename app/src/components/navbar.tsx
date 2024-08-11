import React from 'react'
import Link from 'next/link';
import { ShoppingCart, Heart, UserRound } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <div className='flex p-2 border-b-2 border-slate-400 shadow-md shadow-gray-500'>
            <div className='flex p-2 justify-end'>
                <Link href='./client/computer-parts' className='p-1 border-2 border-black '> Computer Parts </Link>
                <Link href='./' className='p-1 border-2 border-black ml-3'> <Heart /> </Link>
                <Link href='./login' className='p-1 border-2 border-black ml-3'> <UserRound /> </Link>
                <Link href='./' className='p-1 border-2 border-black ml-3'> <ShoppingCart /> </Link>
            </div>
        </div>
    )
};

export default Navbar;