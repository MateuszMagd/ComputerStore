"use client";

import RegistrationCard from "@/components/registrationcard";
import isLogged from "@/components/server-components/logger-handler";
import { useEffect } from "react";

const Registration = () => {
    useEffect(() => {
        if(isLogged()) {
            window.location.href = "./";
        }
    }, []);
    
    return (
        <RegistrationCard />
    );
};

export default Registration;
