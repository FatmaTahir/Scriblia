import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // Dynamic API Base URL fallback
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5012";

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          quantity: Number(product.quantity),
        }),
      });

      if (response.ok) {
        alert("Product Added Successfully");

        setProduct({
          name: "",
          category: "",
          price: "",
          quantity: "",
          image: "",
        });
      } else {
        const errorMessage = await response.text();
        alert(`Failed to add product: ${errorMessage || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-semibold mb-8">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow max-w-xl space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            required
            className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            required
            className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (Rs) *
            </label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              value={product.price}
              required
              min="0"
              step="any"
              className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="0"
              value={product.quantity}
              required
              min="0"
              className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL *
          </label>
          <input
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={product.image}
            required
            className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 transition-colors text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;