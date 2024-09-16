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
      <ul className="grid grid-cols-5 grid-rows-3 gap-5">
        {animeList.map((anime) => (
          <li key={anime.mal_id} className="shadow-sm shadow-fuchsia-950">
            <h2>{anime.title}</h2>
            {/* <p>{anime.synopsis}</p> */}
            <img src={anime.images.jpg.image_url} alt={anime.title} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnimeList
