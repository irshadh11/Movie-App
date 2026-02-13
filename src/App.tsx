import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home  from './pages/Home'
import MoviesDetails from './pages/MoviesDetails'
import SeatLayout from './pages/SeatLayout'
import Footer from './components/Footer'
import MyBookings from './pages/MyBookings'
import Movies from './pages/Movies'
import Favorite from './pages/Favorite'
import Checkout from './pages/Checkout'

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/movies' element = {<Movies />}/>
        <Route path='/movie/:id' element = {<MoviesDetails />}/>
        <Route path='/mybookings' element = {<MyBookings />}/>
        <Route path='/seatlayout/:id' element = {<SeatLayout />}/>
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path='/favorite' element = {<Favorite />}/>
      </Routes>
    <Footer />

    
    
    </>
  )
}

export default App