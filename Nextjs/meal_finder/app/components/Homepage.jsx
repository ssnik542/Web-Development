import React from 'react'
import Items from './Items';
const getMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    const data = await response.json();
    return data.categories;

}
export const Homepage = async () => {
    const meals = await getMeals();
    return (
        <div className='flex gap-6 flex-wrap justify-center items-center mb-4 px-24'>
            {meals?.map((meal) => (
                <Items id={meal.strCategory} name={meal.strCategory} img={meal.strCategoryThumb} />
            ))}
        </div>
    )
}
