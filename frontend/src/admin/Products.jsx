import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Dynamic API Base URL fallback
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5012";

  useEffect(() => {
    fetch(`${baseUrl}/api/product`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          console.warn("API response for products was not an array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
        setLoading(false);
      });
  }, [baseUrl]);

  const categoryNames = {
    artSupplies: "Art Supplies",
    stickyItems: "Sticky Items",
    pens: "Pens",
    journals: "Journals",
    organizing: "Organizing",
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseUrl}/api/product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove product from UI state (handles both _id and id)
      setProducts((prev) =>
        prev.filter((product) => (product.id || product._id) !== id)
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-semibold mb-8">Products Management</h1>

      <Link
        to="/admin/add-product"
        className="bg-pink-500 hover:bg-pink-600 transition-colors text-white px-5 py-3 rounded-lg font-medium inline-block"
      >
        + Add Product
      </Link>

      <div className="bg-white mt-8 rounded-xl shadow p-6">
        {loading && <p className="text-gray-500">Loading products...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-gray-500">No products found.</p>
        )}

        {!loading && products.length > 0 && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600 font-semibold">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const productId = product.id || product._id;

                return (
                  <tr key={productId} className="border-b">
                    <td className="p-3 text-sm text-gray-500">{productId}</td>

                    <td className="p-3 font-medium">{product.name}</td>

                    <td className="p-3">
                      {categoryNames[product.category] || product.category}
                    </td>

                    <td className="p-3">Rs {product.price}</td>

                    <td className="p-3">{product.quantity}</td>

                    <td className="p-3">
                      <Link
                        to={`/admin/edit-product/${productId}`}
                        className="text-blue-500 hover:text-blue-700 mr-4 font-medium"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(productId)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;