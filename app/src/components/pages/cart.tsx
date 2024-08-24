import CardElement from "../card-element";
import { Cart } from "@/components/interfaces/data";
import { fetchCartProducts } from "../server-components/fetch-data";
import React from "react";

const CartsPage = async () => {
    let cartItems: Cart[] = [];
    try {
        cartItems = await fetchCartProducts(5);
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <div className="flex flex-col justify-center px-16 py-2 bg-white rounded-sm border-slate-200 shadow-sm shadow-gray-500">
            {cartItems.length > 0 ? (
                cartItems.map((cart) => (
                    <React.Fragment key={cart.sessionId}>
                        <CardElement 
                            photo={cart.photo}
                            title={cart.name}
                            price={cart.price}
                            sessionId={cart.sessionId}
                            amount={cart.quantity}
                        />
                    </React.Fragment>
                ))
            ) : (
                <div>Something went wrong. . .</div>
            )}
        </div>
    )
}

export default CartsPage;