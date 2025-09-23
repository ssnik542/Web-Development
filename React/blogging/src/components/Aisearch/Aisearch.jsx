import React, { useRef, useState } from 'react'
import { Sparkles } from "lucide-react";
import openai from '../../utils/openai'
import { toast, ToastContainer } from 'react-toastify';
export default function Aisearch() {
    const inputref = useRef()
    const [loading, setLoading] = useState(false);
    const [ideas, setIdeas] = useState('')
    const handleClick = async () => {
        try {
            setLoading(true);
            const query = `Act as a blog ideas recommendation system and suggest some creative blog ideas for the query : ${inputref.current.value} only give me 10 ideas in array format .`
            const chatCompletion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: query }],
                model: 'gpt-3.5-turbo',
            });
            const result = chatCompletion.choices[0].message.content;
            setIdeas(result)
            setLoading(false);
        } catch (error) {
            toast.error('Sorry No Suggestion for now ☹️', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col gap-4 items-center">
            <ToastContainer />
            <p className="text-2xl font-bold ">Get new ideas for your blog</p>
            <input type="text"
                placeholder="Ideas for blog"
                className="p-2 rounded-md text-[#15191d] font-semibold w-full"
                ref={inputref}
            />
            <button className="aiBtn font-semibold" onClick={handleClick} type='button' disabled={loading}>
                {loading ? 'Loading..' : 'Ask AI'}
                <Sparkles className="inline pl-1 mb-1" />
            </button>
            <div>{ideas}</div>
        </div>
    )
}
