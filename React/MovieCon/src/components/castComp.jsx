import React from 'react'

export default function CastComp({ image, name }) {
    return (
        <div className='castComp'>
            <img src={image
                ? `https://image.tmdb.org/t/p/original/${image}` : 'https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0'} alt={name} />
            <div className="name">{name}</div>
        </div>
    )
}
