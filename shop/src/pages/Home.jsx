// src/pages/Home.jsx
import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const chunkArray = (array, size) => {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

function ShowShoesGrid({ shoes, itemsPerRow = 3 }) {
  const rows = chunkArray(shoes, itemsPerRow)
  return (
    <Container>
      {rows.map((row, rowIdx) => (
        <Row key={rowIdx} className={`${styles.row} mb-4`}>
          {row.map(({ id, image, title, content, price }) => (
            <Col key={id} md={12 / itemsPerRow}>
              <Link to={`/detail/${id}`} className="text-decoration-none text-dark">
                <div className={styles['shoe-image-wrapper']}>
                  <img src={image} alt={title} />
                </div>
                <div className={styles['shoe-info']}>
                  <h4>{title}</h4>
                  <p>{content}</p>
                  <p>{price.toLocaleString()}원</p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  )
}

function Home({ shoes, onSort, loadMore, btnDisabled, loading: parentLoading }) {
  const [localLoading, setLocalLoading] = useState(false)
  const delayLoad = () => new Promise(resolve => setTimeout(resolve, 0))

  const handleLoadMore = async () => {
    setLocalLoading(true)
    await delayLoad()
    loadMore()
    setLocalLoading(false)
  }

  const isLoading = localLoading || parentLoading

  if (shoes.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h4>상품이 없습니다.</h4>
      </Container>
    )
  }

  return (
    <>
      <div className={styles['main-bg']} />

      <Container className="mt-3 text-end">
        <button className={`${styles.btn} ${styles.sort}`} onClick={onSort}>
          Sort by Name
        </button>
      </Container>

      <ShowShoesGrid shoes={shoes} itemsPerRow={3} />

      <Container className="text-center mb-5">
        <button
          className={styles['btn']}
          onClick={handleLoadMore}
          disabled={btnDisabled || isLoading}
        >
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : btnDisabled ? (
            '더 이상 상품이 없습니다.'
          ) : (
            '더보기'
          )}
        </button>
      </Container>
    </>
  )
}

export default Home
