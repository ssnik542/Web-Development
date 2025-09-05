import React from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { LuDownload } from 'react-icons/lu'
import { motion } from 'framer-motion'
export default function Card({ divref }) {
    return (
        <motion.div drag dragConstraints={divref} whileDrag={{ scale: 1.2 }} className="relative flex-shrink-0 w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden cursor-pointer hover:bg-zinc-900/50 transition-all">
            <FaRegFileAlt />
            <p className='text-sm leading-tight mt-5 font-semibold'>Lorem ipsum, dolor sit amet voluptates ipsa vitae illo temporibus mollitia? Dolorem asperiores molestiae ea ipsa quo.</p>
            <div className='footer absolute bottom-0 w-full left-0'>
                <div className='flex items-center justify-between py-3 px-8 mb-2'>
                    <h5>.mb4</h5>
                    <span className='w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer'>
                        <LuDownload size={'0.8em'} color='#fff' />
                    </span>
                </div>
                <div className='tag w-full py-4 bg-green-500 flex items-center justify-center'>
                    <h3 className='semi-bold text-sm'></h3>
                    Download Now
                </div>
            </div>
        </motion.div>
    )
}
