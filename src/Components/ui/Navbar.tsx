import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <nav className="fixed top-0 flex items-center justify-start w-full gap-5 p-10">
      <div className="flex flex-initial gap-5 text-sm font-medium uppercase transition-all duration-300 ease-in-out xl:text-xl text-fuchsia-900 containers">
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
          Membership
        </a>
        <a
          className="transition-colors duration-300 ease-in-out hover:text-slate-400"
          href="#"
        >
          Contact
        </a>
      </div>
      <motion.div
        className="flex-1 border-[1px] border-fuchsia-900 origin-right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
    </nav>
  )
}

export default Navbar
