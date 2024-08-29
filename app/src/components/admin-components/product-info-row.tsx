import { Product } from "@/components/interfaces/data";

interface ProductInfoRowProps {
    product: Product;
    onDelete: () => void;
    onModify: () => void;
}

const ProductInfoRow: React.FC<ProductInfoRowProps> = ({ product, onDelete, onModify }) => {
    return (
        <tr>
            <td>
                <img
                    src={product.photo}
                    alt={product.name}
                    className="w-20 h-20 object-cover"
                />
            </td>
            <td>{product.name}</td>
            <td>{product.amount}</td>
            <td>{product.price}</td>
            <td>{product.type}</td>
            <td>{product.specs}</td>
            <td>
                <button 
                    onClick={onModify} 
                    className="bg-blue-500 text-white p-1 mx-1"
                >
                    Modify
                </button>
                <button 
                    onClick={onDelete} 
                    className="bg-red-500 text-white p-1 mx-1"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ProductInfoRow;
