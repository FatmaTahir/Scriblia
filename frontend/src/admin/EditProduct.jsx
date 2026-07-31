import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
    tag: "",
    d1: "",
    d2: "",
    d3: "",
    d4: "",
  });

  const [loading, setLoading] = useState(false);

  // Dynamic API Base URL fallback
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5012";

  useEffect(() => {
    fetch(`${baseUrl}/api/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product details");
        return res.json();
      })
      .then((data) => {
        setProduct((prev) => ({
          ...prev,
          ...data,
          // Fallbacks for optional fields to avoid uncontrolled input warnings
          tag: data.tag || "",
          d1: data.d1 || "",
          d2: data.d2 || "",
          d3: data.d3 || "",
          d4: data.d4 || "",
        }));
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id, baseUrl]);

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
      const response = await fetch(`${baseUrl}/api/product/${id}`, {
        method: "PUT",
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
        alert("Product Updated Successfully");
        navigate("/admin/products");
      } else {
        const errorMessage = await response.text();
        alert(`Update Failed: ${errorMessage || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Could not connect to server. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow max-w-xl space-y-4"
      >
        <h1 className="text-3xl font-semibold">Edit Product</h1>

        <p className="text-gray-600">Editing Product ID: {id}</p>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Product Name *
          </label>
          <input
            className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
            placeholder="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Category *
          </label>
          <input
            className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
            placeholder="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Price (Rs) *
            </label>
            <input
              type="number"
              className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
              placeholder="Price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
              placeholder="Quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Image URL *
          </label>
          <input
            className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
            placeholder="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Tag (Optional)
          </label>
          <input
            className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
            placeholder="e.g. SALE, NEW, HOT"
            name="tag"
            value={product.tag}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Product Descriptions
          </label>
          <div className="space-y-2">
            <input
              className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
              placeholder="Product Description - Line 1"
              name="d1"
              value={product.d1}
              onChange={handleChange}
            />
            <input
              className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
              placeholder="Product Description - Line 2"
              name="d2"
              value={product.d2}
              onChange={handleChange}
            />
            <input
              className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
              placeholder="Product Description - Line 3"
              name="d3"
              value={product.d3}
              onChange={handleChange}
            />
            <input
              className="w-full border p-3 rounded focus:outline-none focus:border-pink-500"
              placeholder="Product Description - Line 4"
              name="d4"
              value={product.d4}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 transition-colors text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 mt-4"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;