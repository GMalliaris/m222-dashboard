import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SingleProduct from './pages/SingleProduct'
import Best from './pages/Best'
import Worst from './pages/Worst'
import NavigationBar from './components/NavigationBar'
import AllProducts from './pages/AllProducts'

function App() {
  return (
    <div className="xl:flex min-h-[100vh] bg-orange-100">
      <NavigationBar />
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="/products/:productName" element={ <SingleProduct/> } />
        <Route path="/products" element={ <AllProducts/> } />
        <Route path="/best" element={ <Best/> } />
        <Route path="/worst" element={ <Worst/> } />
      </Routes>
    </div>
  )
}

export default App
