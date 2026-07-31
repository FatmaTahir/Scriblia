import React, { useEffect, useState } from "react";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);


    useEffect(() => {

        const fetchOrders = async () => {

            const token = localStorage.getItem("authToken");

            if (!token) {
                setError("You are not logged in.");
                setLoading(false);
                return;
            }

            try {

                const response = await fetch(
                    "http://localhost:5012/api/orders",
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );


                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }


                const data = await response.json();

                setOrders(data);
                setLoading(false);


            } catch (error) {

                console.log(error);
                setError("Failed to load orders");
                setLoading(false);

            }

        };


        fetchOrders();


    }, []);



    return (

        <div className="min-h-screen bg-gray-100 p-10">


            <h1 className="text-3xl font-semibold mb-8">
                Orders Management
            </h1>



            <div className="bg-white rounded-xl shadow p-6">


                {loading && (
                    <p className="text-gray-500">
                        Loading orders...
                    </p>
                )}



                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}



                {!loading && orders.length > 0 && (

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b">

                                <th className="p-3">
                                    Order ID
                                </th>

                                <th className="p-3">
                                    Customer
                                </th>

                                <th className="p-3">
                                    Date
                                </th>

                                <th className="p-3">
                                    Amount
                                </th>

                                <th className="p-3">
                                    Status
                                </th>

                                <th className="p-3">
                                    Action
                                </th>

                            </tr>

                        </thead>



                        <tbody>


                            {orders.map((order)=>(

                                <tr
                                    key={order.id}
                                    className="border-b"
                                >

                                    <td className="p-3">
                                        #{order.id}
                                    </td>


                                    <td className="p-3">
                                        {order.customer}
                                    </td>


                                    <td className="p-3">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>


                                    <td className="p-3">
                                        Rs {order.amount}
                                    </td>


                                    <td className="p-3">

                                        <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-600">

                                            {order.status}

                                        </span>

                                    </td>



                                    <td className="p-3">

                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >

                                            View

                                        </button>

                                    </td>


                                </tr>


                            ))}


                        </tbody>


                    </table>


                )}


            </div>



            {/* ORDER DETAILS MODAL */}

            {selectedOrder && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


                    <div className="bg-white rounded-xl shadow-xl p-8 w-[450px]">


                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-xl font-semibold">
                                Order Details
                            </h2>


                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-500 hover:text-black text-xl"
                            >
                                ✕
                            </button>

                        </div>



                        <div className="space-y-3 text-sm">


                            <p>
                                <b>Order ID:</b> #{selectedOrder.id}
                            </p>


                            <p>
                                <b>Customer:</b> {selectedOrder.customer}
                            </p>


                            <p>
                                <b>Phone:</b> {selectedOrder.phoneNumber}
                            </p>


                            <p>
                                <b>Address:</b> {selectedOrder.address}
                            </p>


                            <p>
                                <b>City:</b> {selectedOrder.city}
                            </p>


                            <p>
                                <b>Payment:</b> {selectedOrder.paymentMethod}
                            </p>


                            <p>
                                <b>Total Amount:</b> Rs {selectedOrder.amount}
                            </p>


                            <p>
                                <b>Status:</b> {selectedOrder.status}
                            </p>


                        </div>



                    </div>


                </div>

            )}



        </div>

    );

};


export default Orders;