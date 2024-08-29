export interface Product {
    amount: number;
    name: string;
    photo: string;
    price: number;
    sessionId: string;
    type: string;
    specs: string;
};

export interface Cart {
    sessionId: string;
    sessionCartId: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
}

export interface User {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    country: string;
}

export interface SaveUserProps extends User {
    password: string;
}


export interface NewProduct {
    name: string;
    specs: string;
    price: number;
    amount: number;
    type: ProductType;
    photo: string | null;
}

export enum ProductType {
    GPU = "GPU",
    CPU = "CPU",
    Motherboard = "Motherboard",
}