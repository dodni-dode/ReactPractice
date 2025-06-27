// src/App.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

import ShopNavbar from './commonComponents/ShopNavbar.jsx'
import RecentlyWatched from './commonComponents/recentlyWatched/RecentlyWatched.jsx'
import Home from './pages/home/index/index.jsx'
import Detail from './pages/detail/Detail.jsx'
import Cart from './pages/cart/Cart.jsx'
import Event from './pages/event/Event.jsx'
import NotFound from './pages/404/NotFound.jsx'

import './App.css'

const DATA_URL = 'https://dodni-dode.github.io/ReactPages/shop/data.json'

export default function App() {
  const [shoes, setShoes] = useState([])
  const [buffer, setBuffer] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(DATA_URL)
      .then(({ data }) => {
        setShoes(data.slice(0, 3))
        setBuffer(data.slice(3))
        if (data.length <= 3) setBtnDisabled(true)
      })
      .catch(() => setBtnDisabled(true))
      .finally(() => setIsLoading(false))
  }, [])

  const handleLoadMore = () => {
    setShoes(prev => [...prev, ...buffer.slice(0, 3)])
    setBuffer(prev => {
      const next = prev.slice(3)
      if (next.length === 0) setBtnDisabled(true)
      return next
    })
  }

  return (
    <>
      <RecentlyWatched shoes={shoes} />
      <ShopNavbar />

      <Routes>
        <Route
          index
          element={
            <Home
              shoes={shoes}
              setShoes={setShoes}
              handleLoadMore={handleLoadMore}
              isLoading={isLoading}
              btnDisabled={btnDisabled}
            />
          }
        />
        <Route path="detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="event/*" element={<Event />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
