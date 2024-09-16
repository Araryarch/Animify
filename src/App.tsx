import { useState } from 'react'
import Background from './assets/goku.gif'
import { RxHamburgerMenu } from 'react-icons/rx'

const App = () => {
  const [sidebar, isSidebar] = useState<boolean>(false)

  return (
    <section
      id="Hero"
      className="relative w-full min-h-screen text-white bg-center bg-cover containers"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="absolute top-0 left-0 hidden p-10 text-black md:flex">
        <h1
          className="text-6xl font-bold xl:text-7xl logo glitch"
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
          className={`transition-transform transform ease-in-out duration-500 flex flex-col gap-5 p-2 py-5 text-xl border-l-[1px] link-list border-l-white items-start ${
            sidebar
              ? 'md:-translate-x-64 translate-x-0'
              : 'md:translate-x-0 -translate-x-64'
          }`}
        >
          <a href="">HOME</a>
          <a href="">ANIME</a>
          <a href="">MANGA</a>
          <a href="">CONTACT</a>
          <a href="">FEATURES</a>
          <a href="">QUOTES</a>
        </div>
      </div>
    </section>
  )
}

export default App
