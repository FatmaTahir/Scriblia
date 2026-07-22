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
        <ViewTop />
        <Navbar />

        <Routes>
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
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;