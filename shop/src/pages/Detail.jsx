// src/pages/Detail.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import styles from './Detail.module.css'

function Detail({ shoes }) {
  const { id } = useParams()
  const productId = Number(id)
  const product = shoes.find(item => item.id === productId)
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(true)
  const [alertText, setAlertText] = useState('')
  const [orderCount, setOrderCount] = useState(1)
  const [fade, setFade] = useState('')

  useEffect(() => {
    setFade('')
    const timer = setTimeout(() => setFade('end'), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!product) return
    setAlertText(`${product.title}을(를) 2초 내 주문 시 할인 적용!`)
    const timer = setTimeout(() => setShowAlert(false), 2000)
    return () => clearTimeout(timer)
  }, [product])

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

  const handleOrder = () => {
    if (orderCount < 1 || isNaN(orderCount)) {
      setAlertText('수량을 올바르게 입력해주세요.')
      setShowAlert(true)
      return
    }
    alert(`${product.title} ${orderCount}개 주문 완료`)
    navigate('/')
  }

  return (
    <div className={`container mt-5 ${styles.start} ${styles[fade]}`}>
      {showAlert && <div className="alert alert-warning">{alertText}</div>}
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.title} style={{ width: '100%' }} />
        </div>
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
      <div className="col-12 mt-4">
        <DetailNav />
      </div>
    </div>
  )
}

const TAB_LABELS = ['Active', 'NavLink', 'Link']

function DetailNav() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <Nav
        variant="tabs"
        activeKey={activeIndex}
        onSelect={idx => setActiveIndex(Number(idx))}
      >
        {TAB_LABELS.map((label, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={idx}>{label}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <TabContent activeTabIndex={activeIndex} />
    </>
  )
}

function TabContent({ activeTabIndex }) {
  const [fade, setFade] = useState('')
  const TAB_CONTENT = [
    <div key="0">Active Tab Content</div>,
    <div key="1">NavLink Tab Content</div>,
    <div key="2">Link Tab Content</div>
  ]


  useEffect(() => {
    setFade('')
    const timer = setTimeout(() => setFade('end'), 100)
    return () => clearTimeout(timer)
  }, [activeTabIndex])

  return (
    <div className={`${styles.start} ${styles[fade]}`}>
      {TAB_CONTENT[activeTabIndex] || <div>Default Tab Content</div>}
    </div>
  )
}

export default Detail
