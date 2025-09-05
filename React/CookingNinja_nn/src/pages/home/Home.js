import './Home.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Recipelist from '../../components/Recipelist'
import { projFirestore } from '../../firebase/config'
export default function Home() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        setIsPending(true)
        const unsub = projFirestore.collection('recipes').onSnapshot((snapshot) => {
            if (snapshot.empty) {
                setError('No recipes to Load')
                setIsPending(false)
            } else {
                let results = [];
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })
                })
                setData(results)
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })
        return () => unsub()
    }, [])
    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p class="loader">Loading....</p>}
            {data && <Recipelist recipes={data} />}
        </div>
    )
}
