import AnimeDetail from './Components/Pages/AnimeDetail'
import MangaDetail from './Components/Pages/MangaDetail'
import Homepage from './Components/Pages/Homepage'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/anime/:id" element={<AnimeDetail />} />
      <Route path="/manga/:id" element={<MangaDetail />} />
    </Routes>
  )
}

export default App
