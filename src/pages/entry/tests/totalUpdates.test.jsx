// import { render, screen } from '@testing-library/react'
import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from '../../../context/OrderDetails'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

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

describe.only('grand total', () => {
  const user = userEvent.setup()
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    })

    // Check if grando total start at $0.00
    expect(grandTotal).toHaveTextContent('0.00')

    // update vanilla scoops to 1 and check the grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')

    // check cherries topping and check the grand total
    const cherriesInput = await screen.findByRole('checkbox', {
      name: 'Cherries'
    })
    await user.click(cherriesInput)
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    })

    // check cherries topping and check the grand total
    const cherriesInput = await screen.findByRole('checkbox', {
      name: 'Cherries'
    })
    await user.click(cherriesInput)
    expect(grandTotal).toHaveTextContent('1.50')

    // update vanilla scoops to 1 and check the grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    })

    // check cherries topping and check the grand total
    const cherriesInput = await screen.findByRole('checkbox', {
      name: 'Cherries'
    })
    await user.click(cherriesInput)
    expect(grandTotal).toHaveTextContent('1.50')

    // update vanilla scoops to 1 and check the grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')

    //  remove 1 scoop of vanilla and check grand total
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    expect(grandTotal).toHaveTextContent('3.50')

    //  remove cherries topping and check grand total
    await user.click(cherriesInput)
    expect(grandTotal).toHaveTextContent('2.00')

    //  remove 1 scoop of vanilla and check grand total
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '0')
    expect(grandTotal).toHaveTextContent('0.00')
  })
})
