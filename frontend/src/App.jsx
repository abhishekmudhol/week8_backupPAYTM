import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import Success from './pages/Success'
import Update from './pages/Update'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/send' element={<SendMoney/>}/>
        <Route path='/error' element={<Error/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/update' element={<Update/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
