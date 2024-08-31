import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
  date: string
  revenue: number
}[]

export async function getDailyRevenueInPeriod({ from, to }: GetDailyRevenueInPeriodQuery) {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  const response = await api.get<GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period', {
    params: {
      from,
      to
    },
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}
