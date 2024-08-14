import ItemCard from "@/components/itemcard";
import { Cpu, Microchip, Computer } from 'lucide-react';
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="flex flex-row w-full mb-5">
        <div className="bg-white w-1/3 mr-10 border-2 border-slate-400 rounded-3xl shadow-2xl shadow-gray-500">
          <h1 className="px-10 py-5 text-4xl font-bold ">Our components</h1>
          <div className="flex flex-col px-16 space-y-2">
            <div >
              <Link href="./" className="flex flex-row"><Cpu />  Procesors</Link>
            </div>
            <div>
              <Link href="./" className="flex flex-row"><Microchip /> Graphic Card</Link>
            </div>
            <div>
              <Link href="./" className="flex flex-row"><Computer /> Motherboard</Link>
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold text-4xl text-center w-2/2">
            <h1>For every true gamer!</h1>
          </div>
          <div className="flex flex-row space-x-2">
            <ItemCard photo="/products/1/Karta-graficzna-GIGABYTE-GeForce-RTX-4070-Windforce-OC-12GB-front-skos-box.jpg" height={600} width={600} money="2650.50" type="GPU" specs="" />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="font-bold text-4xl">
          <h1>Our best!</h1>
        </div>
        <div className="flex flex-row space-x-2">
          <ItemCard photo="/products/3/Procesor-AMD-Ryzen-5-9600X-front.jpg" height={300} width={200} money="1299.99" type="CPU" specs=""/>
          <ItemCard photo="/products/1/Karta-graficzna-GIGABYTE-GeForce-RTX-4070-Windforce-OC-12GB-front-skos-box.jpg" height={300} width={200} money="2650.50" type="GPU" specs="" />
          <ItemCard photo="/products/2/Plyta-glowna-MSI-B760-01-front.jpg" height={300} width={200} money="700.00" type="Motherboard" specs=""/>
        </div>
      </div>
    </main>
  );
}
