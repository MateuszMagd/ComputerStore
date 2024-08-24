import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CartInfoProps } from "./interfaces/data";


// Add variable to see item card
const CardElement: React.FC<CartInfoProps>= ({photo, title, price, sessionId, amount}) => {
    return (
        <div className="flex flex-row shadow-xl shadow-gray-500 border-2 border-slate-400 rounded-3xl p-6 mb-12">
            <Image src={photo} alt="alt" height={300} width={300}/>
            <div className="min-h-10 w-0.5 mx-10 self-stretch bg-black dark:bg-black">
            </div>
            <div className="flex flex-col space-y-16">
            <div className="font-bold text-4xl text-center">{title}</div>
                <div className="space-y-2">
                    <div className="text-4xl text-center">{price}</div>
                    <div className="text-xl text-center">{amount}</div>
                </div>
                <div className="flex flex-col ">
                    <Link className='border-1 border-black bg-black text-white rounded-md p-2 text-xl text-center' href={"/component/" + sessionId}> Show me </Link>
                </div>
            </div>
        </div>
    )
}

export default CardElement;