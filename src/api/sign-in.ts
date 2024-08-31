import { api } from "@/lib/axios";

export interface SignInBody {
  email: string,
  password: string,
}

export interface SignInResponse {
  IdToken: string,
}

export async function signIn({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>('/sign-in', { email, password })
  return response.data;
}
