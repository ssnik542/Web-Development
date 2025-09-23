import React from 'react'

export default function FilterBar({ handleFilter, filter }) {
    const filterOpt = ["All", "Entertainment", "Finance", "Health", "History", "News", "Science", "Society", "Sports", "Technology"];
    return (
        <div className='pb-6'>
            <ul className='flex gap-4 flex-wrap justify-center'>
                {filterOpt.map(items => <p key={items} className={`text-sm md:text-lg font-semibold cursor-pointer hover:text-green-400 hover:scale-95 transition-all ${filter === items && 'text-[#e27ea5]'}`} onClick={() => { handleFilter(items) }}>{items}</p>)}
            </ul>
        </div>
    )
}
