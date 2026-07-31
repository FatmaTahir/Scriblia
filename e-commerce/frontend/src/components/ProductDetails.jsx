import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ReviewForm from "./ReviewForm";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
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

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const IMAGE_SIZE = 470;
const ZOOM_SCALE = 2;
const LENS_SIZE = IMAGE_SIZE / ZOOM_SCALE;

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [relatedProducts, setRelatedProducts] = useState([]);

  const buyNow = () => {
    navigate("/checkout", {
      state: {
        items: [{ ...product, quantity }],
        breadcrumb: [
          { name: "Home", path: "/" },
          { name: product.category, path: `/category/${product.category}` },
          { name: product.name, path: `/product/${product.id}` },
          { name: "Checkout" },
        ],
      },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    fetch(`http://localhost:5012/api/Product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product data unavailable.");
        return res.json();
      })
      .then((data) => {
        setProduct(data);

        fetch(`http://localhost:5012/api/product/related/${data.id}`)
          .then((res) => res.json())
          .then((related) => {
            setRelatedProducts(related);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  // Quantity controls restricted by available backend product stock (product.quantity)
  const handleIncrease = () => {
    if (product && quantity < product.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <h1 className="mt-20 p-10 text-center" style={{ fontFamily: "Playfair Display" }}>
        Loading Product Details...
      </h1>
    );
  }

  if (!product) {
    return (
      <h1 className="mt-20 p-10" style={{ fontFamily: "Playfair Display" }}>
        Product Not Available
      </h1>
    );
  }

  const categoryMap = {
    journals: { name: "Journals & Hobbies", path: "/journals" },
    pens: { name: "Writing Essentials", path: "/pens" },
    artSupplies: { name: "Art Supplies", path: "/artSupplies" },
    stickyItems: { name: "Sticky Items", path: "/stickyItems" },
    organizing: { name: "Organizing", path: "/organizing" },
  };

  const currentCategory = categoryMap[product.category] || { name: product.category, path: "#" };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const lensX = Math.min(Math.max(mouseX - LENS_SIZE / 2, 0), width - LENS_SIZE);
    const lensY = Math.min(Math.max(mouseY - LENS_SIZE / 2, 0), height - LENS_SIZE);
    setLensPos({ x: lensX, y: lensY });
    const x = ((mouseX - left * 0) / width) * 100;
    const y = ((mouseY - top * 0) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setShowZoom(true);
  const handleMouseLeave = () => setShowZoom(false);

  return (
    <div>
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: currentCategory.name, path: currentCategory.path },
          { name: product.name },
        ]}
      />

      <div className="mt-0 p-24 py-0 flex flex-row gap-2">
        <div className="flex gap-5">
          {/* Main Image */}
          <div
            className="relative w-[570px] h-[540px] mr-24 mt-2 overflow-hidden shadow-md cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://placeholder.co/470x470?text=No+Image";
              }}
            />
            <AnimatePresence>
              {showZoom && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute border-2 border-dashed border-black/70 bg-white/10 pointer-events-none"
                  style={{
                    width: `${LENS_SIZE}px`,
                    height: `${LENS_SIZE}px`,
                    left: `${lensPos.x}px`,
                    top: `${lensPos.y}px`,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {showZoom && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute left-[520px] top-5 w-[370px] h-[370px] border shadow-2xl bg-white z-50 pointer-events-none rounded-lg"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${ZOOM_SCALE * 100}% ${ZOOM_SCALE * 100}%`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            )}
          </AnimatePresence>
        </div>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -40 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-4xl font-bold mt-4 dancing-script">{product.name}</h1>

          <div className="flex gap-2"></div>

          <p className="text-md mt-1 text-gray-500 mt-0" style={{ fontFamily: "Playfair Display" }}>
            Rs.{product.price}.00
          </p>

          <p className="mt-1 text-gray-500 text-sm" style={{ fontFamily: "Playfair Display" }}>
            <span style={{ fontFamily: "Playfair Display" }}>Shipping</span> calculated at checkout
          </p>

          <p className="mt-1 text-gray-500 text-sm" style={{ fontFamily: "Playfair Display" }}>
            Quantity {product.quantity > 0 && <span className="text-xs text-gray-400">({product.quantity} available)</span>}
          </p>

          <div className="flex gap-0 items-center">
            <button 
              onClick={handleDecrease} 
              className="border border-black px-3 py-3"
              disabled={quantity <= 1}
            >
              <FiMinus />
            </button>
            <div
              className="border-t border-b border-black px-14 py-3 m-0 text-center"
              style={{ fontFamily: "Playfair Display" }}
            >
              {quantity}
            </div>

            <button 
              onClick={handleIncrease} 
              className={`border border-black font-bold px-3 py-3 ${
                quantity >= product.quantity ? "opacity-40 cursor-not-allowed bg-gray-100" : ""
              }`}
              disabled={quantity >= product.quantity}
            >
              <GoPlus />
            </button>
          </div>

          {quantity >= product.quantity && (
            <p className="text-xs text-red-500 mt-1" style={{ fontFamily: "Playfair Display" }}>
              Maximum available stock reached.
            </p>
          )}

          <motion.button
            whileHover={{ y: product.quantity > 0 ? -4 : 0 }}
            className={`text-white mx-2 px-36 py-3 rounded-2xl text-sm mt-2 shadow-lg ${
              product.quantity <= 0 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-pink-500 hover:bg-pink-600"
            }`}
            style={{ fontFamily: "Playfair Display" }}
            onClick={() => product.quantity > 0 && addToCart(product, quantity)}
            disabled={product.quantity <= 0}
          >
            {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
          </motion.button>

          <motion.button
            onClick={buyNow}
            whileHover={{ y: product.quantity > 0 ? -4 : 0 }}
            className={`mx-2 px-36 py-3 mt-2 rounded-2xl shadow-lg text-sm ${
              product.quantity <= 0
                ? "border border-gray-300 text-gray-400 cursor-not-allowed"
                : "text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white"
            }`}
            style={{ fontFamily: "Playfair Display" }}
            disabled={product.quantity <= 0}
          >
            Buy Now
          </motion.button>

          <ul className="list-disc mx-10 mt-3" style={{ fontFamily: "Playfair Display" }}>
            {product.d1 && <li className="text-black"><span className="text-gray-500">{product.d1}</span></li>}
            {product.d2 && <li className="text-black"><span className="text-gray-500">{product.d2}</span></li>}
            {product.d3 && <li className="text-black"><span className="text-gray-500">{product.d3}</span></li>}
            {product.d4 && <li className="text-black"><span className="text-gray-500">{product.d4}</span></li>}
          </ul>
        </motion.div>
      </div>

      <div className="flex flex-col gap-2 text-2xl m-7 px-20 mx-10" style={{ fontFamily: "Playfair Display" }}>
        <p>Product Reviews</p>
        <div className="flex flex-row gap-3">
          <div className="mt-0 text-black flex" style={{ fontFamily: "Playfair Display" }}>
            ({product.rating})
          </div>
          <div className="text-yellow-500 flex mt-1">{renderStars(product.rating)}</div>
        </div>
        <p
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="underline text-pink-500 cursor-pointer text-sm"
          style={{ fontFamily: "Playfair Display" }}
        >
          {showReviewForm ? "Hide Review Form" : "Write a review"}
        </p>
        {showReviewForm && <ReviewForm closeForm={() => setShowReviewForm(false)} />}
      </div>

      <div className="mt-2 px-10 mb-20">
        <h1 className="text-3xl font-bold text-center mb-8 px-20 dancing-script">
          You may also like
        </h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-20"
        >
          {relatedProducts.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-white shadow-md overflow-hidden hover:shadow-2xl transition-shadow max-h-[420px]"
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="h-64 w-full object-cover cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    e.target.src = "https://placeholder.co/300x200?text=No+Image+Found";
                  }}
                />
                {item.tag && (
                  <motion.span
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    style={{ fontFamily: "Playfair Display" }}
                    className={`absolute top-2 right-2 text-sm px-2 py-1 text-white ${
                      item.tag === "SALE"
                        ? "bg-red-500"
                        : item.tag === "NEW"
                        ? "bg-pink-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.tag}
                  </motion.span>
                )}
              </div>

              <div className="p-1">
                <h2 className="text-lg mb-1 font-semibold text-center dancing-script">
                  {item.name}
                </h2>

                <p style={{ fontFamily: "Playfair Display" }} className="text-gray-700 text-center">
                  Rs.{item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;