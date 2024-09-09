import React from "react";
import { Product, ProductType } from "@/components/interfaces/data";
import { fetchProductsByTypeAsc, fetchProductsByTypeDesc } from "@/components/server-components/fetch-data";
import PartPage from "@/components/pages/PartPage";

interface Props {
    products: Product[];
}

const Page = async ({ params, searchParams }: { params: { id: ProductType }; searchParams: { sort?: string } }) => {
    const sort = searchParams.sort === 'asc' ? 1 : 0;
    const id = params.id;

    let products: Product[] = [];
    console.log("Sort: " + sort);
    console.log(sort === 0);
    console.log(sort == 0);
    try {
        if (sort === 0) {
            products = await fetchProductsByTypeDesc(id);
        } else {
            products = await fetchProductsByTypeAsc(id);
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    products.forEach(products => {
        console.log(products.name);
    })
    if (products.length === 0) {
        return <div>Empty section</div>;
    }

    return (
        <div>
            <div className="flex flex-row justify-center">
                <a href={`?sort=asc`} className="border-1 border-black bg-black text-white rounded-md px-20 py-4 text-xl text-center">Sortuj rosnąco</a>
                <a href={`?sort=desc`} className="border-1 border-black bg-black text-white rounded-md px-20 py-4 text-xl text-center">Sortuj malejąco</a>
            </div>
            <PartPage products={products} />
        </div>
    );
};

export default Page;
