import React, { useId } from 'react'

const Input = React.forwardRef((
    {
        label,
        type = 'text',
        className = '',
        labelclassName = '',
        ...props
    },
    ref
) => {
    const id = useId();
    return (
        <div className='flex items-baseline justify-between w-full'>
            {label && <label className={`inline-block mb-1 font-semibold w-1/3 mr-1 ${labelclassName}`} htmlFor={id}>{label}</label>}
            <input className={`${className} border border-black p-2 rounded-lg text-black`} type={type} ref={ref} {...props} id={id}></input>
        </div >
    )
})

export default Input