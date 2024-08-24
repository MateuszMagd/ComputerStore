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
    name: string;
    photo: string;
    price: number;
    quantity: number;
}

export interface CartInfoProps {
    amount: number;
    title: string;
    photo: string;
    price: number;
    sessionId: string;
};