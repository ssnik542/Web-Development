import React from 'react'
import './sidebar.css'
export default function Sidebar({ setFilter }) {

    const onButtonClick = (text) => {
        setFilter(text)
    }
    const filter = ['ALL', 'TECHNOLOGY', 'SCIENCE', 'FINANCE', 'SOCIETY', 'ENTERTAINMENT', 'HEALTH', 'HISTORY', 'NEWS'].sort()
    return (
        <div className="sidebar">
            {
                filter.map(text => <button className={`${text}`} key={`${text}`} onClick={() => onButtonClick(text)}> {text}</button>)
            }
        </div >
    )
}
