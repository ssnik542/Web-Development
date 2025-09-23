import React, { useId } from 'react'

const Select = ({
    options,
    label,
    className = '',
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className='flex justify-center items-center gap-2 w-full'>
            {label && <label htmlFor={id} className='font-semibold'>{label}</label>}
            <select id={id} className={`${className} bg-[#33333] mr-2 p-2 rounded-md cursor-pointer text-black font-semibold`} ref={ref} {...props}>
                {options?.map((option, index) => (
                    <option key={index} value={option} className='cursor-pointer'>{option}</option>
                ))}
            </select>
        </div >
    )
}

export default React.forwardRef(Select)