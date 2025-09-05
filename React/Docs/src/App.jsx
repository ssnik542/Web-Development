import { useRef, useState } from "react"
import Card from "./component/Card"
import { FaPlusCircle } from "react-icons/fa"
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion"
import MyForm from "./component/InfoFill";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}
function App() {
  const data = {
    desc: '',
    filesize: '',
    close: true,
    tag: { isOpen: '', tagTile: '', tagColor: '' }
  }
  const ref = useRef(null)
  const [isopen, setIsopen] = useState(false)

  const openModal = () => {
    setIsopen(prev => !prev)
  }
  return (
    <div className='relative w-full h-screen bg-zinc-800'>
      <motion.div className="absolute right-8 top-5 py-7 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 90 }}
      >
        {isopen ? <IoIosCloseCircle className="text-red-400  cursor-pointer " size={'2rem'} onClick={openModal} /> :
          <FaPlusCircle className="text-green-400  cursor-pointer" size={'2rem'} onClick={openModal} />}
      </motion.div>
      <div className='absolute top-5 w-full py-10 flex justify-center text-zinc-600 text-xl font-semibold'>Document</div>
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <h1 className=" text-[13vw] leading-none tracking-tighter font-semibold text-zinc-900">
          Docs.
        </h1>
      </div>
      <div className='fixed top-0 left-0 z-[3] w-full h-full p-5 gap-10 flex-wrap' ref={ref}>
        <Card divref={ref} />
      </div>
    </div>
  )
}

export default App
