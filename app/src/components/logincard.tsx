import Link from 'next/link';
import React from "react";

interface InputProps{
    type: string
    id: string
    htmlFor: string
    classNamesLabel: string
    classNames: string
    labelString: string
}

const Input: React.FC<InputProps> = 
        ({type, id, htmlFor, classNamesLabel, classNames, labelString}) => {
    return (
        <div>
                    <label htmlFor={htmlFor} className={classNamesLabel}>{labelString}</label>
                    <input
                    type={type}
                    id={id}
                    className={classNames}
                    required/>
        </div>
    )
}

// TODO: Add functinality! - REMEMBER ABOUT HASH FUNCTION
const LoginCard = () => {
    return (
        <div className="border-2 rounded-xl p-4 border-gray-300 shadow-xl">
            <div className="font-bold text-2xl mb-5">
                Logowanie
            </div>
            <form className="p-5 bg-light-blue rounded-md w-full max-w-sm"> {/* Add onsubmit */}
                <div className="mb-5">
                    <Input type="email" id="email" htmlFor="email" labelString="Nazwa użytkownika" classNamesLabel="block text-sm font-medium " classNames="w-full px-16 py-2 mt-1 border rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    <Input type="password" id="password" htmlFor="password" labelString="Hasło" classNamesLabel="block text-sm font-medium mt-2" classNames="w-full px-16 py-2 mt-1 border rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-black text-white  focus:outline-none focus:ring-2 ">
                    ZALOGUJ
                </button>
            </form>
            <div className='flex flex-col mt-2 p-5 text-left'>
                <Link href="./" className='mb-4'>Did you forget password?</Link>
                <Link href="./">New account?</Link>
            </div>
        </div>
    )
};

export default LoginCard;