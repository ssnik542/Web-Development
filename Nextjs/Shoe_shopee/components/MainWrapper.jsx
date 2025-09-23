'use client'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Provider } from 'react-redux'
import store from '../store/store'
export default function MainWrapper({ children }) {
    return (
        <div>
            <Provider store={store}>
                <Header />
                {children}
                <Footer />
            </Provider>
        </div>
    )
}
