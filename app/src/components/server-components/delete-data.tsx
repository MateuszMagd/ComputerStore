import axios from "axios";
import { getToken } from "./logger-handler";
import { Session } from "inspector";

export const deleteItemCart = async (sessionId: string) => {
    try {
        const token = getToken();
        if (!token) {
          throw new Error('Token not found');
        }
        console.log(token)
        const response = await axios.post<String>('http://localhost:8090/api/cart/post/cart/delete/item', null, {
          headers: {
            'Authorization': `${token}`,
          },
          params: {
            "SessionId": sessionId,
          }
        });
      } catch (error) {
        console.error('Error deleting data:', error);
      }
}

export const deleteProductBySessionId = async (sessionId: string) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.post<String>('http://localhost:8090/product/delete', sessionId, {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'text/plain',
      },
    });

  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

export const deleteUserByEmail = async (email: string) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.post('http://localhost:8090/api/user/delete', email, {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'text/plain',
      },
    });

  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}