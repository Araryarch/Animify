import { motion } from 'framer-motion'
import { Fadetext } from './Fadetext'

const Scrollbar = () => {
  return (
    <div className="absolute bottom-0 flex items-center justify-center w-full gap-5 p-10 scrollbar">
      <motion.div
        className="flex-1 border-[1px] border-fuchsia-800 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
      <div className="flex-initial">
        <Fadetext
          words={['SCROLL DOWN', 'SCROLL ME', 'SCROLL DOWN']}
          className="text-fuchsia-600"
          duration={1000}
        />
      </div>
      <motion.div
        className="flex-1 border-[1px] border-fuchsia-800 origin-right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
    </div>
  )
}

export default Scrollbar
