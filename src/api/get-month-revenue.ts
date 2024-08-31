import { api } from "@/lib/axios";

export interface GetMonthRevenueResponse {
  revenue: number
  diff_from_last_month: number
}

export async function getMonthRevenue() {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  const response = await api.get<GetMonthRevenueResponse>('/metrics/month-revenue', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}
