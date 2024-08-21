import { ProcesorCard, GraphicCard, MotherboardCard, ItemCardProps } from "./itemcard"
import React from "react"
import Image from "next/image"

interface ShopCardProps extends ItemCardProps{
    inStorage: number
}

const ShopCard: React.FC<ShopCardProps> = async ({photo, money, type, specs, height, width, inStorage}) => {
    return (
        <>
            {specs ? 
            <div className="flex flex-row border-2 p-10 border-slate-400 bg-white rounded-3xl shadow-2xl shadow-gray-500">
                <Image src={photo} alt='Alterantve' width={width} height={height} className='mr-5'/>
                <div
                    className="min-h-10 w-0.5 self-stretch bg-black dark:bg-black">
                </div>
                <div className='flex flex-row ml-5 w-full  justify-between'>
                    <div className='mb-20'>
                        {specs.length === 0 ?  <></> : <h1 className='font-bold text-2xl'>Specification</h1>}
                        {type === "CPU" ? <ProcesorCard specs={specs}/>: <></>}
                        {type === "GPU" ? <GraphicCard specs={specs}/>: <></>}
                        {type === "Motherboard" ? <MotherboardCard specs={specs}/>: <></>}  
                    </div>
                    <div className='flex flex-col p-10'>
                        <form className="">
                            <h1 className='font-bold text-6xl'>{money} zł</h1>
                            <div className="py-2">
                                <div>In Storage: {inStorage}</div>
                                <div>
                                    Amount: <input className="border-2 border-black rounded-md px-2" type="number" min={1} max={inStorage} defaultValue={1}></input>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button className='border-1 border-black bg-black text-white rounded-md p-2 text-xl w-full'> Add to cart! </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div> : 
            <div className="min-h-screen">Something went wrong. . . </div>}
        </>
    )
}

export default ShopCard;