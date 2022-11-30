// import { render, screen, waitFor } from '@testing-library/react'
import {
  render,
  screen,
  waitFor
} from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import userEvent from '@testing-library/user-event'

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  )

  render(<OrderEntry />)
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert')

    expect(alerts).toHaveLength(2)
  })
})

test('disable order button if no scoops are ordered', async () => {
  const user = userEvent.setup()
  render(<OrderEntry />)

  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' })
  expect(orderButton).toBeDisabled()

  const vanillaScoop = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  })

  await user.clear(vanillaScoop)
  await user.type(vanillaScoop, '1')
  expect(orderButton).toBeEnabled()
  // clear scoops
  await user.clear(vanillaScoop)
  await user.type(vanillaScoop, '0')

  expect(orderButton).toBeDisabled()
})
