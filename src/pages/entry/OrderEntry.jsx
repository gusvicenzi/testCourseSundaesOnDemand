import { Button } from 'react-bootstrap'
import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'
import Options from './Options'

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails()

  const grandTotal = totals.scoops + totals.toppings
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>
      <Button
        onClick={() => setOrderPhase('review')}
        disabled={totals.scoops > 0 ? false : true}>
        Order Sundae!
      </Button>
    </div>
  )
}
