import { useState, useEffect } from 'react'
import Background from '../../assets/goku.gif'
import Scroller from '../../assets/scroller.png'
import { RxHamburgerMenu } from 'react-icons/rx'
import { motion } from 'framer-motion'
import Topbar from '../ui/Topbar'
import AnimeList from '../ui/Animelist'
import MangaList from '../ui/Mangalist'
import { About } from '../ui/About'
import Quotes from '../ui/Quotes'
import { Textload } from '../ui/Textload'

const Homepage = () => {
  const [sidebar, isSidebar] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [colorIndex, setColorIndex] = useState(0)

  const darkColors = [
    '#0D1B2A',
    '#1B2631',
    '#2C3E50',
    '#3B0B45',
    '#4A0E3D',
    '#2E2A2B',
    '#2B2D42',
    '#3A3D3F',
    '#1E1F28',
    '#232B2B',
    '#2F2A5B',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % darkColors.length)
    }, 200)
    return () => clearInterval(interval)
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 4000)

    return () => clearTimeout(timeout)
  }, [])

  if (loading) {
    return (
      <motion.span
        className="fixed top-0 bottom-0 left-0 right-0 z-[9999999] px-20"
        animate={{ backgroundColor: darkColors[colorIndex] }}
        transition={{ duration: 1 }} // durasi transisi antar warna
      >
        <Textload text="ANIMIFY" duration={3500} />
      </motion.span>
    )
  }

  return (
    <>
      <section
        id="hero"
        className="relative w-full min-h-screen text-white bg-center bg-cover"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute top-0 right-0 p-10 md:left-0 text-fuchsia-800">
          <h1
            className="text-5xl font-bold md:text-7xl logo glitch"
            draggable={false}
          >
            ANIMIFY.
          </h1>
        </div>
        <div
          className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col items-start justify-start gap-2 p-5 pt-10 font-semibold md:p-10 md:justify-center  ${
            sidebar
              ? 'bg-gradient-to-r from-black to-transparent md:bg-gradient-to-r md:from-transparent'
              : 'md:bg-gradient-to-r from-black to-transparent'
          }`}
        >
          <div
            className={`${
              sidebar ? 'md:rotate-90 rotate-0' : 'md:rotate-0 rotate-90'
            } cursor-pointer togglebar ease-in-out duration-500 transform transition-all`}
            onClick={() => isSidebar(!sidebar)}
          >
            <RxHamburgerMenu size={40} />
          </div>
          <div
            className={`transition-transform transform ease-in-out duration-500 flex flex-col gap-10 p-2 py-5 text-[1.1rem] border-l-[1px] link-list border-l-white items-start ${
              sidebar
                ? 'md:-translate-x-64 translate-x-0'
                : 'md:translate-x-0 -translate-x-64'
            }`}
          >
            <a
              href="#hero"
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300"
            >
              HOME
            </a>
            <a
              href="#about"
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300"
            >
              ABOUT
            </a>
            <a
              href="#anime"
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300"
            >
              ANIME
            </a>
            <a
              href="#manga"
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300"
            >
              MANGA
            </a>

            <a
              href="#quotes"
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300"
            >
              QUOTES
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center p-10 scroller">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="flex-1 border-[1px] origin-right h-1"
          ></motion.div>
          <div className="flex-1 hidden md:flex"></div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="flex-1 border-[1px] origin-left md:flex hidden"
          ></motion.div>
          <div className="flex-initial scroll animate-comb">
            <img src={Scroller} alt="" width={70} />
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="flex-1 border-[1px] origin-right"
          ></motion.div>
          <motion.div className="flex-1 hidden md:flex"></motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="flex-1 border-[1px] origin-left md:flex hidden h-1"
          ></motion.div>
        </div>
      </section>
      <About />
      <section
        id="anime"
        className="box-border relative w-full min-h-screen bg-gradient-to-b from-black to-fuchsia-950"
      >
        <Topbar pages={'01'} title="ANIME" />
        <AnimeList classname={`${sidebar ? 'ml-0 md:ml-0' : 'md:ml-20'}`} />
      </section>
      <section
        id="manga"
        className="box-border relative w-full min-h-screen bg-gradient-to-b from-fuchsia-950 to-black"
      >
        <Topbar pages={'02'} title="MANGA" />
        <MangaList classname={`${sidebar ? 'ml-0 md:ml-0' : 'md:ml-20'}`} />
      </section>
      <Quotes />
    </>
  )
}

export default Homepage
