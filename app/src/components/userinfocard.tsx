import React from "react";

interface InfoCardProps {
    title: string;
    name?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    country?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({title, name, lastName, email, phoneNumber, address, city, country}) => {
    return (
        <div className="border-2 border-slate-400 rounded-3xl mx-10 my-5 px-12 py-6 bg-white shadow-2xl shadow-gray-500">
            <h1 className="font-bold text-3xl border-b-2 border-slate-400 p-2">{title}</h1>
            <div className="flex flex-col px-6 py-2 font-sm text-xl w-full">
                {name ? <div className="m-5 flex flex-row indent-1"><span className="font-bold">Name: </span> {name}</div> : <></>}
                {lastName ? <div className="m-5 flex flex-row indent-1"><span className="font-bold">Last name: </span> {lastName}</div> : <></>}
                {email ? <div className="m-5 flex flex-row indent-1"><span className="font-bold">Email: </span> {email}</div> : <></>}
                {phoneNumber ? <div className="m-5 flex flex-row indent-1"><span className="font-bold">Phone number: </span> {phoneNumber}</div> : <></>}
                {address ? <div className="m-5 flex flex-row indent-1"><span className="font-bold">Address:</span> {address}</div> : <></>}
                {city ? <div className="m-5 flex flex-row indent-1"><span className="font-bold">City:</span> {city}</div> : <></>}
                {country ? <div className="m-5 flex flex-row indent-1"><span className="font-bold">Country:</span> {country}</div> : <></>}
            </div>
        </div>
    );
}

const UserInfoCard = () => {
    // Temporary data will be as string -> after front end, this info will be from database by REST api
    // Basic info
    const name = "Mateusz";
    const lastName = "Magdziński"
    const email = "mateusz.mag7@gmail.com";
    const phoneNumber = "+48 732 723 082";
    // Delivery info
    const address = "some address lol";
    const city = "Lodz";
    const country = "Poland";


    return (
        <div>
            <InfoCard title="Basic Info" name={name} lastName={lastName} email={email} phoneNumber={phoneNumber}/>
            <InfoCard title="Delivery Address" address={address} city={city} country={country}/>
        </div> 
    );
}

export default UserInfoCard;