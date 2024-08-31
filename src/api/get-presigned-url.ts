import { api } from "@/lib/axios";

export interface GetPresignedUrlBody {
  file_name: string
  type: string
}

export async function getPresignedUrl({ file_name, type }: GetPresignedUrlBody) {
  const token = JSON.parse(localStorage.getItem("auth-food-control") ?? "")
  const response = await api.post<{post_url: string}>('/admin/products/upload', {
    file_name,
    type
  },{
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data.post_url;
}
