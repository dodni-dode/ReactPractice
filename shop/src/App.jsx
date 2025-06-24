// src/App.jsx
import { useEffect, useState } from 'react'
import './App.css'
import initialShoes from './data.jsx'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import ShopNavbar from './components/ShopNavbar.jsx'
import RecentlyViewed from './components/RecentlyViewed.jsx'
import Detail from './pages/Detail.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Event from './pages/Event.jsx'
import NotFound from './pages/NotFound.jsx'
import Cart from './pages/Cart.jsx'

const DATA_URL = 'https://dodni-dode.github.io/ReactPages/shop/data.json'

export default function App() {
  // state: 화면·풀·로딩·버튼상태 관리함
  const [shoes, setShoes] = useState(initialShoes)
  const [buffer, setBuffer] = useState([])
  const [loading, setLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)

  // 제목 가나다 정렬함
  const onSort = () => {
    setShoes(prev =>
      [...prev].sort((a, b) => a.title.localeCompare(b.title, 'ko'))
    )
  }

  // 3개씩 추가 로드함
  const loadMore = async () => {
    setLoading(true)

    if (buffer.length) {
      const next = buffer.slice(0, 3)
      setShoes(prev => [...prev, ...next])
      const rest = buffer.slice(3)
      setBuffer(rest)
      if (rest.length === 0) setBtnDisabled(true)
      setLoading(false)
      return
    }

    try {
      const { data } = await axios.get(DATA_URL)
      if (!data.length) {
        setBtnDisabled(true)
        setLoading(false)
        return
      }
      setShoes(prev => [...prev, ...data.slice(0, 3)])
      setBuffer(data.slice(3))
      if (data.length <= 3) setBtnDisabled(true)
    } catch (e) {
      console.error('로드 오류:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <RecentlyViewed shoes={shoes} />
      <ShopNavbar />
      <Routes>
        <Route
          index
          element={
            <Home
              shoes={shoes}
              onSort={onSort}
              loadMore={loadMore}
              btnDisabled={btnDisabled}
              loading={loading}
            />
          }
        />
        <Route path='detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='about/*' element={<About />} />
        <Route path='event/*' element={<Event />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
