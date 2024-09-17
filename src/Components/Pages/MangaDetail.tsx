import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMangaById, Manga } from '../../service/apiService'

const MangaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [Manga, setManga] = useState<Manga | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getMangaDetails = async () => {
      try {
        const data = await fetchMangaById(Number(id))
        setManga(data)
      } catch (err) {
        setError('Failed to fetch Manga details')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    getMangaDetails()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!Manga) return <p>No Manga details found</p>

  return (
    <div className="px-24 text-white">
      <h1 className="text-3xl font-bold">{Manga.title}</h1>
      <img
        src={Manga.images.jpg.image_url}
        alt={Manga.title}
        className="w-64 h-auto my-4"
      />
      <p>{Manga.synopsis}</p>
    </div>
  )
}

export default MangaDetail
