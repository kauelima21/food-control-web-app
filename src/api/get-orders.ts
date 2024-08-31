import { api } from "@/lib/axios";

export interface GetOrdersResponse {
  orders: {
    order_id: string;
    created_at: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    price_in_cents: number;
    customer_name: string,
    phone: string | null
    order_items: {
      price_in_cents: number,
      quantity: number,
      name: string
    }[]
  }[];
}

export async function getOrders() {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  const response = await api.get<GetOrdersResponse>('/admin/orders', {
    // params: {
    //   page_index: pageIndex,
    //   order_id: orderId,
    //   customer: customerName,
    //   status: status
    // },
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response.data
}
