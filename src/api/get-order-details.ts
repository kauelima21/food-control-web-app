import { api } from "@/lib/axios";

export interface GetOrderDetailsParams {
  orderId: string
}

export interface GetOrderDetailsResponse {
  order_id: string;
  created_at: string;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  totalInCents: number;
  customer_name: string,
  phone: string | null
  order_items: {
    price_in_cents: number,
    quantity: number,
    name: string
  }[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
