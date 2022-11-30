import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useOrderDetails } from '../../context/OrderDetails'

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then(res => {
        setOrderNumber(res.data.orderNumber)
      })
      .catch(e => {
        // TODO: handle error from server
      })
  }, [])

  function handleClick() {
    resetOrder()
    setOrderPhase('inProgress')
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    )
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Loading</h1>
      </div>
    )
  }
}
