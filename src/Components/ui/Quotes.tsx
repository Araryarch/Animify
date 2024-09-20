import Background from '../../assets/goku.gif'

const Quotes = () => {
  return (
    <section
      id="quotes"
      className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 text-center bg-center bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black to-transparent"></div>
      <blockquote className="text-4xl italic font-bold text-white md:text-6xl lg:text-7xl glitch">
        &quot;JIKA KAU LAPAR MAKA MAKANLAH.&quot;
      </blockquote>
      <p className="z-40 mt-4 text-xl font-bold text-white md:text-2xl lg:text-3xl">
        ~ Monkey D. Luffy
      </p>
    </section>
  )
}

export default Quotes
