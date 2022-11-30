// import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../test-utils/testing-library-utils'
import Options from '../Options'

test('displays image for each scoop option from server', async () => {
  render(<Options optionType='scoops' />)

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  //  confirm alt text of images
  const altText = scoopImages.map(el => el.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('dont update scoops subtotal for invalid input', async () => {
  const user = userEvent.setup()
  render(<Options optionType='scoops' />)

  const scoopsSubtotal = screen.getByText('Scoops total: $0.00')
  const input = await screen.findByRole('spinbutton', { name: 'Vanilla' })

  // input invalid with negative numbers
  await user.clear(input)
  await user.type(input, '-1')
  expect(input).toHaveClass('is-invalid')
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // input invalid with decimal numbers
  await user.clear(input)
  await user.type(input, '2.5')
  expect(input).toHaveClass('is-invalid')
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // input invalid with more than 10
  await user.clear(input)
  await user.type(input, '20')
  expect(input).toHaveClass('is-invalid')
  expect(scoopsSubtotal).toHaveTextContent('0.00')
})

test('displays image for each topping option from server', async () => {
  render(<Options optionType='toppings' />)

  // find images
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  //  confirm alt text of images
  const toppingImagesTitles = toppingImages.map(el => el.alt)
  expect(toppingImagesTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping'
  ])
})
