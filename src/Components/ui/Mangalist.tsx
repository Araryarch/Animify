// import React, { useEffect, useState } from 'react'
// import { fetchMangaList, Manga } from '../../service/apiService'
// import { Link } from 'react-router-dom'

// interface Propstype {
//   classname: string
// }

// const MangaList: React.FC<Propstype> = ({ classname }) => {
//   const [mangaList, setMangaList] = useState<Manga[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const getMangaList = async () => {
//       try {
//         const data = await fetchMangaList()
//         setMangaList(data)
//       } catch (err) {
//         setError('Failed to fetch Manga list')
//         console.log(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     getMangaList()
//   }, [])

//   if (loading)
//     return (
//       <div
//         className={`flex flex-col gap-2 text-white ${classname} px-24 transition-all duration-300 ease-in-out`}
//       >
//         <h1 className="text-3xl font-bold">TOP MANGA</h1>
//         <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5 md:grid-cols-3">
//           {Array.from({ length: 10 }, (_, index) => (
//             <li
//               key={index}
//               className="flex flex-col items-center justify-center p-2 bg-gray-700 rounded shadow-sm animate-pulse"
//             >
//               <div className="w-32 h-40 bg-gray-600 rounded"></div>
//               <div className="w-24 h-6 mt-2 bg-gray-600 rounded"></div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )

//   if (error) return <p>{error}</p>

//   return (
//     <div
//       className={`flex flex-col gap-2 text-white ${classname} px-24 transition-all duration-300 ease-in-out py-2`}
//     >
//       <h1 className="text-3xl font-bold">TOP MANGA</h1>
//       <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5 md:grid-cols-3">
//         {mangaList.map((manga) => (
//           <li
//             key={manga.mal_id}
//             className="flex flex-col items-center justify-center p-2 shadow-sm shadow-white bg-gradient-to-t from-black from-5% to-fuchsia-950"
//           >
//             <Link
//               to={`/manga/${manga.mal_id}`}
//               className="relative w-full h-full overflow-hidden"
//             >
//               <img
//                 src={manga.images.jpg.image_url}
//                 alt={manga.title}
//                 className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
//               />
//             </Link>
//             <div className="flex items-center justify-center p-2">
//               <h1 className="font-bold text-center">{manga.title}</h1>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default MangaList

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
        {MangaList.map((manga) => (
          <Link
            to={`/manga/${manga.mal_id}`}
            key={manga.mal_id}
            className="card"
          >
            <div
              className="image-card aspect-[9/16] bg-cover mx-4 rounded-sm relative"
              style={{ backgroundImage: `url(${manga.images.jpg.image_url})` }}
            >
              <div className="absolute top-0 bottom-0 left-0 right-0"></div>
            </div>
            <div className="py-2 font-bold text-center hover:text-fuchsia-400">
              {manga.title}
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default MangaList
