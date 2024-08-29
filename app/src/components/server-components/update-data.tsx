import axios from "axios";
import { getToken } from "./logger-handler";
import { Product } from "../interfaces/data";

export const updatePersonalData = async (firstName: string | undefined, lastName: string | undefined, email: string | undefined, phoneNumber: string | undefined) => {
    try {
        const token = getToken();
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.post<String>('http://localhost:8090/api/user/post/user/update/personal', null,{
            headers: {
              'Authorization': `${token}`,
            },
            params: {
              'FirstName': firstName,
              'LastName': lastName,
              'Email': email,
              'PhoneNumber': phoneNumber,
            }
        });
        
    } catch(error) {
        console.error('Error fetching data:', error);
    }
}

export const updateAddressData = async (address: string | undefined, country: string | undefined, city: string | undefined) => {
    try {
        const token = getToken();
        if (!token) {
        throw new Error('Token not found');
        }
        const response = await axios.post<String>('http://localhost:8090/api/user/post/user/update/address', null, {
            headers: {
              'Authorization': `${token}`,
            },
            params: {
              'Address': address,
              'Country': country,
              'City': city,
            }
        });
        
    } catch(error) {
        console.error('Error fetching data:', error);
    }
}

export const updateProduct = async (product: Product) => {
  try {
    const token = getToken();
    if (!token) {
    throw new Error('Token not found');
    }
    const response = await axios.post<String>('http://localhost:8090/api/user/post/user/update/address', product, {
        headers: {
          'Authorization': `${token}`,
        },
    });
    
  } catch(error) {
      console.error('Error fetching data:', error);
  }
}