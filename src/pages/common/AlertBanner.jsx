import { Alert } from 'react-bootstrap'

export default function AlertBanner({ message, variant }) {
  const alertMsg =
    message || 'An unexpected error ocurred. Please try again later.'
  const alertVariant = variant || 'danger'

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMsg}
    </Alert>
  )
}
