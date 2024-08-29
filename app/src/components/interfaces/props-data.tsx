export interface CartInfoProps {
    amount: number;
    title: string;
    photo: string;
    price: number;
    sessionId: string;
    sessionCartId: string;
};

export interface InfoCardProps {
    title: string;
    name?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    
};

export interface DeliveryCardProps {
    title: string;
    address?: string;
    city?: string;
    country?: string;
}