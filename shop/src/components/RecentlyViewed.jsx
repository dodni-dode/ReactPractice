// src/components/RecentlyViewed.jsx
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './RecentlyViewed.module.css'

export default function RecentlyViewed({ shoes }) {
  const watchedIds = useSelector(s => s.watchedSlice.userWatchedIds)
  if (watchedIds.length === 0) return null

  return (
    <aside className={styles.fixedContainer}>
      <h5 className={styles.title}>최근 본 상품</h5>
      <ul className={styles.list}>
        {watchedIds.slice().reverse().map(id => {
          const item = shoes.find(s => s.id === id)
          return item && (
            <li key={id} className={styles.item}>
              <Link to={`/detail/${id}`} className={styles.link}>
                <img src={item.image} alt={item.title} className={styles.thumb} />
                <span className={styles.name}>{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
