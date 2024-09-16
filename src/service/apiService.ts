import axios from 'axios'

const API_BASE_URL = 'https://dummyjson.com'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const fetchComments = async () => {
  try {
    const response = await apiClient.get(`/comments`)
    return response.data
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}
