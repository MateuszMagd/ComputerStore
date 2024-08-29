// src/app/products/page.tsx

"use client"

import ProductInfoRow from "@/components/admin-components/product-info-row";
import { Product } from "@/components/interfaces/data";
import { fetchAllProducts } from "@/components/server-components/fetch-data";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await fetchAllProducts();
                setIsLoading(false);
                setProducts(data);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setError("Product Data couldn't be fetched.");
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="flex flex-row justify-center min-h-screen">{error}</div>;
    }

    const handleDelete = (sessionId: string) => {
        if (window.confirm(`Are you sure you want to delete the product with session ID: ${sessionId}?`)) {
            window.location.href = `/admin/delete-product/${sessionId}`;
        }
    };

    const handleModify = (sessionId: string) => {
        window.location.href = `/admin/modify-product/${sessionId}`;
    };

    return (
        <div className="container mx-auto">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Specs</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductInfoRow
                            key={product.sessionId}
                            product={product}
                            onDelete={() => handleDelete(product.sessionId)}
                            onModify={() => handleModify(product.sessionId)}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr className="mt-10">
                        <td colSpan={7}>
                            <Link
                                className="flex justify-center w-full p-2 bg-green-500 text-white"
                                href="/admin/add-new-product"
                            >
                                Add New Product
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default ProductsPage;
