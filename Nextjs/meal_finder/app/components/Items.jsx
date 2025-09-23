import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
export default function Items({ id, name, img }) {
    return (
        <Link href={id}>
            <div className='p-2 border-[3px] border-gray-800 rounded-xl cursor-pointer hover:opacity-70 hover:scale-105 transition-all w-[400px] flex justify-center flex-col items-center'>
                <Image src={img} width={350} height={350} />
                <p className='p-2 text-xl font-bold'>{name}</p>
            </div>
        </Link>
    )
}
