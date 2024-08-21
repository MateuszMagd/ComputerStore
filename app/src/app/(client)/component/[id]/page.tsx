import Home from "@/components/pages/home";
import { Product } from "@/components/interfaces/data";
import { fetchProductBySessionId } from "@/components/server-components/fetch-data";
import Item from "@/components/pages/item";



export default async function Page({params}: {params: {id: string}}) {
  let product: Product | null = null

  try {
    product = await fetchProductBySessionId({sessionId: params.id});
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  if(product === null){
    return (
        <div>Something went wrong. . .</div>
    ) 
  }
  else{
    return (
        <Item product={product} />
      );
  }
  
}