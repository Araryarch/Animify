import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { fetchMangaList, Manga } from '../../service/apiService'
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  if (loading)
    return (
      <div
        className={`flex flex-col gap-2 text-white ${classname} px-24 transition-all duration-300 ease-in-out`}
      >
        <h1 className="text-3xl font-bold">TOP Manga</h1>
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
      className={`flex flex-col gap-2 text-white ${classname} px-24 transition-all duration-300 ease-in-out py-2`}
    >
      <h1 className="text-3xl font-bold">TOP Manga</h1>
      <Slider {...settings}>
        {MangaList.map((Manga) => (
          <Link
            to={`/Manga/${Manga.mal_id}`}
            key={Manga.mal_id}
            className="card"
          >
            <div
              className="image-card aspect-[9/16] bg-cover mx-4 rounded-sm relative overflow-hidden"
              style={{ backgroundImage: `url(${Manga.images.jpg.image_url})` }}
            >
              <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-end py-2 bg-gradient-to-t from-fuchsia-950 to-transparent">
                <h1 className="p-2 text-xl text-left text-white">
                  {Manga.title}
                </h1>
                <div className="flex flex-wrap px-2 mt-2">
                  {Manga.genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="px-2 py-1 mb-1 mr-1 text-xs text-white bg-gray-800 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default MangaList
