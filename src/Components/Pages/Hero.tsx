import { Background } from '../../Components/ui/background'
import { TextHover } from '../../Components/ui/TextHover'

const Hero = () => {
  return (
    <Background>
      <div className="h-[50rem] w-full bg-dot-white/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="relative z-20 py-8 text-4xl font-bold text-transparent sm:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500">
          <div className="h-[25rem] flex items-center justify-center">
            <TextHover text="ANIMIFY" duration={100} />
          </div>
        </p>
      </div>
    </Background>
  )
}

export default Hero
