import axios from "axios";
import { Cart, Product, User } from "@/components/interfaces/data";
import { getToken } from "./logger-handler";

export const fetchBestProducts = async (): Promise<Product[] | null> => {
  try {
    const response = await axios.get<Product[]>('http://localhost:8090/product/get/fiveproducts');
    response.data.forEach(product => {
      product.photo = `data:image/jpeg;base64,${product.photo}`;
      
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const fetchProductBySessionId = async ({ sessionId }: { sessionId: string }): Promise<Product | null> => {
  try {
    const responde = await axios.get<Product>('http://localhost:8090/product/get/' + sessionId);
    responde.data.photo = `data:image/jpeg;base64,${responde.data.photo}`
    return responde.data;
  } catch(error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export const fetchCartProducts = async (page: number): Promise<Cart[] | null> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.get<Cart[]>('http://localhost:8090/api/cart/get/cart/item', {
      headers: {
        'Authorization': `${token}`,
      },
      params: {
        page: page,
      }
    });
    if(response.data.length === 0) {
      console.log("Response data empty!");
      throw new Error("Response data empty!");
    }

    response.data.forEach(cart => {
      cart.photo = `data:image/jpeg;base64,${cart.photo}`;
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export const fetchUserInfo = async (): Promise<User | null> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.get<User>('http://localhost:8090/api/user/get/user/info', {
      headers: {
        'Authorization': `${token}`,
      },
    });

    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export const fetchPageNumber = async (): Promise<number> => {
  const token = getToken();
  if (!token) {
    throw new Error('Token not found');
  }
  const response = await axios.get<number>('http://localhost:8090/api/cart/get/cart/count', {
    headers: {
      'Authorization': `${token}`,
    },
  });
    
  return response.data;
}

export const fetchIsUserAdmin = async (): Promise<boolean> => {
  const token = getToken();
  if(!token) {
    throw new Error('Token not found');
  }

  const response = await axios.get<boolean>('http://localhost:8090/api/user/get/user/isAdmin', {
    headers: {
      'Authorization' : `${token}`,
    },
  });

  return response.data;
}


export const fetchAllUsers = async(): Promise<User[]> => {
  const token = getToken();
  if(!token) {
    throw new Error('Token not found');
  }

  const response = await axios.get<User[]>('http://localhost:8090/api/user/get/users/all', {
    headers: {
      'Authorization' : `${token}`,
    },
  });

  if(response.data === null) {
    throw new Error('Data could not be fetech');
  }

  return response.data;
}

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
      const token = getToken();
      if(!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get<Product[]>("http://localhost:8090/product/all", {
        headers: {
          'Authorization': `${token}`,
        },
      });

      response.data.forEach(product => {
        product.photo = `data:image/jpeg;base64,${product.photo}`;
        
      });

      return response.data;
  } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
  }
};


export const fetchUserByEmail = async (email: string): Promise<User> => {
  try {
    const token = getToken();
    if(!token) {
      throw new Error('Token not found');
    }
    const response = await axios.get<User>(`http://localhost:8090/api/user/get/user/${email}`, {
      headers: {
        'Authorization': `${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  

};