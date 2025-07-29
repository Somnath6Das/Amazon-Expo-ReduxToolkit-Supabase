export interface Order {
  id: number;
  product_name: string;
  image: string;
  buyer_id: number;
  current_price: number;
  delivery_date: string;
  is_delivered: boolean;
  delivery_address: string;
  delivery_price: number;
  seller_id: number;
}
