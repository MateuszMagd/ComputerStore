"use client";

import { useEffect, useState } from "react";
import { Product, ProductType } from "@/components/interfaces/data";
import { fetchProductBySessionId } from "@/components/server-components/fetch-data";
import { updateProduct } from "@/components/server-components/update-data";

const ModifyProductPage = ({params}: {params: {id: string}}) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const sessionId = params.id;

            if (sessionId) {
                try {
                    const data = await fetchProductBySessionId({sessionId: sessionId});
                    setProduct(data);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!product) return;

        try {
            await updateProduct(product);
            alert("Product updated successfully!");
            window.location.href = "/admin/products";
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Error updating product.");
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
            {product && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specs">
                            Specs
                        </label>
                        <input
                            type="text"
                            id="specs"
                            value={product.specs}
                            onChange={(e) => setProduct({ ...product, specs: e.target.value })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={product.amount}
                            onChange={(e) => setProduct({ ...product, amount: parseInt(e.target.value) })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                            Type
                        </label>
                        <select
                            id="type"
                            value={product.type}
                            onChange={(e) => setProduct({ ...product, type: e.target.value as ProductType })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        >
                            <option value={ProductType.GPU}>GPU</option>
                            <option value={ProductType.CPU}>CPU</option>
                            <option value={ProductType.Motherboard}>Motherboard</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
}

export default ModifyProductPage;
