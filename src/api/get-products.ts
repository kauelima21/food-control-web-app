import { api } from "@/lib/axios";

export interface GetProductsQuery {
  pageIndex?: number | null
  orderId?: string | null
  productName?: string | null
  status?: string | null
}

export interface GetProductsResponse {
  products: {
    product_id: string;
    created_at: string;
    status: "active" | "inactive";
    name: string;
    price_in_cents: number;
  }[];
}

export async function getProducts() {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  const response = await api.get<GetProductsResponse>('/admin/products', {
    // params: {
    //   page_index: pageIndex,
    //   order_id: orderId,
    //   name: productName,
    //   status: status
    // },
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  return response.data
}
