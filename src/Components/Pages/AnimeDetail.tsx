import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAnimeById, Anime } from '../../service/apiService'

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getAnimeDetails = async () => {
      try {
        const data = await fetchAnimeById(Number(id))
        setAnime(data)
      } catch (err) {
        setError('Failed to fetch anime details')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    getAnimeDetails()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!anime) return <p>No anime details found</p>

  return (
    <div className="px-24 text-white">
      <h1 className="text-3xl font-bold">{anime.title}</h1>
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-64 h-auto my-4"
      />
      <p>{anime.synopsis}</p>
    </div>
  )
}

export default AnimeDetail
