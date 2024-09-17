import React, { useEffect, useState } from 'react'
import { fetchAnimeList, Anime } from '../../service/apiService'

interface Propstype {
  classname: string
}

const AnimeList: React.FC<Propstype> = ({ classname }) => {
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

  if (loading)
    return (
      <div
        className={`flex flex-col gap-2 text-white ${classname} px-24 transition-all duration-300 ease-in-out`}
      >
        <h1 className="text-3xl font-bold">TOP ANIME</h1>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4">
          {Array.from({ length: 10 }, (_, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-center p-2 bg-gray-700 rounded shadow-sm animate-pulse"
            >
              <div className="w-32 h-40 bg-gray-600 rounded"></div>
              <div className="w-24 h-6 mt-2 bg-gray-600 rounded"></div>
            </li>
          ))}
        </ul>
      </div>
    )

  if (error) return <p>{error}</p>

  return (
    <div
      className={`flex flex-col gap-2 text-white ${classname} px-24 transition-all duration-300 ease-in-out`}
    >
      <h1 className="text-3xl font-bold">TOP ANIME</h1>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4">
        {animeList.map((anime) => (
          <li
            key={anime.mal_id}
            className="flex flex-col items-center justify-center p-2 shadow-sm shadow-fuchsia-950"
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
            <div className="flex items-center justify-center p-2">
              <h1>{anime.title}</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnimeList
