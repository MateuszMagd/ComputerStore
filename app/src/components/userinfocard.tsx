"use client"

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { User } from "./interfaces/data";
import { fetchUserInfo } from "./server-components/fetch-data";
import { DeliveryCardProps, InfoCardProps } from "./interfaces/props-data";
import isLogged, { clearToken } from "./server-components/logger-handler";
import { updateAddressData, updatePersonalData } from "./server-components/update-data";

const InfoCard: React.FC<InfoCardProps> = ({title, name, lastName, email, phoneNumber}) => {
    
    useEffect(() => {
        if(!isLogged()) {
            window.location.href = '/login';
            return;
        }
    })

    const nameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => { 
        if(!isLogged()) {
            window.location.href = '/login';
            return;
        }

        e.preventDefault();

        try {
            const newName: string | undefined = nameRef.current?.value || name;
            const newLastName: string | undefined = lastNameRef.current?.value || lastName;
            const newEmail: string | undefined = emailRef.current?.value || email;
            const newPhoneNumber: string | undefined = phoneNumberRef.current?.value || phoneNumber;


            updatePersonalData(newName, newLastName, newEmail, newPhoneNumber);

            if(email !== newEmail) {
                clearToken()
            }

            alert('Personal Data updated!');
            window.location.reload();
        } catch (err) {
            console.log("Error!", err);
        }
    }


    return (
        <div className="border-2 border-slate-400 rounded-3xl mx-10 my-5 px-12 py-6 bg-white shadow-2xl shadow-gray-500">
            <h1 className="font-bold text-3xl border-b-2 border-slate-400 p-2">{title}</h1>
            <div className="flex flex-col px-6 py-2 font-sm text-xl w-full">
                <form>
                    <div className="m-5 flex flex-row indent-1 justify-between" >
                        <div>
                            <span className="font-bold">Name: </span>{name ? name : <>Not set</>}
                        </div>
                        <div>
                            Change Name: <input type="text" ref={nameRef} defaultValue={name ? name : "not set"}  className="border birder-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ml-1"/>
                        </div>
                    </div> 
                    <div className="m-5 flex flex-row indent-1 justify-between">
                        <div>
                            <span className="font-bold"> Last name: </span> {lastName ? lastName : <>Not set</>}
                        </div>
                        <div>
                            Change Lastname: <input type="text" ref={lastNameRef} defaultValue={lastName ? lastName : "not set"}  className="border birder-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ml-1"/>
                        </div>
                        
                    </div>
                    <div className="m-5 flex flex-row indent-1 justify-between">
                        <div>
                            <span className="font-bold"> Email: </span>{email ? email :  <>Not set</>}
                        </div>
                        <div>
                            Change Email: <input type="text" ref={emailRef} defaultValue={email ? email : "not set"}  className="border birder-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ml-1"/>
                        </div>
                    </div> 
                    <div className="m-5 flex flex-row indent-1 justify-between">
                        <div>
                            <span className="font-bold"> Phone number: </span> {phoneNumber ? phoneNumber :  <>Not set</>}
                        </div>
                        <div>
                            Change Phone number: <input type="text" ref={phoneNumberRef} defaultValue={phoneNumber ? phoneNumber : "not set"}  className="border birder-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ml-1"/>
                        </div>
                        
                        
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-black rounded-full  focus:outline-none focus:ring-2 "
                        onClick={handleSubmit}
                    >
                        Change data
                    </button>
                </form>
                
            </div>
        </div>
    );
}

const DeliveryCard: React.FC< DeliveryCardProps> = ({title, address, city, country}) => {
    const addressRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);


    const handleSubmit = async (e: FormEvent) => { 
        if(!isLogged()) {
            window.location.href = '/login';
            return;
        }

        e.preventDefault();

        try {
            const newAdress: string | undefined = addressRef.current?.value || address;
            const newCountry: string | undefined = countryRef.current?.value || country;
            const newCity: string | undefined = cityRef.current?.value || city;



            updateAddressData(newAdress, newCountry, newCity);

            alert('Delivery Data updated!');
            window.location.reload();
        } catch (err) {
            console.log("Error!", err);
        }
    }
    return (
        <div className="border-2 border-slate-400 rounded-3xl mx-10 my-5 px-12 py-6 bg-white shadow-2xl shadow-gray-500">
            <h1 className="font-bold text-3xl border-b-2 border-slate-400 p-2">{title}</h1>
            <div className="flex flex-col px-6 py-2 font-sm text-xl w-full">
                <form>
                    <div className="m-5 flex flex-row indent-1 justify-between">
                        <div>
                            <span className="font-bold">Address: </span>{address ?  address :  <>Not set</>}
                        </div>
                        <div>
                            Change Address: <input type="text" ref={addressRef} defaultValue={address ? address : "not set"}  className="border birder-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ml-1"/>
                        </div>
                    </div>
                    <div className="m-5 flex flex-row indent-1 justify-between">
                        <div>
                            <span className="font-bold">City: </span>{city ?  city :  <>Not set</>}
                        </div>
                        <div>
                            Change City: <input type="text" ref={cityRef} defaultValue={city ? city : "not set"}  className="border birder-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ml-1"/>
                        </div>
                    </div>
                    <div className="m-5 flex flex-row indent-1 justify-between">
                        <div>
                            <span className="font-bold">Country: </span> {country ? country :  <>Not set</>}
                        </div>
                        <div>
                            Change Country: <input type="text" ref={countryRef} defaultValue={country ? country : "not set"}  className="border birder-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ml-1"/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-black rounded-full  focus:outline-none focus:ring-2 "
                        onClick={handleSubmit}
                    >
                        Change data
                    </button>
                </form>
            </div>
        </div>
    );
}


const UserInfoCard = () => {
    // Stan do przechowywania danych użytkownika
    const [userInfo, setUserInfo] = useState<User | null>(null);

    // Pobieranie danych użytkownika po załadowaniu komponentu
    useEffect(() => {
        const loadUserInfo = async () => {
            const data = await fetchUserInfo();
            setUserInfo(data);
        };
        
        loadUserInfo();
    }, []);

    // Renderowanie komponentu
    return (
        <div>
            {userInfo ? (
                <>
                    <InfoCard 
                        title="Basic Info" 
                        name={userInfo.name} 
                        lastName={userInfo.lastName} 
                        email={userInfo.email} 
                        phoneNumber={userInfo.phoneNumber}
                    />
                    <DeliveryCard
                        title="Delivery Address" 
                        address={userInfo.address} 
                        city={userInfo.city} 
                        country={userInfo.country}
                    />
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div> 
    );
};

export default UserInfoCard;