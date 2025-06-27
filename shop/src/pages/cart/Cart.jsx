// src/pages/Cart.jsx
import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { plusCount, minusCount, changeAge, removeItem } from '../../store'

const Cart = () => {
  const userCartInfo = useSelector(state => state.userCartInfo)
  const userInfo = useSelector(state => state.userInfo)
  const dispatch = useDispatch()

  const handleIncrement = id => dispatch(plusCount(id))
  const handleDecrement = id => dispatch(minusCount(id))
  const handleRemove = id => dispatch(removeItem(id))

  return (
    <>
      <h1>{userInfo.name}님의 장바구니</h1>
      <h4>{userInfo.age}세</h4>
      <button onClick={() => dispatch(changeAge(1))}>버튼</button>
      <Table bordered hover style={{ tableLayout: 'fixed', width: '100%' }}>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '50%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경/삭제</th>
          </tr>
        </thead>
        <tbody>
          {userCartInfo.map((item, index) => (
            <tr key={item.id} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td style={{ padding: 0, verticalAlign: 'middle' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100px',
                    margin: 'auto'
                  }}
                >
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleDecrement(item.id)}
                  >-</Button>
                  <span style={{ flexGrow: 1, textAlign: 'center' }}>
                    {item.count}
                  </span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleIncrement(item.id)}
                  >+</Button>
                </div>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {/* 변경 로직 추가 */ }}
                >변경하기</Button>
                <Button
                  variant="danger"
                  size="sm"
                  style={{ marginLeft: '8px' }}
                  onClick={() => handleRemove(item.id)}
                >삭제</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Cart
