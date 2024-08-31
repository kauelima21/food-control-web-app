import { api } from "@/lib/axios";

export type GetPopularProductsResponse = {
  popular_products: {
    product: string
    amount: number
  }[]
}

export async function getPopularProducts() {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  const response = await api.get<GetPopularProductsResponse>('/metrics/popular-products', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}
