import Home from './components/Home/Home'
import Login from './components/Login/login'
import Signup from './components/Signup/signup'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import SignupSuccess from './components/Signupsuccess/signupsuccess'
import SellerPage from './components/Seller/seller'
import ProductPage from './components/Product/product'
import ResetPassword from './components/ResetPassword/resetpassword'
import ForgotPassword from './components/Forgotpassword/forgotpassword'
import GoToCart from './components/CartPage/cartpage'
import MerchantSignup from './components/MerchantSignup/merchantsignup'
import OrderForm from './components/Orderform/orderform'
import AdminPage from './components/AdminPage/adminpage'
import OrderDetailsPageAdmin from './components/OrderdetailsPageAdmin/orderdetailspageadmin'
import ManageProductPageAdmin from './components/ManageProductsPageAdmin/manageproductpageadmin'
import ProductRequestPage from './components/ProductRequestsPage/productrequestpage'

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home/>,
  //   },
  // ]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupsuccess" element={<SignupSuccess />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/gotocart" element={<GoToCart />} />
        <Route path="/signupmerchant" element={<MerchantSignup />} />
        <Route path="/orderform" element={<OrderForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/orderdetailspageadmin" element={<OrderDetailsPageAdmin />} />
        <Route path="/manageproductspageadmin" element={<ManageProductPageAdmin />} />
        <Route path="/productrequestpage" element={<ProductRequestPage />} />
      </Route>
    )
  )
  return (
    <>
      {/* <Home /> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
