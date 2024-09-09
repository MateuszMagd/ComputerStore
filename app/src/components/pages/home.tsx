"use client"
import ItemCard from "@/components/itemcard";
import { Cpu, Microchip, Computer } from 'lucide-react';
import Link from "next/link";
import { Product, ProductType } from "@/components/interfaces/data";
import React from "react";

export default function Home({ ourBestProducts }: { ourBestProducts: Product[] }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="flex flex-row w-full mb-5">
                <div className="bg-white w-1/3 mr-10 border-2 border-slate-400 rounded-3xl shadow-2xl shadow-gray-500">
                    <h1 className="px-10 py-5 text-4xl font-bold ">Our components</h1>
                    <div className="flex flex-col px-16 space-y-2">
                        <div >
                            <Link href={"/parts/"+ ProductType.CPU} className="flex flex-row"><Cpu />  Procesors</Link>
                        </div>
                        <div>
                            <Link href={"/parts/"+ ProductType.GPU} className="flex flex-row"><Microchip /> Graphic Card</Link>
                        </div>
                        <div>
                            <Link href={"/parts/"+ ProductType.Motherboard} className="flex flex-row"><Computer /> Motherboard</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="font-bold text-4xl text-center w-2/2">
                        <h1>For every true gamer!</h1>
                    </div>
                    <div className="flex flex-row space-x-2">
                        {ourBestProducts.length > 0 ? (
                            <ItemCard 
                                photo={ourBestProducts[0].photo} 
                                height={600} 
                                width={600} 
                                money={ourBestProducts[0].price} 
                                type={ourBestProducts[0].type} 
                                specs={ourBestProducts[0].specs} 
                                sessionId={ourBestProducts[0].sessionId}
                                />
                        ): (
                        <div> Something went wrong... </div>
                        )}
                        
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="font-bold text-4xl">
                    <h1>Our best!</h1>
                </div>
                <div className="flex flex-row space-x-2">
                    {ourBestProducts.length > 0 ? (
                        ourBestProducts.map((product) => (
                            <React.Fragment key={product.sessionId}>
                                <ItemCard 
                                    photo={product.photo} 
                                    height={300} 
                                    width={200} 
                                    money={product.price} 
                                    type={product.type} 
                                    specs={product.specs}
                                    sessionId={product.sessionId}
                                />
                            </React.Fragment>
                        ))
                    ) : (
                        <div> Something went wrong... </div>
                    )}
                </div>
            </div>
        </main>
    );
}
