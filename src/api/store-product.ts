import { api } from "@/lib/axios";

export interface StoreProductBody {
  name: string
  price_in_cents: number
  description: string
  category: string
  cover: string
}

export async function storeProduct({
  name,
  price_in_cents,
  description,
  category,
  cover
}: StoreProductBody) {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  await api.post('/admin/products', {
    name,
    price_in_cents,
    description,
    cover,
    category,
  },{
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
}
