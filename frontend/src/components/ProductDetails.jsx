import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { motion } from "framer-motion"; 
import ReviewForm from "./ReviewForm";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} />);
    } else if (i - rating < 1) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return stars;
};


const ProductDetails = () => {
  
  const { id } = useParams();
  const {addToCart} = useCart();
  const navigate = useNavigate();
  const buyNow = ()=>{
   navigate("/checkout", {
  state: {
    items: [
      {
        ...product,
        quantity,
      },
    ],
    breadcrumb: [
      { name: "Home", path: "/" },
      {
        name: product.category,
        path: `/category/${product.category}`,
      },
      {
        name: product.name,
        path: `/product/${product.id}`,
      },
      { name: "Checkout" },
    ],
  },
});
}
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5012/api/Product/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product data unavailable.");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return <h1 className="mt-20 p-10 text-center" style={{ fontFamily: "Playfair Display" }}>Loading Product Details...</h1>;
  }

  if (!product) {
    return <h1 className="mt-20 p-10" style={{ fontFamily: "Playfair Display" }}>Product Not Available</h1>;
  }

const categoryMap = {
  journals: {
    name: "Journals & Hobbies",
    path: "/journals",
  },

  pens: {
    name: "Writing Essentials",
    path: "/pens",
  },

  artSupplies: {
    name: "Art Supplies",
    path: "/artSupplies",
  },

  stickyItems: {
    name: "Sticky Items",
    path: "/stickyItems",
  },

  organizing: {
    name: "Organizing",
    path: "/organizing",
  },
};

const currentCategory = categoryMap[product.category];

  return (
    <div>
      
  <Breadcrumb
    items={[
      {
        name: "Home",
        path: "/",
      },
      {
        name: currentCategory.name,
        path: currentCategory.path,
      },
      {
        name: product.name,
      },
    ]}
  />

      <div className="mt-0 p-10 py-0  flex flex-row gap-6">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-[470px]  h-full mx-20  shadow-md hover:shadow-lg cursor-pointer transition-shadow"
          onError={(e) => {
            e.target.src = "https://placeholder.co/470x470?text=No+Image+Available";
          }}
        />
        
        <motion.div  
          whileInView={{ opacity: 1, y: 0 }} 
          initial={{ opacity: 0, y: -40 }}  
          viewport={{ once: true }} 
          transition={{ duration: 1 }} 
          className="flex flex-col gap-1"
        >
          <h1 className="text-4xl font-bold mt-4 dancing-script">{product.name} </h1>
          
          <div className="flex gap-2"></div>
          
          <p className="text-md mt-1  text-gray-500 mt-0" style={{ fontFamily: "Playfair Display" }}> Rs.{product.price}.PKR</p>
          
          <p className="mt-1 text-gray-500 text-sm" style={{ fontFamily: "Playfair Display" }}>
            <span className="underline cursor-pointer " style={{ fontFamily: "Playfair Display" }}>Shipping</span> calculated at checkout
          </p>
          
          <p className=" mt-1 text-gray-500 text-sm" style={{ fontFamily: "Playfair Display" }}>Quantity</p>
          
          <div className="flex gap-0">
            <button onClick={handleIncrease} className="border   border-black font-bold px-3"><GoPlus></GoPlus></button>
            <div className="border  border-black  px-14 py-3 m-0" style={{ fontFamily: "Playfair Display" }}>{quantity}</div>
            <button onClick={handleDecrease} className="border   border-black px-3"><FiMinus /></button>
          </div>
          
          <motion.button 
            whileHover={{ y: -4 }} 
            className="text-white bg-pink-500 mx-2 px-36 py-3 rounded-2xl text-sm hover:bg-pink-600 mt-2 shadow-lg " 
            style={{ fontFamily: "Playfair Display" }}
            onClick={()=>addToCart(product,quantity)}
          >
            Add to Cart
          </motion.button>
          
          <motion.button  
            onClick={buyNow}
            whileHover={{ y: -4 }} 
            className="text-pink-500 border border-pink-500 mx-2 px-36 py-3 mt-2 rounded-2xl shadow-lg text-sm hover:bg-pink-500 hover:text-white mt-1 " 
            style={{ fontFamily: "Playfair Display" }}
          >
            Buy Now
          </motion.button>
          
          <ul className="list-disc mx-10 mt-3" style={{ fontFamily: "Playfair Display" }}>
            <li className=" text-black"><span className="text-gray-500" >{product.d1}</span> </li>
            <li className=" text-black"><span className="text-gray-500" >{product.d2}</span> </li>
            <li className=" text-black"><span className="text-gray-500" >{product.d3}</span> </li>
            <li className=" text-black"><span className="text-gray-500" >{product.d4}</span> </li>
          </ul>
        </motion.div>
      </div>

      <div className="flex flex-col gap-2 text-2xl m-7 px-20  mx-10" style={{ fontFamily: "Playfair Display" }}>
        <p>Product Reviews</p>
        <div className="flex flex-row gap-3">
          <div className="mt-0 text-black flex " style={{ fontFamily: "Playfair Display" }}>({product.rating})  </div>
          <div className="text-yellow-500 flex mt-1">{renderStars(product.rating)}  </div>
        </div>
        <p
    onClick={() => setShowReviewForm(!showReviewForm)}
    className="underline text-pink-500 cursor-pointer text-sm">
    {showReviewForm ? "Hide Review Form" : "Write a review"}
</p>
{showReviewForm && <ReviewForm />}
      </div>

      <div className="flex flex-col ">
        <h1 className="text-black text-2xl mx-10 px-20 " style={{ fontFamily: "Playfair Display" }}>You may also like</h1>
      </div>
    </div>
  );
};

export default ProductDetails;