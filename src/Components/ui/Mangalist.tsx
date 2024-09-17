import React, { useEffect, useState } from 'react'
import { fetchMangaList, Manga } from '../../service/apiService'

interface Propstype {
  classname: string
}

const MangaList: React.FC<Propstype> = ({ classname }) => {
  const [mangaList, setMangaList] = useState<Manga[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getMangaList = async () => {
      try {
        const data = await fetchMangaList()
        setMangaList(data)
      } catch (err) {
        setError('Failed to fetch Manga list')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    getMangaList()
  }, [])

  if (loading)
    return (
      <div
        className={`flex flex-col gap-2 text-white ${classname} px-24 transition-all duration-300 ease-in-out`}
      >
        <h1 className="text-3xl font-bold">TOP MANGA</h1>
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
      <h1 className="text-3xl font-bold">TOP MANGA</h1>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4">
        {mangaList.map((manga) => (
          <li
            key={manga.mal_id}
            className="flex flex-col items-center justify-center p-2 shadow-sm shadow-fuchsia-950"
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={manga.images.jpg.image_url}
                alt={manga.title}
                className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
            <div className="flex items-center justify-center p-2">
              <h1>{manga.title}</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MangaList
