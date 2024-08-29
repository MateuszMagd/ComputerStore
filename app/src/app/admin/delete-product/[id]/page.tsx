"use client";

import { useEffect, useState } from "react";
import { fetchProductBySessionId } from "@/components/server-components/fetch-data";
import { deleteProductBySessionId } from "@/components/server-components/delete-data";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const DeleteProductPage = ({params}: {params: {id: string}}) => {
    const [productName, setProductName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const sessionId = params.id;

            if (sessionId) {
                try {
                    const data = await fetchProductBySessionId({sessionId: sessionId});
                    if(data === null) {
                        throw Error("Something went wrong . . .")
                    }
                    setProductName(data.name);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                    setIsLoading(false);
                    setError("Product data couldn't be fetched.");
                }
            }
        };

        fetchProduct();
    }, []);

    const handleDelete = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('sessionId');

        if (sessionId) {
            try {
                await deleteProductBySessionId(sessionId);
                alert("Product deleted successfully!");
                window.location.href = "/admin/products";
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Error deleting product.");
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold">Delete Product</h1>
            <div className="my-4">
                <p>Are you sure you want to delete the product: <strong>{productName}</strong>?</p>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DeleteProductPage;
