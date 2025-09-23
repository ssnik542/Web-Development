'use client'
import React from 'react'
import Items from '../components/Items'

const getMealByCatg = async (mealctg) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealctg}`)
    const data = await response.json();
    return data.meals;
}
export default async function page(props) {
    const mealbyCtg = await getMealByCatg(props?.params.mealid);
    return (
        <div className='flex gap-6 flex-wrap justify-center items-center mb-4 px-24'>
            {mealbyCtg?.map((meal) => (
                <Items id={`${props.params.mealid}/${meal.idMeal}`} name={meal.strMeal} img={meal.strMealThumb} />
            ))}
        </div>
    )
}
