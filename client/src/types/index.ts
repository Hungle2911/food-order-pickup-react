export interface OrderDetailsType {
  order_code : number;
  client_name: string;
  date_time: number;
  total_cost: number;
  instructions: string;
  phone_number: number;
}
export interface CartItem {
  item_id: number;
  quantity: number;
  cost: number;
}
export interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  deleteCartItems: (id: number, menu_item_id: number) => Promise<void>;
  getCartItems: () => Promise<void>;
  increaseCartItem: (id: number, menu_item_id: number) => Promise<void>;
  decreaseCartItem: (id: number, menu_item_id: number) => Promise<void>;
}
