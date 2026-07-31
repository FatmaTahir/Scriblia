import { useRef } from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ViewTop from './components/ViewTop';
import Main from './components/Main';
import Category from './components/Category';
import Featured from './components/Featured';
import Journals from "./components/Journals";
import Pens from "./components/Pens";
import Organizing from "./components/Organizing";
import ArtSupplies from './components/ArtSupplies';
import StickyItems from './components/StickyItems';
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import CheckoutSection from "./components/CheckoutSection";
import Dashboard from "./admin/Dashboard";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import Products from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import Orders from "./admin/Orders";
import Users from "./admin/Users";

function HomePage() {
  const categoryRef = useRef(null);

  const handleScrollToCategories = () => {
    setTimeout(() => {
      categoryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 50); 
  };

  return (
    <>
      <Main onShopNowClick={handleScrollToCategories} />
      <Category sectionRef={categoryRef} />
      <Featured />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        

        <Routes>

  {/* Customer Pages */}
  <Route element={<CustomerLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/category" element={<Category />} />
    <Route path="/checkout" element={<CheckoutSection />} />
    <Route path="/journals" element={<Journals />} />
    <Route path="/pens" element={<Pens />} />
    <Route path="/organizing" element={<Organizing />} />
    <Route path="/artSupplies" element={<ArtSupplies />} />
    <Route path="/stickyItems" element={<StickyItems />} />
    <Route path="/product/:id" element={<ProductDetails />} />
  </Route>

  {/* Admin Pages */}

  <Route 
 path="/admin/login" 
 element={<AdminLogin />} 
/>
  <Route element={<AdminLayout />}>

    <Route 
       path="/admin/dashboard" 
       element={<Dashboard />} 
    />

    <Route 
path="/admin/products" 
element={<Products/>}
/>


<Route
path="/admin/add-product"
element={<AddProduct/>}
/>


<Route
path="/admin/edit-product/:id"
element={<EditProduct/>}
/>
<Route
path="/admin/orders"
element={<Orders/>}
/>


<Route
path="/admin/users"
element={<Users/>}
/>
</Route>


</Routes>

       
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;