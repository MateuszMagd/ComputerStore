import axios from "axios";
import { Product } from "@/components/interfaces/data";

export const fetchBestProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>('http://localhost:8090/product/get/fiveproducts');
    response.data.forEach(product => {
      product.photo = `data:image/jpeg;base64,${product.photo}`;
      
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Could not get data');
  }
};

export const fetchProductBySessionId = async ({ sessionId }: { sessionId: string }): Promise<Product> => {
  try {
    const responde = await axios.get<Product>('http://localhost:8090/product/get/' + sessionId);
    responde.data.photo = `data:image/jpeg;base64,${responde.data.photo}`
    return responde.data;
  } catch(error) {
    console.error('Error fetching data:', error);
    throw new Error('Could not get data');
  }
}