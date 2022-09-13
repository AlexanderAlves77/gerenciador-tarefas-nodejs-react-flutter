import { Routes, Route } from 'react-router-dom'
import "./styles/app.scss"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { useState } from 'react'

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))

  return (
    <Routes>
      {!accessToken ?
        <Route path="*">
          <Login setAccessToken={setAccessToken} />
        </Route>
        :
        <Route path="*">
          <Home setAccessToken={setAccessToken} />
        </Route>
      }
    </Routes>

  )
}

export default App
