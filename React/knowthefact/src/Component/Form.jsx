import React, { useEffect, useRef, useState } from 'react'
import supabase from '../supabase'
import './form.css'
export default function ({ setShare, setFacts }) {
    const fact = useRef()
    const [factmsg, setFactmsg] = useState('')
    const [categeory, setCategeory] = useState('')
    const [isuploading, setIsuploading] = useState(false);
    const factmsglenth = factmsg.length;
    const onpostClick = async (e) => {
        e.preventDefault();
        if (factmsg && categeory && factmsg.length <= 200) {
            const newFactobj = {
                about: factmsg,
                type: categeory,
            }
            setIsuploading(true)
            const { data: newFact, err } = await supabase.from("facts").insert([newFactobj]).select();
            if (!err) setFacts(prev => [newFact[0], ...prev])
            setIsuploading(false)
        }
        setFactmsg('')
        setCategeory('')
        setShare(false)
    }


    return (
        <form onSubmit={onpostClick}>
            <div className='shareform'>
                <div className='textbx'>
                    <input type="text" name="text" className="input" placeholder="Write a fact" ref={fact} value={factmsg} onChange={(e) => setFactmsg(e.target.value)} disabled={isuploading}></input>
                    <p>{200 - factmsglenth}</p>
                </div>
                <select className='mySelect' value={categeory} onChange={(e) => setCategeory(e.target.value)} disabled={isuploading}>
                    <option value="">Select the Type</option>
                    <option value="entertainment">ENTERTAINMENT</option>
                    <option value="finance">FINANCE</option>
                    <option value="health">HEALTH</option>
                    <option value="history">HISTORY</option>
                    <option value="news">NEWS</option>
                    <option value="science">SCIENCE</option>
                    <option value="society">SOCIETY</option>
                    <option value="technology">TECHNOLOGY</option>
                </select>
                <button className='formButton' disabled={isuploading}>Post</button>
            </div>
        </form >
    )
}
