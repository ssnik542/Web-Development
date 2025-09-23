import React from 'react'
import { Link,  useResolvedPath } from 'react-router-dom'
import storageService from '../../appwrite/storageService'
import { DotIcon } from 'lucide-react';
export default function Postcard({ $id, title, featuredImage, status, imgUrl }) {
    const params = useResolvedPath();
    return (
        <Link to={`/post/${$id}`}>
            <div className='formbg rounded-xl bg-opacity-80 hover:scale-105 transition-all'>
                {params.pathname === '/all-posts' && <span className='absolute top-1'><DotIcon className={status === 'active' ? 'text-green-500' : 'text-yellow-500'} /></span>}
                <div className="w-full justify-center">
                    <img src={imgUrl ? imgUrl : storageService.getFilePreview(featuredImage)} alt={title} className='rounded-tr-xl rounded-tl-xl w-64 h-72' loading='lazy' />
                </div>
                <h2 className=' break-words text-xl font-semibold text-center py-2 '>
                    {title.slice(0, 16)}{title.length > 16 ? '..' : ''}
                </h2>
            </div>
        </Link>
    )
}
