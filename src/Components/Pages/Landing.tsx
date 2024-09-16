import Hero from '../Templates/Hero'
import AnimatedCursor from 'react-animated-cursor'
import Navbar from '../ui/Navbar'
import { isMobile } from 'react-device-detect'

const Landing = () => {
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

export default Landing
