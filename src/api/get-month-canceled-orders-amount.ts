import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number
  diff_from_last_month: number
}

export async function getMonthCanceledOrdersAmount() {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  const response = await api.get<GetMonthCanceledOrdersAmountResponse>('/metrics/month-canceled-orders-amount', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}
