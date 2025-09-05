import './Recipe.css'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { projFirestore } from '../../firebase/config'

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    setIsPending(true)
    projFirestore.collection('recipes').doc(id).get().then((doc) => {
      if (doc.exists) {
        setIsPending(false)
        setRecipe(doc.data())
      } else {
        setIsPending(false)
        setError('could not find that recipe')
      }
    })
  }, [id])
  return (
    <div className="recipe">
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loader'>Loading...</p>}
      {recipe && (
        <>
          <div className="side">
            <img src={recipe.src} />
            <div className="cont">
              <h2 className='title'>{recipe.title}</h2>
              <p>Takes {recipe.cookingTime}</p>
              <ul>
                {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
              </ul>
              <p className='method'>{recipe.method}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
