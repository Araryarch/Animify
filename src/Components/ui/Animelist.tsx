import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { fetchAnimeList, Anime } from '../../service/apiService'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Propstype {
  classname: string
}

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute z-50 text-4xl text-white transform -translate-y-1/2 cursor-pointer -right-8 top-1/2"
    onClick={onClick}
  >
    <FaChevronRight />
  </div>
)

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute z-50 text-4xl text-white transform -translate-y-1/2 cursor-pointer -left-8 top-1/2"
    onClick={onClick}
  >
    <FaChevronLeft />
  </div>
)

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (loading)
    return (
      <div
        className={`flex flex-col gap-2 text-white ${classname} md:px-20 px-10 transition-all duration-300 ease-in-out`}
      >
        <h1 className="text-3xl font-bold">TOP ANIME</h1>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5 md:grid-cols-3">
          {Array.from({ length: 5 }, (_, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-center p-2 bg-gray-700 rounded shadow-sm animate-pulse aspect-[9/16]"
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
      className={`flex flex-col gap-2 text-white ${classname} md:px-20 px-10 transition-all duration-300 ease-in-out py-2`}
    >
      <h1 className="text-3xl font-bold text-right uppercase md:text-left">
        TOP ANIME
      </h1>
      <Slider {...settings}>
        {animeList.map((anime) => {
          const truncatedSynopsis =
            anime.synopsis.length > 100
              ? anime.synopsis.substring(0, 100) + '...'
              : anime.synopsis

          return (
            <Link
              to={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="py-12 card group"
            >
              <div
                className="image-card aspect-[9/16] bg-cover mx-4 rounded-md relative overflow-hidden group-hover:scale-110 transition-all ease-in-out duration-300"
                style={{
                  backgroundImage: `url(${anime.images.jpg.image_url})`,
                }}
              >
                <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-start justify-end p-2 group-hover:border-2 border-fuchsia-400 group-hover:py-5 bg-gradient-to-t from-fuchsia-950 to-transparent">
                  <h1 className="p-2 text-xl font-bold text-left text-white">
                    {anime.title}
                  </h1>
                  <div className="flex flex-wrap px-2 mt-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="px-2 py-1 mb-1 mr-1 text-xs text-white bg-gray-800 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <div className="absolute px-2 mt-2 text-xs transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:relative">
                    <p>{truncatedSynopsis}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </Slider>
    </div>
  )
}

export default AnimeList
