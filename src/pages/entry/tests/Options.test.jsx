// import { render, screen } from '@testing-library/react'
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
