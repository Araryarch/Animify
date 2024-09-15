import Hero from './Components/Pages/Hero'
import AnimatedCursor from 'react-animated-cursor'

const App = () => {
  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        outerStyle={{
          border: '3px solid white',
        }}
        innerStyle={{
          backgroundColor: 'white',
        }}
      />
      <Hero />
    </>
  )
}

export default App
