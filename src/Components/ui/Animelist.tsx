import React, { useEffect } from 'react'
import ParallaxTilt from 'react-parallax-tilt'
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
  const [AnimeList, setAnimeList] = React.useState<Anime[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [slidesToShow, setSlidesToShow] = React.useState(5) // Default slides to show

  const handleResize = () => {
    const width = window.innerWidth

    if (width >= 1600) {
      setSlidesToShow(5)
    } else if (width >= 1300) {
      setSlidesToShow(5)
    } else if (width >= 1024) {
      setSlidesToShow(3)
    } else if (width >= 768) {
      setSlidesToShow(2)
    } else {
      setSlidesToShow(1)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  React.useEffect(() => {
    const getAnimeList = async () => {
      try {
        const data = await fetchAnimeList()
        setAnimeList(data)
      } catch (err) {
        setError('Failed to fetch Anime list')
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
    slidesToShow,
    slidesToScroll: slidesToShow,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (loading)
    return (
      <div
        className={`flex flex-col gap-2 text-white ${classname} xl:px-24 md:px-20 px-10 transition-all duration-300 ease-in-out`}
      >
        <h1 className="text-3xl font-bold">TOP Anime</h1>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5 md:grid-cols-3">
          {Array.from({ length: slidesToShow }, (_, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-center p-2 bg-gray-700 rounded shadow-sm animate-pulse"
            >
              <div className="w-full bg-gray-600 rounded h-72"></div>{' '}
              {/* Image skeleton */}
              <div className="w-full h-6 mt-2 bg-gray-600 rounded"></div>{' '}
              {/* Title skeleton */}
            </li>
          ))}
        </ul>
      </div>
    )

  if (error) return <p>{error}</p>

  return (
    <div
      className={`flex flex-col gap-2 text-white ${classname} xl:px-24 md:px-20 px-10 transition-all duration-300 ease-in-out py-2`}
    >
      <h1 className="text-3xl font-bold text-right uppercase md:text-left">
        TOP Anime
      </h1>
      <Slider {...settings}>
        {AnimeList.map((Anime) => {
          const truncatedSynopsis =
            Anime.synopsis.length > 100
              ? Anime.synopsis.substring(0, 100) + '...'
              : Anime.synopsis

          return (
            <Link
              to={`/Anime/${Anime.mal_id}`}
              key={Anime.mal_id}
              className="py-12 group"
            >
              <ParallaxTilt
                className="image-card aspect-[9/16] mx-4 rounded-md relative overflow-hidden shadow-lg transition-transform duration-300 ease-in-out"
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
                scale={1.1}
                transitionSpeed={300}
                glareEnable
              >
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${Anime.images.jpg.image_url})`,
                  }}
                >
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-start justify-end p-2 group-hover:border-l-2 group-hover:border-r-2 border-fuchsia-400 group-hover:py-5 bg-gradient-to-t from-fuchsia-950 to-transparent">
                    <h1 className="p-2 text-xl font-bold text-left text-white">
                      {Anime.title}
                    </h1>
                    <div className="flex flex-wrap px-2 mt-2">
                      {Anime.genres.map((genre) => (
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
              </ParallaxTilt>
            </Link>
          )
        })}
      </Slider>
    </div>
  )
}

export default AnimeList
