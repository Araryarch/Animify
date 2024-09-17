import axios, { AxiosResponse } from 'axios'

const BASE_URL = 'https://api.jikan.moe/v4'

const api = axios.create({
  baseURL: BASE_URL,
})

const requestCache = new Map<string, unknown>()
const requestQueue: {
  endpoint: string
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}[] = []

let isRequestInProgress = false
const RATE_LIMIT_DELAY = 1000

const processQueue = () => {
  if (isRequestInProgress || requestQueue.length === 0) return

  isRequestInProgress = true

  const { endpoint, resolve, reject } = requestQueue.shift()!

  setTimeout(() => {
    api
      .get(endpoint)
      .then((response: AxiosResponse<unknown>) => {
        requestCache.set(endpoint, response.data)
        resolve(response.data)
      })
      .catch(reject)
      .finally(() => {
        isRequestInProgress = false
        processQueue()
      })
  }, RATE_LIMIT_DELAY)
}

const fetchWithRateLimit = (endpoint: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (requestCache.has(endpoint)) {
      resolve(requestCache.get(endpoint))
    } else {
      requestQueue.push({ endpoint, resolve, reject })
      processQueue()
    }
  })
}

export interface Anime {
  mal_id: number
  title: string
  synopsis: string
  images: {
    jpg: {
      image_url: string
    }
  }
}

export interface Manga {
  mal_id: number
  title: string
  synopsis: string
  images: {
    jpg: {
      image_url: string
    }
  }
}

export interface ApiResponse<T> {
  data: T
}

export const fetchAnimeList = async (): Promise<Anime[]> => {
  try {
    const response = (await fetchWithRateLimit('/top/anime')) as ApiResponse<
      Anime[]
    >
    return response.data
  } catch (error) {
    console.error('Error fetching anime list', error)
    throw error
  }
}

export const fetchMangaList = async (): Promise<Manga[]> => {
  try {
    const response = (await fetchWithRateLimit('/top/manga')) as ApiResponse<
      Manga[]
    >
    return response.data
  } catch (error) {
    console.error('Error fetching manga list', error)
    throw error
  }
}
