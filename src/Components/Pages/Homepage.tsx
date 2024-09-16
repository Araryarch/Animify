import { useState } from 'react'
import Background from '../../assets/goku.gif'
import Scroller from '../../assets/scroller.png'
import { RxHamburgerMenu } from 'react-icons/rx'
import { motion } from 'framer-motion'
import AnimatedCursor from 'react-animated-cursor'
import { isMobile } from 'react-device-detect'

const Homepage = () => {
  const [sidebar, isSidebar] = useState<boolean>(false)

  return (
    <>
      {!isMobile && (
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={1.7}
          outerAlpha={0}
          outerStyle={{
            border: '3px solid white',
            mixBlendMode: 'exclusion',
          }}
          innerStyle={{
            backgroundColor: 'transparent',
          }}
        />
      )}
      <section
        id="Hero"
        className="relative w-full min-h-screen text-white bg-center bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="absolute top-0 right-0 p-10 md:left-0 text-fuchsia-800">
          <h1
            className="text-5xl font-bold md:text-7xl logo glitch"
            draggable={false}
          >
            ANIMIFY.
          </h1>
        </div>
        <div className="absolute top-0 bottom-0 left-0 flex flex-col items-start justify-start gap-2 p-5 pt-10 font-semibold xl:p-10 md:justify-center sidebar">
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
              href=""
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300 active"
            >
              HOME
            </a>
            <a
              href=""
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300"
            >
              ANIME
            </a>
            <a
              href=""
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300"
            >
              MANGA
            </a>
            <a
              href=""
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300"
            >
              CONTACT
            </a>
            <a
              href=""
              className="transition-colors duration-300 ease-in-out hover:text-fuchsia-300"
            >
              FEATURES
            </a>
            <a
              href=""
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
            className="flex-1 border-[1px] origin-left md:flex hidden  h-1"
          ></motion.div>
        </div>
      </section>
      <section id="anime" className="w-full min-h-screen"></section>
    </>
  )
}

export default Homepage