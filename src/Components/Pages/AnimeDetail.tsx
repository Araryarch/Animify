import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { fetchAnimeById, Anime } from '../../service/apiService'

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  if (loading)
    return (
      <div className="relative w-full min-h-screen bg-fuchsia-950 bg-dot-black">
        {/* Skeleton Loader */}
      </div>
    )

  if (error) return <p>{error}</p>
  if (!anime) return <p>No anime details found</p>

  const handleTrailerClick = () => {
    if (anime?.trailer.embed_url) {
      setIsModalOpen(true)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No trailer available for this anime!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Okay',
      })
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-fuchsia-950 bg-dot-black">
      {/* Banner */}
      <div
        className="relative w-full bg-top bg-cover h-52 banner"
        style={{ backgroundImage: `url(${anime.images.jpg.image_url})` }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-fuchsia-950 to-transparent"></div>
      </div>

      <div className="mt-10 ml-10 text-blue-300 history">
        You're on Homepage/Anime/{anime.title}
      </div>

      <Link
        to={'/'}
        className="px-2 py-1 m-10 text-white bg-red-600 rounded-md"
      >
        BACK TO HOMEPAGE
      </Link>

      <div className="flex flex-wrap items-center justify-center containers">
        <div
          className="bg-cover image-anime aspect-[11/16] w-52 m-10 rounded-md"
          style={{
            backgroundImage: `url(${anime.images.jpg.image_url})`,
          }}
        ></div>
        <div className="w-1/2 font-bold text-white">
          <div className="title">
            <h1 className="text-4xl">{anime.title}</h1>
          </div>
          {anime.genres.map((genre) => (
            <span
              key={genre.mal_id}
              className="px-2 py-1 my-5 mr-1 text-xs text-white bg-gray-800 rounded-full"
            >
              {genre.name}
            </span>
          ))}
          <p className="my-2 text-sm">{anime.synopsis}</p>
          <div>
            <span className="px-2 py-1 my-5 mr-1 text-xs text-white bg-gray-800 rounded-full">
              {anime.duration}
            </span>
            <span className="px-2 py-1 my-5 mr-1 text-xs text-white bg-gray-800 rounded-full">
              Popularity : {anime.popularity}
            </span>
            <span className="px-2 py-1 my-5 mr-1 text-xs text-white bg-gray-800 rounded-full">
              Rank : {anime.rank}
            </span>
            <span className="px-2 py-1 my-5 mr-1 text-xs text-white bg-gray-800 rounded-full">
              Rank : {anime.rating}
            </span>
            <span className="px-2 py-1 my-5 mr-1 text-xs text-white bg-gray-800 rounded-full">
              Rank : {anime.score}
            </span>
          </div>
          <button
            className="px-4 py-2 my-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleTrailerClick}
          >
            Watch Trailer
          </button>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md"></div>
          <button
            className="fixed z-[99999] px-4 py-2 text-white transition-colors duration-200 rounded-full top-4 right-4 hover:bg-gray-600"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-6xl p-0 bg-white rounded-lg shadow-lg">
              <div className="aspect-video">
                <iframe
                  src={anime.trailer.embed_url}
                  title="Trailer"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AnimeDetail
