import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SummaryForm } from '../SummaryForm'

describe('Summary form', () => {
  test('checkbox is unchecked by default', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions'
    })

    expect(checkbox).not.toBeChecked()

    const button = screen.getByRole('button', { name: 'Confirm order' })
    expect(button).toBeDisabled()
  })

  test('checkbox enables form button, unchecking again disables button', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions'
    })
    const button = screen.getByRole('button', { name: 'Confirm order' })

    await user.click(checkbox)
    expect(button).toBeEnabled()

    await user.click(checkbox)
    expect(button).toBeDisabled()
  })

  test('popover responds to hover', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    )
    expect(nullPopover).not.toBeInTheDocument()

    // popover appears on mouseover of checkbox label
    const termAndConditions = screen.getByText(/terms and conditions/i)
    await user.hover(termAndConditions)
    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    // popover disappears when we mouse out
    await user.unhover(termAndConditions)
    expect(popover).not.toBeInTheDocument()
  })
})
