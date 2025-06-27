// src/App.jsx
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ShopNavbar from './commonComponents/ShopNavbar.jsx'
import RecentlyWatched from './commonComponents/recentlyWatched/RecentlyWatched.jsx'
import Home from './pages/home/index/index.jsx'
import Detail from './pages/detail/index/Detail.jsx'
import Cart from './pages/cart/Cart.jsx'
import Event from './pages/event/Event.jsx'
import NotFound from './pages/404/NotFound.jsx'

import './App.css'

export default function App() {
  const liftedShoes = useSelector(state => state.shoes)
  const location = useLocation()

  const isCartPage = location.pathname === '/cart'

  return (
    <>
      {!isCartPage && <RecentlyWatched shoes={liftedShoes} />}
      <ShopNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail shoes={liftedShoes} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/event/*" element={<Event />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
