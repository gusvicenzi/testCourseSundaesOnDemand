import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('order phases for happy path', async () => {
  render(<App />)
  const user = userEvent.setup()

  const vanillaScoop = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  })
  const cherriesTopping = await screen.findByRole('checkbox', {
    name: 'Cherries'
  })

  await user.clear(vanillaScoop)
  await user.type(vanillaScoop, '1')
  await user.click(cherriesTopping)

  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' })
  await user.click(orderButton)

  const scoopsOrderSummary = screen.getByRole('heading', {
    name: /scoops: \$/i
  })
  const toppingsOrderSummary = screen.getByRole('heading', {
    name: /toppings: \$/i
  })

  expect(scoopsOrderSummary).toHaveTextContent('2.00')
  expect(toppingsOrderSummary).toHaveTextContent('1.50')

  expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
  expect(screen.getByText('Cherries')).toBeInTheDocument()
  // alternatively...
  // const optionItems = screen.getAllByRole('listitem');
  // const optionItemsText = optionItems.map((item) => item.textContent);
  // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions'
  })
  const confirmButton = screen.getByRole('button', { name: 'Confirm order' })
  await user.click(termsAndConditionsCheckbox)
  await user.click(confirmButton)

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText('Your order number is', {
    exact: false
  })
  expect(orderNumber).toBeInTheDocument()

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: 'Create new order'
  })
  await user.click(newOrderButton)

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText('Scoops total: $0.00')
  expect(scoopsTotal).toBeInTheDocument()
  const toppingsTotal = screen.getByText('Toppings total: $0.00')
  expect(toppingsTotal).toBeInTheDocument()

  // wait for items to appear so that Testing Library doesn't get angry about stuff
  // happening after test is over
  await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await screen.findByRole('checkbox', { name: 'Cherries' })
})
