import Home from "@/components/pages/home";
import { Product } from "@/components/interfaces/data";
import { fetchBestProducts } from "@/components/server-components/fetch-data";



export default async function Page() {
  let ourBestProducts: Product[] = [];

  try {
    ourBestProducts = await fetchBestProducts();
  } catch (error) {
    console.error("Error fetching data:", error);
  }


  return (
    <Home ourBestProducts={ourBestProducts} />
  );
}