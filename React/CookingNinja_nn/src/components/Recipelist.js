import './Recipelist.css'
import React from 'react'
import { Link } from 'react-router-dom'
import trash from './fail.svg'
import { projFirestore } from '../firebase/config'
export default function Recipelist({ recipes }) {
    if (recipes.length === 0) {
        return <div className='error'>No recipes to load...</div>
    }
    const handleClick = (id) => {
        projFirestore.collection('recipes').doc(id).delete()
    }
    return (
        <>        <div className='recipe-list'>{
            recipes.map(recipe => (
                <div key={recipe.id} className='card'>
                    <div class="first hero">
                        <img className="hero-profile-img" src={recipe.src} alt="" />
                        <div className="hero-description-bk"></div>
                        <div className="hero-logo">
                            <h4>{recipe.title}</h4>
                        </div>
                        <div class="hero-description">
                            <p>{recipe.method.substring(0, 20)}...</p>
                        </div>
                        <div class="hero-date">
                            <p>{recipe.cookingTime} to make.</p>
                        </div>
                        <div class="hero-btn">
                            <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
                        </div>
                        <img src={trash} className="delete" onClick={() => handleClick(recipe.id)} />
                    </div>
                </div>
            ))
        }</div>

        </>

    )
}
