import React from 'react'
import PostCard from './Postcard'
export default function Cards({ post }) {
    return (
        <div className='grid lg:grid-cols-5 gap-4 md:grid-cols-3 sm:grid-cols-2'>
            {post && post.map(pst => <PostCard key={pst.$id} $id={pst.$id} title={pst.Title} featuredImage={pst.FeaturedImg} status={pst.status} imgUrl={pst.imgUrl} />)}
        </div>
    )
}
