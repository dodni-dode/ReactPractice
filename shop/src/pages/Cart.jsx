// src/pages/Cart.jsx
import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { plusCount, minusCount } from '../store'

const Cart = () => {
  const userCartInfo = useSelector(state => state.userCartInfo)
  const dispatch = useDispatch()

  const handleIncrement = id => dispatch(plusCount(id))
  const handleDecrement = id => dispatch(minusCount(id))

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {userCartInfo.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleDecrement(item.id)}
              >
                -
              </Button>
              <span className="mx-2">{item.count}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleIncrement(item.id)}
              >
                +
              </Button>
            </td>
            <td>
              <Button variant="primary" size="sm">변경하기</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Cart
