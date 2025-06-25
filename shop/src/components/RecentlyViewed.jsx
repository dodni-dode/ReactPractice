// src/components/RecentlyViewed.jsx
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import styles from './RecentlyViewed.module.css'

export default function RecentlyViewed({ shoes }) {
  const watchedIds = useSelector(s => s.watchedSlice.userWatchedIds)
  const containerRef = useRef(null)
  if (watchedIds.length === 0) return null

  const allIds = watchedIds.slice().reverse()

  const scrollUp = () => {
    const h = containerRef.current.clientHeight
    containerRef.current.scrollBy({ top: -h, behavior: 'smooth' })
  }
  const scrollDown = () => {
    const h = containerRef.current.clientHeight
    containerRef.current.scrollBy({ top: h, behavior: 'smooth' })
  }

  return (
    <aside className={styles.fixedContainer}>
      <h5 className={`${styles.title} ${styles.cart}`}>Cart</h5>
      <p className={`${styles.title} ${styles.str}`}>최근 본 상품</p>

      <button onClick={scrollUp} className={styles.arrowBtn}>&uarr;</button>

      <div ref={containerRef} className={styles.itemsContainer}>
        <ul className={styles.list}>
          {allIds.map(id => {
            const item = shoes.find(s => s.id === id)
            if (!item) return null
            return (
              <li key={id} className={styles.item}>
                <Link to={`/detail/${id}`} className={styles.link}>
                  <img src={item.image} alt={item.title} className={styles.thumb} />
                  <span className={styles.name}>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <button onClick={scrollDown} className={styles.arrowBtn}>&darr;</button>

      <button
        className={`${styles.topBtn} ${styles.title}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        top
      </button>
    </aside>
  )
}
