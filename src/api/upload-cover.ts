import axios from 'axios'

export interface UploadCoverParams {
  post_url: string,
  file: File
}

export async function uploadCover({ post_url, file }: UploadCoverParams) {
  return await axios.put(post_url, file, {
    headers: {
      "Content-Type": file.type
    }
  })
}
