// src/components/RecentlyWatched.jsx
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './RecentlyWatched.module.css'

export default function RecentlyViewed({ shoes }) {
  // Redux에서 최근 본 상품 ID 배열 가져옴
  const watchedIds = useSelector(state => state.userWatched.ids)
  // Redux에서 장바구니 상품 수 가져옴
  const cartLength = useSelector(state => state.userCartInfo.length)
  const containerRef = useRef(null)

  // 최근 본 상품이 없으면 렌더링 중단
  if (watchedIds.length === 0) return null

  // ID 배열을 역순으로 정렬
  const recentIds = watchedIds.slice().reverse()

  return (
    <aside className={styles.fixedContainer}>
      {/* 장바구니 정보 */}
      <Link to="/cart">
        <h5 className={`${styles.title} ${styles.cart}`}>
          Cart: {cartLength}
        </h5>
      </Link>

      {/* 최근 본 상품 제목 */}
      <p className={`${styles.title} ${styles.str}`}>
        최근 본 상품
      </p>

      {/* 최근 본 상품 목록 */}
      <div ref={containerRef} className={styles.itemsContainer}>
        <ul className={styles.list}>
          {recentIds.map(id => {
            const item = shoes.find(product => product.id === id)
            if (!item) return null
            return (
              <li key={id} className={styles.item}>
                <Link to={`/detail/${id}`} className={styles.link}>
                  {/* 상품 썸네일 */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.thumb}
                  />
                  {/* 상품 이름 */}
                  <span className={styles.name}>
                    {item.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 상단 이동 버튼 */}
      <button
        className={`${styles.topBtn} ${styles.title}`}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      >
        top
      </button>
    </aside>
  )
}
