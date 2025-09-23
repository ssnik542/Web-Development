import React, { useState } from 'react'
import './Fact.css'
import supabase from '../supabase'
export default function Fact({ facts, setFacts }) {
    const [updating, setupdating] = useState(false)
    if (facts.length === 0) {
        return <p className='message'>No facts for this categeory yet ! You can add it 😀</p>
    }
    const onButtonClick = async (fact, cloumnName) => {
        setupdating(true);
        const { data: updatedfacts, error } = await supabase
            .from('facts')
            .update({ [cloumnName]: fact[cloumnName] + 1 })
            .eq('id', fact.id)
            .select()
        if (!error) setFacts(prevfacts =>
            prevfacts.map((f) => f.id === fact.id ? updatedfacts[0] : f))
        setupdating(false)
    }
    return (
        < div className='Facts' >
            {facts.map(fact => {
                return (
                    <div className={`fact ${fact.type}`} key={fact.id}>
                        <p>{fact.about}</p>
                        <div className='actions'>
                            <span onClick={() => onButtonClick(fact, 'like')} disabled={updating}>👍 {fact.like}</span>
                            <span onClick={() => onButtonClick(fact, 'mindblowing')} disabled={updating}>🤯 {fact.mindblowing}</span>
                            <span onClick={() => onButtonClick(fact, 'disputed')} disabled={updating}>⛔ {fact.disputed}</span>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}
