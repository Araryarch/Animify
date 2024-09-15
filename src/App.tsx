import { Background } from './Components/ui/background'
import { TextHover } from './Components/ui/TextHover'

const App = () => {
  return (
    <Background>
      <div className="h-[50rem] w-full bg-dot-white/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <div className="h-[25rem] flex items-center justify-center">
            <TextHover text="ANIMIFY" />
          </div>
        </p>
      </div>
    </Background>
  )
}

export default App
