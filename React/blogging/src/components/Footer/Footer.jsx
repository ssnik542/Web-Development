import React from 'react'
import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react'
export default function Footer() {
    return (
        <div className='bg-[#F8F0E3] w-full py-3 text-[#333333] font-semibold flex justify-between px-2'>
            <div className='flex'>
                <img src="https://th.bing.com/th/id/R.a0099a4b1217bb327b8bdda1fa8218e4?rik=0ZGk0VFbazCOuA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_24762.png&ehk=XBUZdc9M55C3M%2fhOI1Zvn9goc2SgWTMrUjph14iv0LI%3d&risl=&pid=ImgRaw&r=0"
                    alt="logo" className='w-7 hover:bg-emerald-400 cursor-pointer rounded-[50%] transition-all' />
                <span className='pl-2'>| &copy; 2023 Blogs</span>
            </div>
            <div className='flex gap-4 md:pr-8 '>
                <Instagram className='w-4 hover:text-[#e27ea5] cursor-pointer' />
                <Facebook className='w-4 hover:text-[#7eb0e2] cursor-pointer' />
                <Linkedin className='w-4 hover:text-[#9e7ee2] cursor-pointer' />
                <Twitter className='w-4 hover:text-[#8fe27e] cursor-pointer' />
            </div>
        </div>
    )
}
