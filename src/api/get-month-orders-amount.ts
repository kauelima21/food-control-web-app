import { api } from "@/lib/axios";

export interface GetMonthOrdersAmountResponse {
  amount: number
  diff_from_last_month: number
}

export async function getMonthOrdersAmount() {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  const response = await api.get<GetMonthOrdersAmountResponse>('/metrics/month-orders-amount', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}
