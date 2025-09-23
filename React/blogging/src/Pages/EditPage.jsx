import React, { useEffect, useState } from 'react'
import Container from '../components/container/container'
import { useNavigate, useParams } from 'react-router-dom';
import storageService from '../appwrite/storageService';
import PostForm from '../components/PostForm/PostForm'
function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            storageService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost