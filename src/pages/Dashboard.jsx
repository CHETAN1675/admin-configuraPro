
import { useEffect, useState } from "react";
import { fetchOrders } from "../services/orderServices";
import { fetchProducts } from "../services/productService";
import { FaShoppingCart, FaHourglassHalf, FaBoxOpen, FaRupeeSign } from "react-icons/fa";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const ordersData = await fetchOrders();
      const products = await fetchProducts();
      setOrders(ordersData);
      setProductsCount(products.length);
      setLoading(false);
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "PENDING").length;
  const totalRevenue = orders
    .filter(o => o.status === "COMPLETED")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const recentOrders = [...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

  // Modern stats with gradient and icons
  const stats = [
    { 
      label: "Total Orders", 
      value: totalOrders, 
      color: "bg-gradient-to-r from-blue-500 to-blue-700",
      icon: <FaShoppingCart className="h-8 w-8 text-white" />
    },
    { 
      label: "Pending Orders", 
      value: pendingOrders, 
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      icon: <FaHourglassHalf className="h-8 w-8 text-white" />
    },
    { 
      label: "Total Products", 
      value: productsCount, 
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      icon: <FaBoxOpen className="h-8 w-8 text-white" />
    },
    { 
      label: "Total Revenue", 
      value: `₹${totalRevenue}`, 
      color: "bg-gradient-to-r from-green-500 to-green-700",
      icon: <FaRupeeSign className="h-8 w-8 text-white" />
    },
  ];

  const statusStyles = {
    CREATED: "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100 font-semibold",
    COMPLETED: "bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-100 font-semibold",
    CANCELLED: "bg-red-300 text-red-800 dark:bg-red-600 dark:text-red-100 font-semibold",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`relative rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ${stat.color} text-white p-6`}
          >
            <div className="absolute top-0 right-0 mt-3 mr-3 opacity-20 text-5xl">
              {stat.icon}
            </div>
            <p className="text-sm font-medium">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-600">
            Recent Orders
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-slate-600 dark:text-slate-300">
                  Order
                </th>
                <th className="px-6 py-3 text-left font-amedium text-slate-600 dark:text-slate-300">
                  User
                </th>
                <th className="px-6 py-3 text-left font-medium text-slate-600 dark:text-slate-300">
                  Total
                </th>
                <th className="px-6 py-3 text-left font-medium text-slate-600 dark:text-slate-300">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-400 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-3 font-mono font-semibold text-slate-800 dark:text-slate-400">
                    {order.id.slice(-6)}
                  </td>
                  <td className="px-6 py-3 text-slate-700 dark:text-slate-400">
                    {order.userEmail}
                  </td>
                  <td className="px-6 py-3 text-slate-800 dark:text-slate-400 font-semibold">
                    ₹{order.totalPrice}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
