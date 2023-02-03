
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AppNavbar from './components/AppNavbar'

import LoadingScreen from './components/LoadingScreen'

import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './pages/Home'
import Login from './pages/Login'

import ProductsList from './pages/ProductsList'

import Purchases from './pages/Purchases'





function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        <AppNavbar />
        {isLoading && <LoadingScreen />}
        <Container className='my-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductsList />} />
            <Route path='/login' element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases />} />
            </Route>
          </Routes>
        </Container>
      </HashRouter>


    </div>
  )
}

export default App
