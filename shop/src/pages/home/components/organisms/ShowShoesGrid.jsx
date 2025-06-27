// src/features/home/components/organisms/ShowShoesGrid.jsx
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import styles from './ShowShoesGrid.module.css'

export default function ShowShoesGrid({ shoes, itemsPerRow = 3 }) {

  // 주어진 배열(array)을 size 크기 만큼 분할하여 2차원 배열로 반환
  const chunkArray = (array, size) => {
    const result = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  // shoes 배열을 itemsPerRow 단위로 분할하여 행(row) 배열 생성
  const rows = chunkArray(shoes, itemsPerRow)

  return (
    <Container>
      {/* 각 행을 Row 컴포넌트로 매핑 */}
      {rows.map((row, rowIdx) => (
        <Row key={rowIdx} className={`${styles.row} mb-4`}>
          {/* 각 아이템을 Col 컴포넌트로 매핑 */}
          {row.map(({ id, image, title, content, price }) => (
            <Col key={id} md={12 / itemsPerRow}>
              {/* 상품 상세 페이지로 이동하는 링크 */}
              <Link to={`/detail/${id}`} className="text-decoration-none text-dark">
                {/* 이미지 래퍼: 비율 제어 및 스타일 적용 */}
                <div className={styles['shoe-image-wrapper']}>
                  <img src={image} alt={title} />
                </div>
                {/* 상품 정보: 제목, 설명, 가격 */}
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
