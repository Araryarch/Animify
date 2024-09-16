import { Background } from '../../Components/ui/background'
import { TextHover } from '../../Components/ui/TextHover'
import Scrollbar from '../ui/Scrollbar'

const Hero = () => {
  return (
    <Background>
      <div className="h-[50rem] w-full bg-dot-white/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="h-[30rem] flex items-center justify-center p-5">
          <TextHover text="ANIMIFY." />
        </div>
      </div>
      <Scrollbar />
    </Background>
  )
}

export default Hero
