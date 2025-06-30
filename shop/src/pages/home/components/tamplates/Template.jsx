// src/pages/home/components/tamplates/Templates.jsx
// 목적: 상품 목록 페이지 템플릿 컴포넌트
// 핵심 로직: ① 빈 목록 처리 → ② 정렬 → ③ 그리드 출력 → ④ 추가 로드
import React from 'react'
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
      <div className={styles.empty}>
        <h4>상품이 없습니다.</h4>
      </div>
    )
  }

  // 정렬 핸들러: 제목 기준 한글 정렬
  const sortTitles = () =>
    setShoes(prev =>
      [...prev].sort((a, b) => a.title.localeCompare(b.title, 'ko'))
    )

  return (
    <>
      {/* 메인 배경 이미지 */}
      <div className={styles.mainBg} />

      {/* 정렬 버튼 영역 */}
      <div className={styles.sortArea}>
        <button
          className={`${styles.btnBase} ${styles.sortBtn}`}
          onClick={sortTitles}
        >
          정렬
        </button>
      </div>

      {/* 상품 그리드 */}
      <ShowShoesGrid shoes={shoes} itemsPerRow={3} />

      {/* '더 보기' / 로딩 상태 영역 */}
      <div className={styles.loadArea}>
        <button
          className={`${styles.btnBase} ${styles.loadBtn}`}
          onClick={handleLoadMore}
          disabled={btnDisabled || isLoading}
        >
          {isLoading ? (
            // 로딩 스피너 표시
            <span className={styles.spinner} />
          ) : btnDisabled ? (
            '더 이상 상품이 없습니다.'
          ) : (
            '더 보기'
          )}
        </button>
      </div>
    </>
  )
}
