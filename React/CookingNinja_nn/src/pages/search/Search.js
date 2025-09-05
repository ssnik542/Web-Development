import './Search.css'
import React from 'react'
import { useLocation } from 'react-router-dom';
import Recipelist from '../../components/Recipelist'
import { useState, useEffect } from 'react';
import { projFirestore } from '../../firebase/config'
import { useParams } from 'react-router-dom';


export default function Search() {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q');
    const { id } = useParams();
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        setIsPending(true)
        projFirestore.collection('recipes').doc(id).get().then((doc) => {
            if (doc.exists) {
                setIsPending(false)
                setData(doc.data())
            } else {
                setIsPending(false)
                setError('could not find that recipe')
            }
        })
    }, [id])
    return (
        <div >
            <h1 className='page-title'>Recipes including "{query}"</h1>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loader'>Loading...</p>}
            {data && <Recipelist recipes={data} />}
        </div>
    )
}
