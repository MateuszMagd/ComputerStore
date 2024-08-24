"use client"

import axios from 'axios';
import React, { FormEvent, useState } from "react";
import { saveToken } from './server-components/logger-handler';

interface InputProps{
    type: string
    id: string
    htmlFor: string
    classNamesLabel: string
    classNames: string
    labelString: string
}

const LoginCard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        try { 
            e.preventDefault();
            const response = await axios.post('http://localhost:8090/api/authenticate', {
                email,
                password,
                });
            
            // Setting token
            const token = response.data.token;
            setToken(token);
            setError('');
            saveToken(token);
            window.location.href = "/";

        } catch (err) {
            setError('Invalid email or password');
            setToken('');
        }
    }
    

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='bg-white p-8 border-2 rounded-sm border-slate-200 shadow-sm shadow-gray-500'>
                <form onSubmit={handleSubmit} className="p-5 bg-light-blue rounded-md w-full max-w-sm">
                <h2 className="mb-4 p-5 text-2xl font-bold text-center">Login</h2>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium ">Username</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-black rounded-full  focus:outline-none focus:ring-2 "
                >
                    Login
                </button>
                </form>
                <div className='mt-2 p-5 text-center'>
                <div className='w-full mb-2'>
                    <a >Forget password?</a>
                </div>
                <div className='w-full'>
                    <a >New account?</a>
                </div>
                </div>
            </div>
        </div>
    )
};

export default LoginCard;