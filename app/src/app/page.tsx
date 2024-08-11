import ItemCard from "@/components/itemcard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-slate-200">
      <div className="flex flex-row space-x-3">
        <ItemCard photo="/products/3/Procesor-AMD-Ryzen-5-9600X-front.jpg" money="1299.99" height={300} width={200} type="CPU" specs="AMD Ryzen 5/Ryzen 5 9600X/6/12/3.9/38/Socket AM5"/>
        <ItemCard photo="/products/1/Karta-graficzna-GIGABYTE-GeForce-RTX-4070-Windforce-OC-12GB-front-skos-box.jpg" height={300} width={200} money="2650.50" type="GPU" specs="GDDR 6X/12288/192/PCI Express 4.0 x16/Aktywne/4" />
        <ItemCard photo="/products/2/Plyta-glowna-MSI-B760-01-front.jpg" height={300} width={200} money="700.00" type="Motherboard" specs="ATX/Socket 1700/Intel B760/256 GB/DDR 5/4 x DIMM"/>
      </div>
      <div className="flex flex-row space-x-3">
        <ItemCard photo="/products/3/Procesor-AMD-Ryzen-5-9600X-front.jpg" height={300} width={200} money="1299.99" type="CPU" specs="AMD Ryzen 5/Ryzen 5 9600X"/>
        <ItemCard photo="/products/1/Karta-graficzna-GIGABYTE-GeForce-RTX-4070-Windforce-OC-12GB-front-skos-box.jpg" height={300} width={200} money="2650.50" type="GPU" specs="GDDR 6X/12288/192/PCI Express 4.0 x16/Aktywne/4" />
        <ItemCard photo="/products/2/Plyta-glowna-MSI-B760-01-front.jpg" height={300} width={200} money="700.00" type="Motherboard" specs="ATX/Socket 1700/Intel B760/256 GB/DDR 5/4 x DIMM"/>
      </div>
    </main>
  );
}
