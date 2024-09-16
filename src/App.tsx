import Hero from './Components/Pages/Hero'
import AnimatedCursor from 'react-animated-cursor'
import Navbar from './Components/ui/Navbar'
import { isMobile } from 'react-device-detect'

const App = () => {
  return (
    <>
      {!isMobile && (
        <AnimatedCursor
          innerSize={8}
          outerSize={50}
          innerScale={1}
          outerScale={1.7}
          outerAlpha={0}
          outerStyle={{
            border: '3px solid #c026d3',
          }}
          innerStyle={{
            mixBlendMode: 'difference',
            backgroundColor: '#fffffff',
          }}
        />
      )}
      <Hero />
      <Navbar />
    </>
  )
}

export default App
