import React, { useEffect, useState } from 'react'
import { fetchMangaList, Manga } from '../../service/apiService'

interface Propstype {
  classname: string
}

const MangaList: React.FC<Propstype> = ({ classname }) => {
  const [MangaList, setMangaList] = useState<Manga[]>([])
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

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div
      className={`flex flex-col gap-2 text-white ${classname} px-24 transition-all duration-300 ease-in-out`}
    >
      <h1 className="text-3xl font-bold">TOP MANGA</h1>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4">
        {MangaList.map((Manga) => (
          <li
            key={Manga.mal_id}
            className="flex flex-col items-center justify-center p-2 shadow-sm shadow-fuchsia-950"
          >
            <img src={Manga.images.jpg.image_url} alt={Manga.title} />
            <h1>{Manga.title}</h1>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MangaList
