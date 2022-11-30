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

  const hasToppings = totals.toppings > 0
  let toppingsDisplay = null

  if (hasToppings) {
    const toppingsArray = Object.keys(optionCounts.toppings) // ["M&Ms", "Gummy Bears"]
    const toppingsList = toppingsArray.map(key => <li key={key}>{key}</li>)

    toppingsDisplay = (
      <>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingsList}</ul>
      </>
    )
  }

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}
