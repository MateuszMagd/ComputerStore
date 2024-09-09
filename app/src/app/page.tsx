import Home from "@/components/pages/home";
import { Product } from "@/components/interfaces/data";
import { fetchBestProducts } from "@/components/server-components/fetch-data";



export default async function Page() {
  let ourBestProducts: Product[] | null = [];

  try {
    ourBestProducts = await fetchBestProducts();
    ourBestProducts = ourBestProducts ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  if(ourBestProducts == null) {
    return (
      <div>
        Noting to see . . .
      </div>
    )
  }

  return (
    <Home ourBestProducts={ourBestProducts} />
  );
}