import './Create.css'
import axios from "axios";
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { projFirestore } from '../../firebase/config'
export default function Create() {
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIng, setNewIng] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const ingrInput = useRef(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: { query: title },
            headers: {
                Authorization: "Client-ID E6nNSna3i6fkgqX-zKlAgGFh1LvfvMtNCTUo0MZ6qVA"
            }
        });
        const Imgsrc = response.data.results[0].urls.regular;
        const doc = { title, ingredients, method, cookingTime: cookingTime + 'minutes', "src": `${Imgsrc}` };
        try {
            await projFirestore.collection('recipes').add(doc)
            navigate('/');
        } catch (err) {
            console.log(err)
        }
    }
    const handleAdd = (e) => {
        const ing = newIng.trim()
        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngr => [...prevIngr, ing]);
        }
        setNewIng('');
        ingrInput.current.focus();
    }
    return (
        <div className='login-page'>
            <div className="form">
                <div className="login">
                    <div className="login-header">
                        <h2 className='page-title'>Add a New Recipe</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='login-header'>
                    <label>
                        <span>Recipe Title:</span>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                    </label>
                    <label>
                        <span>Recipe ingredients:</span>
                        <div className="ingrident">
                            <input type="text" onChange={(e) => setNewIng(e.target.value)} value={newIng} ref={ingrInput} />
                            <img src="https://img.icons8.com/ios-glyphs/20/000000/add--v1.png" onClick={handleAdd} />
                        </div>
                    </label>
                    <p>Currrent ingredents :{ingredients.map(i => <em key={i}>{i},</em>)}</p>
                    <label>
                        <span>Recipe Method:</span>
                        <textarea onChange={(e) => setMethod(e.target.value)} value={method} required />
                    </label>
                    <label>
                        <span>Cooking Time (minutes):</span>
                        <input type="number" onChange={(e) => setCookingTime(e.target.value)} required />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}