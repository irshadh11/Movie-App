import { Route, Routes } from 'react-router-dom'
import Home  from './pages/Home'
import MoviesDetails from './pages/MoviesDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Movies from './pages/Movies'
import Favorite from './pages/Favorite'
import MainLayout from './components/Mainlayout'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <Toaster position="top-center" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element = {<Home />}/>
          <Route path='/movies' element = {<Movies />}/>
          <Route path='/movie/:id' element = {<MoviesDetails />}/>
          <Route path='/mybookings' element = {<MyBookings />}/>
          <Route path='/seatlayout/:id' element = {<SeatLayout />}/>
          <Route path='/favorite' element = {<Favorite />}/>
      </Route>
      </Routes>
    </>

  )
}

export default App;