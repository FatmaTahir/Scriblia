import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Products",
      value: 0,
      icon: <FaBoxOpen className="text-3xl text-pink-500" />,
    },
    {
      title: "Total Orders",
      value: 0,
      icon: <FaShoppingCart className="text-3xl text-blue-500" />,
    },
    {
      title: "Customers",
      value: 0,
      icon: <FaUsers className="text-3xl text-green-500" />,
    },
    {
      title: "Revenue",
      value: "Rs. 0",
      icon: <FaDollarSign className="text-3xl text-yellow-500" />,
    },
  ]);

  const [recentOrders, setRecentOrders] = useState([]);

  // Dynamic API Base URL fallback
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5012";

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("authToken");

      try {
        // PRODUCTS
        const productResponse = await fetch(`${baseUrl}/api/product`);
        const productsData = await productResponse.json();
        const products = Array.isArray(productsData) ? productsData : [];

        // ORDERS
        const orderResponse = await fetch(`${baseUrl}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ordersData = await orderResponse.json();
        const orders = Array.isArray(ordersData) ? ordersData : [];

        // Calculate revenue
        const totalRevenue = orders.reduce(
          (sum, order) => sum + (Number(order.amount) || 0),
          0
        );

        setStats([
          {
            title: "Total Products",
            value: products.length,
            icon: <FaBoxOpen className="text-3xl text-pink-500" />,
          },
          {
            title: "Total Orders",
            value: orders.length,
            icon: <FaShoppingCart className="text-3xl text-blue-500" />,
          },
          {
            title: "Customers",
            value: "-",
            icon: <FaUsers className="text-3xl text-green-500" />,
          },
          {
            title: "Revenue",
            value: `Rs. ${totalRevenue.toLocaleString()}`,
            icon: <FaDollarSign className="text-3xl text-yellow-500" />,
          },
        ]);

        // Latest 4 orders
        setRecentOrders(orders.slice(0, 4));
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchDashboardData();
  }, [baseUrl]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-10 dancing-script">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>

        <p className="text-gray-500 mb-8">Welcome back, Admin 👋</p>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{item.title}</p>

                  <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
                </div>

                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* RECENT ACTIVITY */}
        <div className="mt-10 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-5">Recent Activity</h2>

          <div className="space-y-4">
            {recentOrders.length === 0 && (
              <p className="text-gray-500">No recent activity</p>
            )}

            {recentOrders.map((order) => (
              <div key={order.id || order._id} className="border-b pb-3">
                📦 New order received from{" "}
                <b>{order.customer || order.fullName || "Customer"}</b> — Rs{" "}
                {order.amount}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;