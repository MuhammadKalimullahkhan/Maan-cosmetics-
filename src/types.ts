export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  ingredients?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  addresses?: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: any;
  createdAt: string;
  updatedAt: string;
}
