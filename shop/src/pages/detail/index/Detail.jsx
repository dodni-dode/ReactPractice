// src/pages/detail/Detail.jsx

// 상품 상세 페이지 컴포넌트
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Nav from 'react-bootstrap/Nav'

// API 및 Redux 액션
import { fetchShoes } from '../../../api/fetchShoes'
import { reduxSetShoes, addItem, addWatchedId } from '../../../store'

// 스타일 모듈
import styles from './Detail.module.css'

// 탭 레이블과 내용 정의
const TAB_LABELS = ['Active', 'NavLink', 'Link']
const TAB_CONTENT = [
  <div key="0">Active Tab Content</div>,
  <div key="1">NavLink Tab Content</div>,
  <div key="2">Link Tab Content</div>
]

export default function Detail({ shoes }) {
  // URL에서 상품 ID 가져오기
  const { id } = useParams()
  const productId = Number(id)

  // shoes 배열에서 해당 상품 찾기
  const product = shoes.find(item => item.id === productId)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 로컬 상태: 주문 수량, 알림 표시, 메시지, 페이드 클래스
  const [orderCount, setOrderCount] = useState(1)
  const [showAlert, setShowAlert] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')
  const [fadeClass, setFadeClass] = useState('')

  // 첫 렌더 시 처리:
  // - shoes 비어있으면 API 호출
  // - 조회 이력 추가, 알림 메시지 세팅, 2초 후 알림 숨김
  useEffect(() => {
    if (!product) {
      fetchShoes()
        .then(data => {
          const found = data.find(item => item.id === productId)
          if (found) {
            dispatch(reduxSetShoes(data))
            dispatch(addWatchedId(found.id))
            setAlertMessage(`${found.title}을(를) 2초 내 주문 시 할인 적용!`)
          } else {
            alert('존재하지 않는 상품입니다.')
            navigate('/')
          }
        })
        .catch(err => console.error('상품 조회 실패:', err))
      return
    }

    dispatch(addWatchedId(product.id))
    setAlertMessage(`${product.title}을(를) 2초 내 주문 시 할인 적용!`)

    const alertTimer = setTimeout(() => setShowAlert(false), 2000)
    return () => clearTimeout(alertTimer)
  }, [product, dispatch])

  // 페이드 애니메이션 클래스 토글
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeClass('end'), 100)
    return () => clearTimeout(fadeTimer)
  }, [])

  // 주문 버튼 클릭 시 검증 및 장바구니 이동
  const handleOrder = () => {
    if (orderCount < 1 || Number.isNaN(orderCount)) {
      setAlertMessage('수량을 올바르게 입력해주세요.')
      setShowAlert(true)
      return
    }

    dispatch(
      addItem({ id: product.id, name: product.title, price: product.price, count: orderCount })
    )
    navigate('/cart')
  }

  // 상품이 없을 경우 안내 후 뒤로가기
  if (!product) {
    return (
      <div className="container mt-5">
        <h4>상품을 찾을 수 없습니다</h4>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          뒤로가기
        </button>
      </div>
    )
  }

  return (
    <div className={`container mt-5 ${styles.start} ${styles[fadeClass]}`}>
      {showAlert && <div className="alert alert-warning">{alertMessage}</div>}

      <div className="row">
        {/* 좌측: 상품 이미지 */}
        <div className="col-md-6">
          <img src={product.image} alt={product.title} style={{ width: '100%' }} />
        </div>

        {/* 우측: 상품 정보 및 주문 */}
        <div className="col-md-6">
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>{product.price.toLocaleString()}원</p>

          <div className="mt-3">
            <label htmlFor="orderCount" className="me-2">수량:</label>
            <input
              id="orderCount"
              type="number"
              className="form-control d-inline-block"
              style={{ width: '100px' }}
              min="1"
              value={orderCount}
              onChange={e => setOrderCount(Number(e.target.value))}
            />
          </div>

          <button className="btn btn-danger mt-4" onClick={handleOrder}>
            주문하기
          </button>
        </div>
      </div>

      {/* 하단: 탭 네비게이션 */}
      <div className="col-12 mt-4">
        <DetailNav />
      </div>
    </div>
  )
}

// 탭 네비게이션 컴포넌트
function DetailNav() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <>
      <Nav
        variant="tabs"
        activeKey={activeTabIndex}
        onSelect={idx => setActiveTabIndex(Number(idx))}
      >
        {TAB_LABELS.map((label, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={idx}>{label}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {/* key 변경으로 NavTabContent 애니메이션 재실행 */}
      <NavTabContent key={activeTabIndex} activeTabIndex={activeTabIndex} />
    </>
  )
}

// Nav탭 콘텐츠 컴포넌트
function NavTabContent({ activeTabIndex }) {
  const [fadeClass, setFadeClass] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setFadeClass('end'), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`${styles.start} ${styles[fadeClass]}`}>
      {TAB_CONTENT[activeTabIndex] || <div>Default Tab Content</div>}
    </div>
  )
}
