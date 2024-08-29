import axios from "axios";
import { getToken } from "./logger-handler";

export const createOrder = async () => {
    try {
        const token = getToken();
        if (!token) {
          throw new Error('Token not found');
        }
        
        const response = await axios.post('http://localhost:8090/api/order/create',null, {
            headers: {
                'Authorization': `${token}`,
            },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };


export const updateOrderToReady= async () => {
    try {
        const token = getToken();
        if (!token) {
          throw new Error('Token not found');
        }
      const response = await axios.post('http://localhost:8090/api/order/update/paid', null, {
        headers: {
            'Authorization': `${token}`,
        }
    });

        return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

export const updateOrderToDelivered = async () => {
    try {
        const token = getToken();
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.post('http://localhost:8090/api/order/update/delivered', null, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
  };