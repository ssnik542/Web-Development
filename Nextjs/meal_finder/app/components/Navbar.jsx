import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='py-6 bg-slate-800 text-center font-bold text-3xl text-yellow-50 mb-4'>
            <Link href={'/'}>Meal Finder</Link>
        </div>
    )
}
