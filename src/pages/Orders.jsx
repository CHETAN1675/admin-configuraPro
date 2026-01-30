import { useEffect, useState } from "react";
import {fetchOrders,updateOrderStatus,deleteOrder,updatePaymentStatus} from "../services/orderServices";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchOrders();
      setOrders(data);
    } catch {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (userKey, orderId, status) => {
    await updateOrderStatus(userKey, orderId, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handlePaymentChange = async (userKey, orderId, status) => {
    await updatePaymentStatus(userKey, orderId, status);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              paymentMethod: {
                ...o.paymentMethod,
                status,
              },
            }
          : o
      )
    );
  };

  const handleDelete = async (userKey, orderId) => {
    if (!window.confirm("Delete this order?")) return;
    await deleteOrder(userKey, orderId);
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Orders
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-200 px-4 py-3">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-slate-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className= " hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-800 dark:text-slate-400">
                    {order.id.slice(-6)}
                  </td>

                  <td className="px-4 py-3 text-slate-700 dark:text-slate-400">
                    {order.userEmail}
                  </td>

                  {/* ITEMS */}
                  <td className="px-4 py-3 space-y-3">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        {item.product?.image && (
                          <img
                            src={item.product.image}
                            alt=""
                            className="h-12 w-12 rounded-lg border object-contain bg-white"
                          />
                        )}

                        <div className="text-xs">
                          <div className="font-semibold text-slate-900 dark:text-sky-400">
                            {item.product?.name}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400">
                            Capacity: {item.capacity || "-"} <br />
                            Material: {item.material || "-"} <br />
                            Dimensions:{" "}
                            {item.dimensions
                              ? Object.values(item.dimensions).join("×")
                              : "-"}
                          </div>
                          <div className="font-semibold text-slate-800 dark:text-slate-400">
                            ₹{item.totalPrice}
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-3 font-semibold dark:text-slate-400">
                    ₹{order.totalPrice}
                  </td>

                  {/* PAYMENT */}
                  <td className="px-4 py-3 space-y-1">
                    <div className="text-xs text-slate-500">
                      {order.paymentMethod?.type || "N/A"}
                    </div>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium
                        ${
                          order.paymentMethod?.status === "PAID"
                            ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"
                            : order.paymentMethod?.status === "FAILED"
                            ? "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100"
                            : "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                        }`}
                    >
                      {order.paymentMethod?.status || "PENDING"}
                    </span>

                    <select
                      onChange={(e) =>
                        handlePaymentChange(
                          order.userKey,
                          order.id,
                          e.target.value
                        )
                      }
                      className="mt-1 w-full rounded-md border text-slate-400 border-slate-300 dark:border-slate-400 bg-transparent px-2 py-1 text-xs"
                    >
                      {["PENDING", "PAID", "FAILED"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* ORDER STATUS */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium
                        ${
                          order.status === "CANCELLED"
                            ? "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100"
                            : order.status === "CREATED"
                            ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                            : "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3 text-right space-x-2">
                    <select
                      onChange={(e) =>
                        handleStatusChange(
                          order.userKey,
                          order.id,
                          e.target.value
                        )
                      }
                      className="rounded-md border  text-cyan-400 border-slate-700 dark:border-slate-600 bg-transparent px-2 py-1 text-xs"
                    >
                      {["CREATED", "COMPLETED", "CANCELLED"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() =>
                        handleDelete(order.userKey, order.id)
                      }
                      className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/20 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
