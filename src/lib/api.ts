import axios from "axios"

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  timeout: 60 * 1000, // 1 minute
})
