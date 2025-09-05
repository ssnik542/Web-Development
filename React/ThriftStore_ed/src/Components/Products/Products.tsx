import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Products() {
    const [product, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();
            setProducts(data)
        })()
    }, [])
    return (
        <div className='h-full p-4 grid md:grid-cols-4  gap-3 overflow-y-auto grid-cols-2'>
            {product.map((p: any) => (
                <div key={p.id} >
                    <Link to={`products/${p.id}`}>
                        <div className='p-2 flex flex-col rounded-md justify-center items-center'>
                            <img src={p.images[0]} alt="" className='w-48 rounded-md' />
                            <span>{p.title}</span>
                            <span>{p.price}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div >
    )
}
