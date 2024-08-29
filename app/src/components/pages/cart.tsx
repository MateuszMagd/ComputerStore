import CardElement from "../card-element";
import { Cart } from "@/components/interfaces/data";
import { fetchCartProducts, fetchPageNumber } from "../server-components/fetch-data";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const CartsPage = () => {
    const [cartItems, setCartItems] = useState<Cart[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pages, setPages] = useState<number>(10);
    const [currenctPage, setCurrenctPage] = useState<number>(1);
    useEffect(() => {
        const fetchData = async () => {
            setCartItems([]);

            try {
                const fetchedCartItems = await fetchCartProducts(currenctPage-1);
                if(fetchedCartItems === null) {
                    throw new Error("There is nothing to show")
                }
                setCartItems(fetchedCartItems);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("There is nothing to show");
                setIsLoading(false);
            }

            try {
                const pageNumbers = await fetchPageNumber();
                if(pageNumbers === -1) {
                    throw new Error("There is no item in cart");
                }
                setPages(pageNumbers);
                setIsLoading(false);
                console.log("PAGE NUMBERS" + pageNumbers);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("There is no item in cart");
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currenctPage]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const changePage = (newPage: number) => {
        if(currenctPage !== newPage) {
            setCurrenctPage(newPage);
        }
    }

    const renderPageNumbers = () => {
        let pageNumbers = [];
    
        if (currenctPage === 1) {
            pageNumbers = [currenctPage, currenctPage + 1, currenctPage + 2].filter(page => page <= pages);
        } else if (currenctPage === pages) {
            pageNumbers = [currenctPage - 2, currenctPage - 1, currenctPage].filter(page => page >= 1);
        } else {
            pageNumbers = [currenctPage - 1, currenctPage, currenctPage + 1].filter(page => page <= pages && page >= 1);
        }
    
        return pageNumbers.map((page, index) => (
            <button key={index} className={page === currenctPage ? "font-bold mx-2" : "mx-2"} onClick={() => changePage(page)}>
                {page}
            </button>
        ));
    };

    return (
        <div className="flex flex-col justify-center content-center px-16 py-2 bg-white rounded-sm border-slate-200 shadow-sm shadow-gray-500">
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((cart) => (
                        <React.Fragment key={cart.sessionId}>
                            <CardElement 
                                photo={cart.photo}
                                title={cart.name}
                                price={cart.price}
                                sessionId={cart.sessionId}
                                amount={cart.quantity}
                                sessionCartId={cart.sessionCartId}
                            />
                        </React.Fragment>
                    ))}
                </>
            ) : (
                <div>Something went wrong. . . {cartItems.length}</div>
            )}
            <div className="flex flex-row indent-2 w-full text-center justify-center">
                {renderPageNumbers()}
            </div>

            <div className="flex flex-row justify-center mt-10">
                <Link href="/payment" className="border-1 border-black bg-black text-white rounded-md px-20 py-4 text-xl text-center"> BUY </Link>
            </div>
        </div>
    );
}

export default CartsPage;
