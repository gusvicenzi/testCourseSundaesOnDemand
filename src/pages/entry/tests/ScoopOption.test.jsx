import { render, screen } from '../../../test-utils/testing-library-utils'
import ScoopOption from '../ScoopOption'
import userEvent from '@testing-library/user-event'

test('validate scoop inputs', async () => {
  const user = userEvent.setup()
  render(<ScoopOption />)

  const input = screen.getByRole('spinbutton')

  await user.clear(input)
  await user.type(input, '-1')

  expect(input).toHaveClass('is-invalid')
})
