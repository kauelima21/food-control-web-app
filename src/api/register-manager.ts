import { api } from "@/lib/axios";

export interface RegisterManagerBody {
  email: string
  password: string
  role: string
}

export async function registerManager({
  email,
  password,
  role
}: RegisterManagerBody) {
  await api.post('/sign-up', {
    email,
    password,
    role,
  })
}
