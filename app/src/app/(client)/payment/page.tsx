"use client"

import { getToken } from "@/components/server-components/logger-handler";
import { createOrder, updateOrderToDelivered, updateOrderToReady } from "@/components/server-components/order-data";
import { useEffect } from "react";

const PagePayment = () => {
    const token = getToken();

    useEffect(() => {
        if (!token) {
            window.location.href="/login"
        }
    
    }, [])

    const handleFirstButton = async () => {
        try {
            const data = await createOrder();

            alert("Order made!");
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleSecondButton = async () => {
        try {
            const data = await updateOrderToReady();

            alert("Order Updated!");
        } catch (error) {
            console.log(error)
        }
    }

    const handleThirdButton = async () => {
        try {
            const data = await updateOrderToDelivered();

            alert("Order Updated!");
        } catch (error) {
            console.log(error)
        }
        
    }

    
    return (
        <div>
            <div className="text-6xl text-center">
                PAYMENT
            </div>
            <div className="text-center">
                <p className="text-2xl">
                    I want to say something, here should be a payment steps with for example stripe but I want it make little easier. <br />
                    Since this is a college project, I’ll just add three buttons: <br />
                    1. This button will place an order but not process the payment, simulating a situation where the user has placed an order but hasn’t paid yet. <br />
                    2. This button will update an order but with payment done, simulating a situation where the user has placed an order and has paid. <br />
                    3. This button will just simulate a situation where order was delivered to customer (nothing special just, as above but order is delivered, not ready), also <br />
                    this should be made by admin but I will just simplify this.
                </p>
            </div>

            <div className="flex flex-row space-x-10 justify-center py-10">
                <button onClick={handleFirstButton} className="border-1 border-black bg-black text-white rounded-md px-20 py-4 text-xl text-center">FIRST BUTTON</button>
                <button onClick={handleSecondButton} className="border-1 border-black bg-black text-white rounded-md px-20 py-4 text-xl text-center">SECOND BUTTON</button>
                <button onClick={handleThirdButton} className="border-1 border-black bg-black text-white rounded-md px-20 py-4 text-xl text-center">THIRD BUTTON</button>
            </div>
        </div>
    );
}

export default PagePayment;