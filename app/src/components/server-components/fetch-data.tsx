import axios from "axios";
import { Cart, Product } from "@/components/interfaces/data";
import { getToken } from "./logger-handler";

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

export const fetchCartProducts = async (limit: number): Promise<Cart[]> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    console.log(token)
    const response = await axios.get<Cart[]>('http://localhost:8090/api/cart/get/cart/item', {
      headers: {
        'Authorization': `${token}`,
      },
      params: {
        limit: limit,
      }
    });

    response.data.forEach(cart => {
      cart.photo = `data:image/jpeg;base64,${cart.photo}`;
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Could not get data');
  }
}