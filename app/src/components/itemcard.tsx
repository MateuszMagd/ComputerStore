import React from 'react';
import { promises as fs } from 'fs'
import path from 'path';
import Image from 'next/image';

interface ItemCardProps {
    photo: string; // Photo
    money: string;
    type: string; // For this case only 3: GPU, CPU, Motherboard
    specs: string; // Specs for component part -> as whole string with '/' as seprataor
    height: number;
    width: number;
}

interface ComponentProps {
    specs: string;
}

interface ProcesorCardProps {
    type: string;
    model: string;
    cores: string;
    threads: string;
    clockFrequency: string;
    cache: string;
    socketType: string;
}

interface GraphicCardProps {
    memoryType: string;
    RAMAbount: string; 
    dataBus: string;
    connectorType: string;
    cooling: string;
    multipleMonitorSupport: string;
}

interface MotherboardProps {
    format: string;
    processorSocket: string;
    chipset: string;
    maximumMemorySize: string;
    memoryType: string;
    numberOfMemoryBanks: string;
}


const ItemCard: React.FC<ItemCardProps> = async ({photo, money, type, specs, height, width}) => {
    return (
        <>
            <div className="flex flex-row border-2 p-10 border-slate-400 bg-white rounded-3xl shadow-2xl shadow-gray-500">
                <Image src={photo} alt='Alterantve' width={width} height={height} className='mr-5'/>
                <div
                    className="min-h-10 w-0.5 self-stretch bg-black dark:bg-black">
                </div>
                <div className='ml-5 '>
                    <div className='mb-20'>
                        <h1 className='font-bold text-2xl'>Specification</h1>
                        {type === "CPU" ? <ProcesorCard specs={specs}/>: <></>}
                        {type === "GPU" ? <GraphicCard specs={specs}/>: <></>}
                        {type === "Motherboard" ? <MotherboardCard specs={specs}/>: <></>}  
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h1 className='font-bold text-4xl mb-5'>{money} zł</h1>
                        <button className='border-1 border-black bg-black text-white rounded-md p-2 text-xl'> Add to cart! </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const ProcesorCard: React.FC<ComponentProps> = ({specs}) => {
    const [model, cores, threads, clockFrequency, cache, socketType] = specs.split("/");

    return (
        <>
            {model ? <p>Model: {model}</p> : <></>}
            {cores ? <p>Cores: {cores}</p> : <></>}
            {threads ? <p>Threads: {threads}</p> : <></> }
            {clockFrequency ? <p>Clock Frequency: {clockFrequency}</p> : <></>}
            {cache ? <p>Cache: {cache}</p> : <></>}
            {socketType ? <p>Socket Type: {socketType}</p>: <></>}
        </>  
    )
}

// TODO: Add as above
const GraphicCard: React.FC<ComponentProps> = ({specs}) => {
    const [memoryType, RAMAmount, dataBus, connectorType, cooling, multipleMonitorSupport] = specs.split("/");
    return (
        <div>
            <p>Memory Type: {memoryType}</p>
            <p>Ram amount: {RAMAmount}</p>
            <p>Data buss: {dataBus}</p>
            <p>Connector Type: {connectorType}</p>
            <p>Cooling: {cooling}</p>
            <p>Multiple Monitor Support: {multipleMonitorSupport}</p>
        </div>
    )
}

// TODO: Same as above xd
const MotherboardCard: React.FC<ComponentProps> = ({specs}) => {
    const [format, processorSocket, chipset, maximumMemorySize, memoryType, numberOfMemoryBanks] = specs.split("/");
    return (
        <div>
            <p>Format: {format}</p>
            <p>Processor Socket: {processorSocket}</p>
            <p>Chipset: {chipset}</p>
            <p>Maximum Memory Size: {maximumMemorySize}</p>
            <p>Memory Type: {memoryType}</p>
            <p>Number Of Memory Banks: {numberOfMemoryBanks}</p>
        </div>
    )
}


export default ItemCard;
