import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FavoriteCardProps {
    photo: string;
    title: string;
    price: string;
    id: string;
}

// Add variable to see item card
const FavoriteCard: React.FC<FavoriteCardProps>= ({photo, title, price, id}) => {
    return (
        <div className="flex flex-row shadow-xl shadow-gray-500 border-2 border-slate-400 rounded-3xl p-6 mb-12">
            <Image src={photo} alt="alt" height={300} width={300}/>
            <div className="min-h-10 w-0.5 mx-10 self-stretch bg-black dark:bg-black">
            </div>
            <div className="flex flex-col space-y-16">
                <div className="font-bold text-4xl text-center">{title}</div>
                <div className="text-4xl text-center">{price}</div>
                <Link className='border-1 border-black bg-black text-white rounded-md p-2 text-xl text-center' href="/"> Show me </Link>
            </div>
        </div>
    )
}

export default FavoriteCard;