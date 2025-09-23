import React from 'react'
import PostForm from '../components/PostForm/PostForm'
import Container from '../components/container/container'

export default function AddPost() {
    return (
        <Container>
            <div className='py-4'>
                <PostForm />
            </div>
        </Container>
    )
}
