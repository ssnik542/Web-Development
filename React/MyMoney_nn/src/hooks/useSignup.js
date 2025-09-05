import { useState } from "react"
import { projAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {

    //creating states
    const [error, setError] = useState(null)    //for any errors
    const [isPending, setIsPending] = useState(false)   //loading
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        //new error comming from firebase
        setError(null)
        setIsPending(true)

        try {
            //signup user'
            const response = await projAuth.createUserWithEmailAndPassword(email, password)

            if (!response) {
                throw new Error('Could not complete singup')
            }

            //add display name to user
            await response.user.updateProfile({ displayName: displayName })


            //dispatch login action
            dispatch({ type: "LOGIN", payload: response.user })
            setIsPending(false)
            setError(null)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    return { error, isPending, signup }
}