export interface OrderItem {
    productId: Number;
    qty: number;
    price: number;
    amount: number;
}

export interface Order {
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: number;
    userEmail: string;
    orderDetails: OrderItem[];
}

export interface PastOrder {
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: number;
    orderDate: string;
    orderId: number;
}

export interface PastOrderProduct {
    productId: Number;
    productImage: string;
    qty: number;
    price: number;
    amount: number;
    productName: string;
}