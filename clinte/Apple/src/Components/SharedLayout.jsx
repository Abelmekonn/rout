import React from 'react'
import Navigation from './Nav/Nav'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function SharedLayout() {
    return (
        <div>
            <Navigation />
            < Outlet />
            <Footer />
        </div>
    )
}
