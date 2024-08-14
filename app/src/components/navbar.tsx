import React from 'react'
import Link from 'next/link';
import { ShoppingCart, Heart, UserRound } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <div className='flex p-2 border-b-2 border-slate-400 shadow-md shadow-gray-500 justify-between'>
            <div className='flex p-2'>
                <Link href='/' className='items-center text-center font-bold text-xl'> ComputerShop.net </Link>
            </div>
            <div className='flex p-2 space-x-4 justify-end'>
                <Link href='/user/favorite' className=''> <Heart /> </Link>
                <Link href='/login' className=''> <UserRound /> </Link>
                <Link href='/' className=''> <ShoppingCart /> </Link>
            </div>
        </div>
    )
};

export default Navbar;