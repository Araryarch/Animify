import { useEffect, useState } from 'react'
import Background from '../../assets/goku.gif'

interface Quote {
  quote: string
  character: string
  anime: string
}

const Quotes = () => {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const quotes: Quote[] = [
    {
      quote: 'Power comes in response to a need, not a desire.',
      character: 'Goku',
      anime: 'Dragon Ball Z',
    },
    {
      quote: 'A lesson without pain is meaningless.',
      character: 'Edward Elric',
      anime: 'Fullmetal Alchemist',
    },
    {
      quote:
        'The world isn’t perfect. But it’s there for us, doing the best it can.',
      character: 'Roy Mustang',
      anime: 'Fullmetal Alchemist',
    },
    {
      quote: 'If you don’t take risks, you can’t create a future!',
      character: 'Monkey D. Luffy',
      anime: 'One Piece',
    },
    {
      quote: 'I’ll leave tomorrow’s problems to tomorrow’s me.',
      character: 'Saitama',
      anime: 'One Punch Man',
    },
    {
      quote: 'In this world, the weak are the sustenance of the strong.',
      character: 'Mereum',
      anime: 'Hunter x Hunter',
    },
    {
      quote:
        'I am the hope of the universe, I am the answer to all living things that cry out for peace.',
      character: 'Goku',
      anime: 'Dragon Ball Z',
    },
    {
      quote:
        'You should enjoy the little detours. To the fullest. Because that’s where you’ll find the things more important than what you want.',
      character: 'Ging Freecss',
      anime: 'Hunter x Hunter',
    },
    {
      quote: 'A person grows up when he’s able to overcome hardships.',
      character: 'Jiraiya',
      anime: 'Naruto',
    },
    {
      quote:
        'Hard work is worthless for those that don’t believe in themselves.',
      character: 'Naruto Uzumaki',
      anime: 'Naruto',
    },
    {
      quote:
        'Sometimes, we have to look beyond what we want and do what’s best.',
      character: 'Piccolo',
      anime: 'Dragon Ball Z',
    },
    {
      quote: 'Fear is not evil. It tells you what your weakness is.',
      character: 'Gildarts Clive',
      anime: 'Fairy Tail',
    },
    {
      quote: 'The world is cruel, but also very beautiful.',
      character: 'Mikasa Ackerman',
      anime: 'Attack on Titan',
    },
    {
      quote:
        'It’s not the face that makes someone a monster; it’s the choices they make with their lives.',
      character: 'Naruto Uzumaki',
      anime: 'Naruto',
    },
    {
      quote: 'A dropout will beat a genius through hard work.',
      character: 'Rock Lee',
      anime: 'Naruto',
    },
    {
      quote: 'It’s okay not to be okay, as long as you are not giving up.',
      character: 'Karen Aijou',
      anime: 'Revue Starlight',
    },
    {
      quote: 'People’s dreams have no end.',
      character: 'Marshall D. Teach',
      anime: 'One Piece',
    },
    {
      quote: 'Don’t start a fight if you can’t end it.',
      character: 'Sanji',
      anime: 'One Piece',
    },
    {
      quote:
        'To true friendship, how long you’ve known each other means nothing.',
      character: 'Luffy',
      anime: 'One Piece',
    },
    {
      quote:
        'You can’t bring back what you’ve lost, think about what you have now!',
      character: 'Jinbei',
      anime: 'One Piece',
    },
    {
      quote: 'Even if I die trying, I have to try!',
      character: 'Monkey D. Luffy',
      anime: 'One Piece',
    },
    {
      quote:
        'When you decided to go to the sea, it was your own decision. I have no right to stop it.',
      character: 'Shanks',
      anime: 'One Piece',
    },
    {
      quote:
        'No matter how hard or how impossible it is, never lose sight of your goal.',
      character: 'Monkey D. Luffy',
      anime: 'One Piece',
    },
    {
      quote:
        'If you’re hungry, eat! If you’re thirsty, drink! If you want to dream, dream!',
      character: 'Monkey D. Luffy',
      anime: 'One Piece',
    },
    {
      quote:
        'The government says your existence is a crime, but no matter what kind of weapons you possess, just being alive isn’t a sin!',
      character: 'Franky',
      anime: 'One Piece',
    },
    {
      quote:
        'Justice will prevail, you say? But of course it will! Whoever wins this war becomes justice!',
      character: 'Donquixote Doflamingo',
      anime: 'One Piece',
    },
    {
      quote: 'I have no sympathy for those who lie about who they truly are.',
      character: 'Roronoa Zoro',
      anime: 'One Piece',
    },
    {
      quote: 'If I get reincarnated, I wanna become a clam.',
      character: 'Monkey D. Luffy',
      anime: 'One Piece',
    },
    {
      quote: 'Forget your desires and stay alive.',
      character: 'Trafalgar D. Water Law',
      anime: 'One Piece',
    },
    {
      quote: 'I’d rather die standing than live kneeling.',
      character: 'Roronoa Zoro',
      anime: 'One Piece',
    },
    {
      quote: 'Whether we wound or are wounded, the blood that flows is red.',
      character: 'Shanks',
      anime: 'One Piece',
    },
    {
      quote:
        'I don’t want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!',
      character: 'Monkey D. Luffy',
      anime: 'One Piece',
    },
    {
      quote:
        'Living is important. It’s because we do, that we can make our dreams a reality.',
      character: 'Vinsmoke Sanji',
      anime: 'One Piece',
    },
    {
      quote: 'Fools who don’t respect the past are likely to repeat it.',
      character: 'Nico Robin',
      anime: 'One Piece',
    },
    {
      quote: 'A man dies when people forget him.',
      character: 'Dr. Hiluluk',
      anime: 'One Piece',
    },
    {
      quote: 'I don’t care who the enemy is, I’ll fight to protect my crew!',
      character: 'Monkey D. Luffy',
      anime: 'One Piece',
    },
    {
      quote: 'Scars on the back are a swordsman’s shame.',
      character: 'Roronoa Zoro',
      anime: 'One Piece',
    },
    {
      quote: 'I’m not going to do what you want. I’m going to do what I want!',
      character: 'Portgas D. Ace',
      anime: 'One Piece',
    },
    {
      quote:
        'What do you know of death? Have you ever died? You think death will preserve your cause forever?',
      character: 'Kaido',
      anime: 'One Piece',
    },
  ]

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setQuote(quotes[randomIndex])
      setIsLoading(false)
    }

    getRandomQuote()
  }, [])

  return (
    <section
      id="quotes"
      className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 text-center bg-center bg-cover"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black to-transparent"></div>

      {isLoading ? (
        <div className="text-3xl text-white">Loading...</div>
      ) : quote ? (
        <>
          <blockquote className="text-3xl italic font-bold text-white md:text-6xl lg:text-7xl glitch">
            &quot;{quote.quote}&quot;
          </blockquote>
          <p className="z-40 mt-4 text-xl font-bold text-white md:text-2xl lg:text-3xl">
            ~ {quote.character} from {quote.anime}
          </p>
        </>
      ) : (
        <div className="text-4xl text-white">Failed to load quote</div>
      )}
    </section>
  )
}

export default Quotes
