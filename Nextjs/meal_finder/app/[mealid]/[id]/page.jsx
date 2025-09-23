import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
const getMeal = async (id) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0]
}

export default async function page({ params }) {
    const meal = await getMeal(params.id)
    console.log(params)

    return (
        <div className='flex justify-center'>
            <div className='flex p-4 justify-center items-center w-4/6'>
                <div className='w-1/2 h-full flex  flex-col items-center p-2'>
                    <Image height={400} width={400} src={meal.strMealThumb} className='rounded-xl' />
                    <h2 className='my-2 text-2xl font-bold'>{meal?.strMeal}</h2>
                    <p className='text-lg text-red-400 font-semibold'>Dish From : {meal.strArea}</p>
                </div>
                <div className='w-1/2 p-4 flex justify-start align-top h-full'>
                    <p className='text-lg'>{meal.strInstructions.slice(0, 800)} ...
                        <a className='text-md font-light cursor-pointer' href={meal.strSource} target='_blank'>
                            Read more
                        </a>
                    </p>
                </div>
            </div>
            <Link href={`/${params.mealid}`} className='text-green-500 text-3xl'>
                🔙
            </Link>
        </div>
    )
}
