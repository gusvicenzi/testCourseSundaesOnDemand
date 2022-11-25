import { OrderDetailsProvider } from './context/OrderDetails'
import { Container } from 'react-bootstrap'
import OrderEntry from './pages/entry/OrderEntry'

import './App.css'

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  )
}

export default App

