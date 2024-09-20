import React, { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'
import { fetchAnimeList, Anime } from '../../service/apiService'
export const About: React.FC = () => {
  // State for anime data
  const [animeList, setAnimeList] = useState<Anime[]>([])

  useEffect(() => {
    // Fetch the top anime list on component mount
    const fetchData = async () => {
      try {
        const data = await fetchAnimeList()
        setAnimeList(data) // Update state with fetched anime data
      } catch (error) {
        console.error('Error fetching anime list:', error)
      }
    }
    fetchData()
  }, [])

  // Slicing anime list for rows
  const firstRow = animeList.slice(0, 5)
  const secondRow = animeList.slice(5, 10)
  const thirdRow = animeList.slice(10, 15)

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  )

  return (
    <section
      id="about"
      ref={ref}
      className="h-[350vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto[perspective:1000px] [transform-style:preserve-3d] bg-gradient-to-b from-fuchsia-950 to-black"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse mb-20 space-x-20 space-x-reverse">
          {firstRow.map((anime) => (
            <ProductCard
              product={{
                title: anime.title,
                link: anime.trailer?.embed_url || '#',
                thumbnail: anime.images.jpg.image_url,
              }}
              translate={translateX}
              key={anime.mal_id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((anime) => (
            <ProductCard
              product={{
                title: anime.title,
                link: anime.trailer?.embed_url || '#',
                thumbnail: anime.images.jpg.image_url,
              }}
              translate={translateXReverse}
              key={anime.mal_id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((anime) => (
            <ProductCard
              product={{
                title: anime.title,
                link: anime.trailer?.embed_url || '#',
                thumbnail: anime.images.jpg.image_url,
              }}
              translate={translateX}
              key={anime.mal_id}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export const Header: React.FC = () => {
  return (
    <div className="relative top-0 left-0 flex flex-col items-center justify-center w-full px-4 py-20 mx-auto max-w-7xl md:py-40">
      <h1 className="font-bold text-center text-white text-7xl md:text-8xl glitch logo">
        ANIMIFY
      </h1>
      <h2 className="text-xl font-bold text-center text-white md:text-3xl">
        Your Ultimate Anime & Manga Hub
      </h2>
      <p className="max-w-2xl mt-4 text-base text-center md:text-xl text-neutral-200">
        Discover anime trailers and explore manga synopses, exclusively on
        Animify.
      </p>
    </div>
  )
}

interface ProductCardProps {
  product: {
    title: string
    link: string
    thumbnail: string
  }
  translate: MotionValue<number>
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  translate,
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-96 w-[30rem] relative flex-shrink-0 rounded-md"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 object-cover object-left-top w-full h-full rounded-md"
        />
      </a>
      <div className="absolute inset-0 w-full h-full bg-black opacity-0 pointer-events-none group-hover/product:opacity-80"></div>
      <h2 className="absolute text-white opacity-0 bottom-4 left-4 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  )
}
