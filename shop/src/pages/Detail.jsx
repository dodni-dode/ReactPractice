// src/pages/Detail.jsx

// 외부 라이브러리 및 모듈 임포트
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Nav from 'react-bootstrap/Nav'

// 스타일 모듈 및 액션 임포트
import styles from './Detail.module.css'
import { addItem, addWatchedId } from '../store'

// 탭 구성용 상수 정의
const TAB_LABELS = ['Active', 'NavLink', 'Link']
const TAB_CONTENT = [
  <div key="0">Active Tab Content</div>,
  <div key="1">NavLink Tab Content</div>,
  <div key="2">Link Tab Content</div>
]

// 상품 상세 페이지 컴포넌트
export default function Detail({ shoes }) {
  // URL 파라미터에서 상품 ID 획득
  const { id } = useParams()
  const productId = Number(id)

  // 상품 데이터 조회
  const product = shoes.find(item => item.id === productId)

  // 라우터 및 Redux 디스패치 준비
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 조회 이력 상태 가져오기 (미사용)
  const userWatched = useSelector(state => state.userWatched)

  // 로컬 상태 선언
  const [orderCount, setOrderCount] = useState(1)                    // 주문 수량 상태
  const [showAlert, setShowAlert] = useState(true)                  // 알림 표시 여부
  const [alertText, setAlertText] = useState('')                    // 알림 메시지
  const [fadeClass, setFadeClass] = useState('')                    // 페이드 애니메이션 클래스

  // 첫 렌더 시: 조회 이력 추가 및 알림 메시지 설정
  useEffect(() => {
    if (!product) return                                       // 상품 없으면 종료

    dispatch(addWatchedId(product.id))                        // 조회 ID 디스패치
    setAlertText(`${product.title}을(를) 2초 내 주문 시 할인 적용!`)
    const alertTimer = setTimeout(() => setShowAlert(false), 2000)
    return () => clearTimeout(alertTimer)
  }, [product, dispatch])

  // 페이드 애니메이션 시작 클래스 설정
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeClass('end'), 100)
    return () => clearTimeout(fadeTimer)
  }, [])

  // 주문 처리 함수
  const handleOrder = () => {
    if (orderCount < 1 || Number.isNaN(orderCount)) {
      setAlertText('수량을 올바르게 입력해주세요.')
      setShowAlert(true)
      return
    }

    dispatch(
      addItem({ id: product.id, name: product.title, price: product.price, count: orderCount })
    )
    navigate('/cart')                                          // 장바구니 페이지로 이동
  }

  // 상품 데이터 없을 때 표시용 컴포넌트
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

  // 렌더링
  return (
    <div className={`container mt-5 ${styles.start} ${styles[fadeClass]}`}>
      {showAlert && <div className="alert alert-warning">{alertText}</div>}

      <div className="row">
        {/* 이미지 영역 */}
        <div className="col-md-6">
          <img src={product.image} alt={product.title} style={{ width: '100%' }} />
        </div>

        {/* 상품 정보 및 주문 영역 */}
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

      {/* 하단 탭 네비게이션 */}
      <div className="col-12 mt-4">
        <DetailNav />
      </div>
    </div>
  )
}

// 하위 컴포넌트: 탭 네비게이션
function DetailNav() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <>
      <Nav variant="tabs" activeKey={activeTabIndex} onSelect={idx => setActiveTabIndex(Number(idx))}>
        {TAB_LABELS.map((label, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={idx}>{label}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {/*
        key prop으로 activeTabIndex 전달
        - React가 key 변경 시 컴포넌트를 새로 마운트하여
          TabContent의 useEffect(페이드 애니메이션)를 재실행함
      */}
      <TabContent key={activeTabIndex} activeTabIndex={activeTabIndex} />
    </>
  )
}

// 하위 컴포넌트: 탭 내용 표시 및 페이드 효과
function TabContent({ activeTabIndex }) {
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
