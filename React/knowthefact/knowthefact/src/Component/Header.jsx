import React, { useEffect } from 'react'
import './header.css'
export default function
    ({ setShare, share }) {
    const windowScreen = () => {
        return (
            <button className='share' onClick={() => { setShare(prev => !prev) }}>
                {!share ? <>
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                            </svg>
                        </div>
                    </div>
                    <span>Share</span>
                </> : <>Close</>}
            </button>
        )
    }
    const smallwindowScreen = () => {
        return (
            <button className="button-23" role="button" onClick={() => { setShare(prev => !prev) }}>
                {!share ? <>Share</> : <>Close</>}
            </button>
        )
    }
    useEffect(() => {

    }, [window.screen.width])
    return (
        <div className='heading'>
            <div className='head'>
                <img src="https://img.icons8.com/dusk/64/null/labels.png" />
                <h1>
                    Todays Fact</h1>
            </div>
            {window.screen.width < 600 ? smallwindowScreen() : windowScreen()}
        </div>
    )
}
