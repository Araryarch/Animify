import { useEffect, useState } from 'react'
import Hero from '../Templates/Hero'
import AnimatedCursor from 'react-animated-cursor'
import Navbar from '../ui/Navbar'
import { isMobile } from 'react-device-detect'
import { Commentbox } from '../ui/Comment'
import { fetchComments } from '../../service/apiService'

interface Comment {
  id: number
  body: string
  postId: number
  user: {
    fullName: string
  }
}

const Landing = () => {
  const [comments, setComments] = useState<
    { id: number; quote: string; name: string; title: string }[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments()
        if (data && Array.isArray(data.comments)) {
          const formattedComments = data.comments.map((comment: Comment) => ({
            id: comment.id,
            quote: comment.body,
            name: comment.user.fullName,
            title: 'Software Engineering',
          }))
          setComments(formattedComments)
        } else {
          throw new Error('Unexpected data format')
        }
      } catch (error) {
        setError('Error fetching comments')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadComments()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

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
      <Commentbox
        items={comments}
        speed="normal"
        direction="left"
        className="py-10 bg-black"
      />
    </>
  )
}

export default Landing
