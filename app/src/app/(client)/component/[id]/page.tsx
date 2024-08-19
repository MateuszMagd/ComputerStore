import ItemCard from "@/components/itemcard";
import ShopCard from "@/components/shopcard";

const Item = ({params}: {params: {id: string}}) => {
    return (
        <div className="px-10 py-5">
            <ShopCard photo="/products/1/Karta-graficzna-GIGABYTE-GeForce-RTX-4070-Windforce-OC-12GB-front-skos-box.jpg" height={600} width={600} inStorage="10" money="2650.50" type="GPU" specs="GDDR 6X/12288/192/PCI Express 4.0 x16/Aktywne/4" />
        </div>
    )
}

export default Item;