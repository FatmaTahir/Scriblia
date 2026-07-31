import { Outlet, Link } from "react-router-dom";
import { FaBoxOpen, FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">

        <h1 className="text-3xl font-bold text-pink-500 dancing-script mb-10">
          Scriblia Admin
        </h1>

        <nav className="space-y-4">

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-lg transition"
          >
            <MdDashboard />
            Dashboard
          </Link>


          <Link
            to="/admin/products"
            className="flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-lg transition"
          >
            <FaBoxOpen />
            Products
          </Link>


          <Link
            to="/admin/orders"
            className="flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-lg transition"
          >
            <FaShoppingCart />
            Orders
          </Link>


          <Link
            to="/admin/users"
            className="flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-lg transition"
          >
            <FaUsers />
            Customers
          </Link>

        </nav>

      </aside>


      {/* Page Content */}
      <main className="flex-1 p-8">

        <Outlet />

      </main>

    </div>
  );
};

export default AdminLayout;