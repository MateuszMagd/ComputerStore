import axios from "axios"
import { getToken } from "./logger-handler";
import { SaveUserProps, Product, NewProduct } from "../interfaces/data";

export const saveNewUser = async (userProps: SaveUserProps) => {
    const token = getToken();
    if(!token) {
        throw new Error('Token not found');
    }

    try {
        const response = await axios.post('http://localhost:8090/api/user/save', userProps, {
            headers: {
                'Authorization': `${token}`,
            },
        });

        if (response.data === null) {
            throw new Error("Something went wrong while creating new user");
        }
    } catch (error) {
        console.error("Error in saveNewUser function:", error);
        throw error;
    }
}



export const saveNewProduct = async (product: NewProduct) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Token not found');
        }

        await axios.post("http://localhost:8090/product/save", product, {
            headers: {
                'Authorization': `${token}`,
            },
        });
    } catch (error) {
        console.error("Error saving new product:", error);
        throw error;
    }
};

