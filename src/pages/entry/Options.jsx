import axios from 'axios'
import { useEffect, useState } from 'react'
import ScoopOptions from './ScoopOptions'
import { Row } from 'react-bootstrap'
import ToppingOptions from './ToppingOption'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(error => {
        // TODO: handle error response
      })
  }, [optionType])

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions

  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return <Row>{optionItems}</Row>
}
