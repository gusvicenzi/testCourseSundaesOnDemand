import { render, screen } from '../../../test-utils/testing-library-utils'
import ScoopOption from '../ScoopOption'
import userEvent from '@testing-library/user-event'

test('validate scoop inputs', async () => {
  const user = userEvent.setup()
  render(<ScoopOption />)

  const input = screen.getByRole('spinbutton')

  // input invalid with negative numbers
  await user.clear(input)
  await user.type(input, '-1')
  expect(input).toHaveClass('is-invalid')

  // input invalid with decimal numbers
  await user.clear(input)
  await user.type(input, '2.5')
  expect(input).toHaveClass('is-invalid')

  // input invalid with more than 10
  await user.clear(input)
  await user.type(input, '20')
  expect(input).toHaveClass('is-invalid')
})
