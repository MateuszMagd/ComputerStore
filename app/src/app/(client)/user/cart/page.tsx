"use client"

import CartsPage from "@/components/pages/cart";
import isLogged, { getToken } from "@/components/server-components/logger-handler";
import React, { useEffect } from "react";

const Cart = () => {
    
    useEffect(() => {
        if(!isLogged()) {
            window.location.href = "/login";
        }
    }, []);

    return (
        <div className="px-32 py-4 border-2 border-">
            <CartsPage></CartsPage>
        </div>
        
    );
}

export default Cart;