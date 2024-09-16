import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 flex items-center justify-center w-full gap-5 p-10 md:justify-start z-50 ${
        isScrolled ? 'backdrop-blur-sm' : ''
      }`}
    >
      <div className="flex flex-initial gap-5 font-bold uppercase transition-all duration-300 ease-in-out text-md xl:text-xl text-fuchsia-700 containers">
        <a
          className="transition-colors duration-300 ease-in-out hover:text-slate-400"
          href="#"
        >
          Home
        </a>
        <a
          className="transition-colors duration-300 ease-in-out hover:text-slate-400"
          href="#"
        >
          Anime
        </a>
        <a
          className="transition-colors duration-300 ease-in-out hover:text-slate-400"
          href="#"
        >
          Manga
        </a>
        <a
          className="transition-colors duration-300 ease-in-out hover:text-slate-400"
          href="#"
        >
          Membership
        </a>
      </div>
      <motion.div
        className="flex-1 border-[1px] border-fuchsia-800 origin-right hidden md:flex"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
    </nav>
  )
}

export default Navbar
