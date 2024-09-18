import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

  if (loading)
    return (
      <div className="relative w-full min-h-screen bg-black">
        <div className="relative w-full bg-top bg-cover h-52 banner">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-700 animate-pulse"></div>
        </div>

        <div className="mt-10 ml-10 text-blue-300">
          <div className="w-48 h-4 bg-gray-700 animate-pulse"></div>
        </div>

        <div className="w-48 h-8 px-2 py-1 m-10 bg-gray-700 rounded-md animate-pulse"></div>

        <div className="flex flex-wrap items-center justify-center containers">
          <div className="aspect-[9/16] w-52 m-10 rounded-md bg-gray-700 animate-pulse"></div>

          <div className="w-1/2 font-bold text-white">
            <div className="w-3/4 h-8 mb-4 bg-gray-700 animate-pulse"></div>

            <div className="flex gap-2">
              <div className="w-12 h-4 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-12 h-4 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-12 h-4 bg-gray-700 rounded-full animate-pulse"></div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="w-full h-4 bg-gray-700 animate-pulse"></div>
              <div className="w-full h-4 bg-gray-700 animate-pulse"></div>
              <div className="w-2/3 h-4 bg-gray-700 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )

  if (error) return <p>{error}</p>
  if (!Manga) return <p>No Manga details found</p>

  return (
    <div className="relative w-full min-h-screen bg-slate-800 bg-dot-black">
      <div
        className="relative w-full bg-top bg-cover h-52 banner"
        style={{ backgroundImage: `url(${Manga.images.jpg.image_url})` }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-slate-800 to-transparent"></div>
      </div>
      <div className="mt-10 ml-10 text-blue-300 history">
        You're on Homepage/Manga/{Manga.title}
      </div>
      <Link
        to={'/'}
        className="px-2 py-1 m-10 text-white bg-red-600 rounded-md"
      >
        BACK TO HOMEPAGE
      </Link>
      <div className="flex flex-wrap items-center justify-center containers">
        <div
          className="bg-cover image-Manga aspect-[11/16] w-52 m-10 rounded-md"
          style={{
            backgroundImage: `url(${Manga.images.jpg.image_url})`,
          }}
        ></div>
        <div className="w-1/2 font-bold text-white">
          <div className="title">
            <h1 className="text-4xl">{Manga.title}</h1>
          </div>
          {Manga.genres.map((genre) => (
            <span
              key={genre.mal_id}
              className="px-2 py-1 my-5 mr-1 text-xs text-white rounded-full bg-fuchsia-950"
            >
              {genre.name}
            </span>
          ))}
          <p className="my-2 text-sm">{Manga.synopsis}</p>
        </div>
      </div>
    </div>
  )
}

export default MangaDetail
