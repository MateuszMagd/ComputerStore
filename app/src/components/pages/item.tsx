import ItemCard from "@/components/itemcard";
import ShopCard from "@/components/shopcard";
import { Product } from "../interfaces/data";

const Item: React.FC<{product: Product}> = ({product}) => {
    return (
        <div className="px-10 py-5">
            <ShopCard photo={product.photo} height={600} width={600} inStorage={product.amount} money={product.price} type={product.type} specs={product.specs} sessionId={product.sessionId}/>
        </div>
    )
}

export default Item;