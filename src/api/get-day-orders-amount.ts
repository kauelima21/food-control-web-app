import { api } from "@/lib/axios";

export interface GetDayOrdersAmountResponse {
  amount: number
  diff_from_yesterday: number
}

export async function getDayOrdersAmount() {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  const response = await api.get<GetDayOrdersAmountResponse>('/metrics/day-orders-amount', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}
