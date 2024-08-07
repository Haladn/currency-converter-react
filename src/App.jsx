import { useState } from 'react'
import CurrencyConverter  from "./components/CurrencyConverter"
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <CurrencyConverter />
    </div>
  )
}

export default App
