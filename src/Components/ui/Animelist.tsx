import React, { useEffect, useState } from 'react'
import { fetchAnimeList, Anime } from '../../service/apiService'

const AnimeList: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getAnimeList = async () => {
      try {
        const data = await fetchAnimeList()
        setAnimeList(data)
      } catch (err) {
        setError('Failed to fetch anime list')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    getAnimeList()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="flex flex-col gap-2 text-white ml-36">
      <h1 className="text-3xl font-bold">TOP ANIME</h1>
      <ul className="grid grid-cols-2 gap-5 xl:grid-cols-5 md:grid-cols-3">
        {animeList.map((anime) => (
          <li
            key={anime.mal_id}
            className="flex flex-col items-center justify-center shadow-sm shadow-fuchsia-950"
          >
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <h1>{anime.title}</h1>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnimeList
