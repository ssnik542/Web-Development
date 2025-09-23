import React from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
const Paginate = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    return (
        <div className="flex justify-center mt-4">
            <ul className="flex justify-center items-center ">
                <li className='md:mr-4 cursor-pointer' onClick={prevPage}><ArrowLeftCircle className='cursor-pointer hover:text-purple-400' /></li>
                {/* <div className='flex my-2'>
                    {pageNumbers.map((number) => (
                        <li key={number} className="pt-3 cursor-pointer bg-gray-400 mx-2 rounded-full h-12 w-12" onClick={() => setCurrentPage(number)}>
                            {number}
                        </li>
                    ))}
                </div> */}
                <li className='ml-4 cursor-pointer hover:text-purple-400' onClick={nextPage}> <ArrowRightCircle className='cursor-pointer' /></li>
            </ul>
        </div>
    );
};

export default Paginate;