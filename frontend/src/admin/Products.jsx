import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("http://localhost:5012/api/product")
            .then(response => response.json())
            .then(data => {

                setProducts(data);
                setLoading(false);

            })
            .catch(error => {

                console.log("Error fetching products:", error);
                setError("Failed to load products");
                setLoading(false);

            });


    }, []);
    const categoryNames = {

        artSupplies: "Art Supplies",
        stickyItems: "Sticky Items",
        pens: "Pens",
        journals: "Journals",
        organizing: "Organizing"

    };

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://localhost:5012/api/product/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            // Remove product from UI
            setProducts(products.filter(product => product.id !== id));

            alert("Product deleted successfully.");
        } catch (error) {
            console.error(error);
            alert("Error deleting product.");
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-3xl font-semibold mb-8">
                Products Management
            </h1>


            <Link
                to="/admin/add-product"
                className="bg-pink-500 text-white px-5 py-3 rounded-lg"
            >
                + Add Product
            </Link>


            <div className="bg-white mt-8 rounded-xl shadow p-6">
                {
                    loading &&
                    <p className="text-gray-500">
                        Loading products...
                    </p>
                }
                {
                    error &&
                    <p className="text-red-500">
                        {error}
                    </p>
                }
                {
                    !loading && products.length === 0 &&
                    <p className="text-gray-500">
                        No products found.
                    </p>
                }
                <table className="w-full text-left">

                    <thead>
                        <tr className="border-b">
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>


                    <tbody>

                        {
                            products.map(product => (

                                <tr key={product.id} className="border-b">

                                    <td className="p-3">
                                        {product.id}
                                    </td>

                                    <td className="p-3">
                                        {product.name}
                                    </td>

                                    <td className="p-3">
                                        {
                                            categoryNames[product.category] || product.category
                                        }
                                    </td>

                                    <td className="p-3">
                                        Rs {product.price}
                                    </td>

                                    <td className="p-3">
                                        {product.quantity}
                                    </td>


                                    <td className="p-3">

                                        <Link
                                            to={`/admin/edit-product/${product.id}`}
                                            className="text-blue-500 mr-4"
                                        >
                                            Edit
                                        </Link>


                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }


                    </tbody>

                </table>


            </div>

        </div>
    );
};


export default Products;