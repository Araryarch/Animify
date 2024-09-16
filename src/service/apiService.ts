import axios from 'axios'

const BASE_URL = 'https://api.jikan.moe/v4'

const api = axios.create({
  baseURL: BASE_URL,
})

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

export const fetchAnimeList = async (): Promise<Anime[]> => {
  try {
    const response = await api.get('/top/anime')
    const anime = response.data
    return anime.data
  } catch (error) {
    console.error('Error fetching anime list', error)
    throw error
  }
}
