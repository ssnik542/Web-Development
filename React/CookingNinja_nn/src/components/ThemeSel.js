import './ThemeSel.css'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
const colors = ['#9f2bc1', '#58249c', '#e1a2b8']
export default function ThemeSel() {
    const { changeColor, changeMode, mode } = useTheme();
    const toogle = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }
    console.log(mode);
    return (
        <div className='theme-selector'>
            <div className='mode-toggle'>
                <img src={mode === 'light' ? "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/32/000000/external-brightness-interface-kiranshastry-solid-kiranshastry.png" : "https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-brightness-interface-kiranshastry-gradient-kiranshastry.png"}
                    onClick={toogle}
                    alt='dark/light'
                />
            </div>
            <div className="theme-button">
                {
                    colors.map(color => (
                        <div
                            key={color}
                            onClick={() => changeColor(color)}
                            style={{ background: color }}
                        />
                    ))
                }
            </div>
        </div>
    )
}
