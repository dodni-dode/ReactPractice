// src/components/RecentlyViewed.jsx
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './RecentlyViewed.module.css'

export default function RecentlyViewed() {
    const userWatched = useSelector(state => state.userWatched)

    if (userWatched.length === 0) return null

    return (
        <aside className={styles.fixedContainer}>
            <h5 className={styles.title}>최근 본 상품</h5>
            <ul className={styles.list}>
                {userWatched.map(item => (
                    <li key={item.id} className={styles.item}>
                        <Link to={`/detail/${item.id}`} className={styles.link}>
                            <img src={item.image} alt={item.title} className={styles.thumb} />
                            <span className={styles.name}>{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
