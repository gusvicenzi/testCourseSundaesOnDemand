import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'
import { SummaryForm } from './SummaryForm'

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails()

  const scoopArray = Object.entries(optionCounts.scoops) // [["chocolate", 2], ["vanilla", 3]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const toppingsArray = Object.keys(optionCounts.toppings) // ["M&Ms", "Gummy Bears"]
  const toppingsList = toppingsArray.map(key => <li key={key}>{key}</li>)

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}
