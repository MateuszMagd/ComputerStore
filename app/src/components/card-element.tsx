import React, { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartInfoProps } from "./interfaces/props-data";
import isLogged from "./server-components/logger-handler";
import { deleteItemCart } from "./server-components/delete-data";


const CardElement: React.FC<CartInfoProps>= ({photo, title, price, sessionId, amount, sessionCartId}) => {
    const handleSubmit = async (e: FormEvent) => {
        if(!isLogged()) {
            window.location.href = '/login';
            return;
        }
        e.preventDefault();

        try {
            deleteItemCart(sessionCartId);
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-row shadow-xl shadow-gray-500 border-2 border-slate-400 rounded-3xl p-6 mb-12">
            <Image src={photo} alt="alt" height={500} width={500}/>
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
                    <button className="border-1 border-black bg-black text-white rounded-md p-2 text-xl text-center mt-5" onClick={handleSubmit}>Delete from cart</button>
                </div>
            </div>    
        </div>
    )
}

export default CardElement;