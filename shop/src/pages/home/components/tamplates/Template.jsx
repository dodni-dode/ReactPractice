// src/pages/home/components/tamplates/Templates.jsx
import React from 'react'
import { Container } from 'react-bootstrap'
import ShowShoesGrid from '../organisms/ShowShoesGrid'
import styles from './Template.module.css'

export default function Home({
  shoes,
  setShoes,
  handleLoadMore,
  isLoading,
  btnDisabled,
}) {
  // 상품 목록이 없는 경우
  if (shoes.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h4>상품이 없습니다.</h4>
      </Container>
    )
  }

  return (
    <>
      {/* 메인 배경 이미지 */}
      <div className={styles['main-bg']} />

      {/* 가나다 순 정렬 버튼 */}
      <Container className="mt-3 text-end">
        <button
          className={`${styles.btn} ${styles.sort}`}
          onClick={() =>
            setShoes(prev =>
              // 한국어 기준으로 제목 정렬
              [...prev].sort((a, b) => a.title.localeCompare(b.title, 'ko'))
            )
          }
        >
          정렬
        </button>
      </Container>

      {/* 상품 그리드 */}
      <ShowShoesGrid shoes={shoes} itemsPerRow={3} />

      {/* 더 보기 / 로딩 상태 버튼 */}
      <Container className="text-center mb-5">
        <button
          className={styles.btn}
          onClick={handleLoadMore}
          disabled={btnDisabled || isLoading}
        >
          {isLoading ? (
            // 로딩 스피너 표시
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : btnDisabled ? (
            '더 이상 상품이 없습니다.'
          ) : (
            '더 보기'
          )}
        </button>
      </Container>
    </>
  )
}
