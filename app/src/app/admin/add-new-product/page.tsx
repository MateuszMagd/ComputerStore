'use client'

import { useState } from "react";
import { NewProduct, ProductType } from "@/components/interfaces/data";
import { saveNewProduct } from "@/components/server-components/save-data";

const AddProductForm = () => {
    const [product, setProduct] = useState<NewProduct>({
        name: "",
        specs: "",
        price: 0,
        amount: 0,
        type: ProductType.GPU, // Default value
        photo: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct({ ...product, type: e.target.value as ProductType });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProduct({ ...product, photo: base64String.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await saveNewProduct(product);
            alert("Product added successfully!");
            window.location.href = "/admin/products";
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Error adding product: " + error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 border rounded shadow-lg">
            <h2 className="text-lg font-bold">Add New Product</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label>Specs:</label>
                <input
                    type="text"
                    name="specs"
                    value={product.specs}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={product.amount}
                    onChange={(e) => setProduct({ ...product, amount: parseInt(e.target.value, 10) })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label>Type:</label>
                <select name="type" value={product.type} onChange={handleTypeChange} className="w-full p-2 border rounded">
                    <option value={ProductType.GPU}>GPU</option>
                    <option value={ProductType.CPU}>CPU</option>
                    <option value={ProductType.Motherboard}>Motherboard</option>
                </select>
            </div>
            <div>
                <label>Photo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="flex justify-between">
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Add Product
                </button>
                <button type="button" onClick={() => window.location.href = "/admin/products"} className="p-2 bg-gray-500 text-white rounded">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AddProductForm;
