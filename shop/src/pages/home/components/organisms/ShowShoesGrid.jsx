// src/features/home/components/organisms/ShowShoesGrid.jsx
import { Link } from 'react-router-dom'
import styles from './ShowShoesGrid.module.css'

export default function ShowShoesGrid({ shoes, itemsPerRow = 3 }) {
  const gridStyle = { gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` } // 열 개수 동적 설정

  return (
    <div className={styles.gridContainer} style={gridStyle}>
      {shoes.map(({ id, image, title, content, price }) => (
        <Link key={id} to={`/detail/${id}`} className={styles.card}>
          {/* 이미지 */}
          <div className={styles.imageWrapper}>
            <img src={image} alt={title} />
          </div>
          {/* 텍스트 정보 */}
          <div className={styles.info}>
            <h4>{title}</h4>
            <p>{content}</p>
            <p>{price.toLocaleString()}원</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
