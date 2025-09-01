import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter,Routes,Route,NavLink } from 'react-router-dom'
import AddProduct from './Components/products/AddProduct'
import Product from './Components/products/Product'
import ShopPage from './Components/ShopPage'
import Login from './Components/Login/Login'
import AdminDashboard from './Components/Admin/AdminDashbord'
import UserDashboard from './Components/User/UserDashboard'
import Error404 from './Components/Errors/Error404'
// import UpdateProduct from './Components/products/UpdateProduct'

const App = () => {
  return (
    <>
    <BrowserRouter>
      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Product Recomandation System</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <NavLink to="/" className="nav-link">Home</NavLink>
      </li>
      <li class="nav-item">
        <NavLink to="/register" className="nav-link">Register</NavLink>
      </li>
      <li class="nav-item">
        <NavLink to="/login" className="nav-link">Login</NavLink>
      </li>
      
    </ul>
  </div>
</nav> */}
    <Routes>
      <Route path="/" element={<ShopPage></ShopPage>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/adminDashbord" element={<AdminDashboard></AdminDashboard>} />
      <Route path="/addProducts" element={<AddProduct></AddProduct>} />
      <Route path="/viewProducts" element={<Product></Product>} />
      <Route path="/userDashbord" element={<UserDashboard></UserDashboard>} />
      {/* <Route path="/updateProduct" element={<UpdateProduct></UpdateProduct>} /> */}




      <Route path="*" element={<Error404></Error404>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
