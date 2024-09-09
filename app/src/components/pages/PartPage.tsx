import React from "react";
import { Product } from "../interfaces/data";
import ItemCard from "../itemcard";

interface PartPageProps {
    products: Product[];
}

const PartPage: React.FC<PartPageProps> = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <React.Fragment key={product.sessionId}>
                    <ItemCard
                        photo={product.photo}
                        height={600}
                        width={600}
                        money={product.price}
                        type={product.type}
                        specs={product.specs}
                        sessionId={product.sessionId}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}

export default PartPage;
