// import { render, screen } from '@testing-library/react'
import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from '../../../context/OrderDetails'
import Options from '../Options'

test('update scoops subtotal when scoops change', async () => {
  // render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider })
  render(<Options optionType='scoops' />)
  const user = userEvent.setup()

  // make sure total start ou $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // update chocolat scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />)
  const user = userEvent.setup()

  // make sure total start ou $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false
  })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  // check cherries topping and check the subtotal
  const cherriesInput = await screen.findByRole('checkbox', {
    name: 'Cherries'
  })
  await user.click(cherriesInput)
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  // check m&ms topping and check the subtotal
  const mmsInput = await screen.findByRole('checkbox', {
    name: 'M&Ms'
  })
  await user.click(mmsInput)
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  // uncheck m&ms topping and check the subtotal
  await user.click(mmsInput)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
})
