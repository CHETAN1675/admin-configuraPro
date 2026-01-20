import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Spinner,
  Alert,
  Badge,
  Dropdown,
  ButtonGroup,
  Image,
} from "react-bootstrap";
import {
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
  updatePaymentStatus,
} from "../services/orderServices";

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
    try {
      await updateOrderStatus(userKey, orderId, status);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status } : o
        )
      );
    } catch {
      setError("Failed to update order status");
    }
  };

  const handlePaymentChange = async (userKey, orderId, status) => {
    try {
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
    } catch {
      setError("Failed to update payment status");
    }
  };

  const handleDelete = async (userKey, orderId) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrder(userKey, orderId);
      setOrders((prev) =>
        prev.filter((o) => o.id !== orderId)
      );
    } catch {
      setError("Failed to delete order");
    }
  };

  if (loading) return <Spinner className="mt-4" />;

  return (
    <div className="container mt-4">
      <h2>Orders (Admin)</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Items</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userEmail}</td>

                {/* ITEMS */}
                <td>
                  {order.items?.map((item, i) => {
                    const d = item.dimensions || {};
                    const dimText =
                      d.width && d.height && d.depth
                        ? `${d.width}×${d.height}×${d.depth}`
                        : "-";

                    return (
                      <div
                        key={i}
                        className="d-flex gap-2 mb-2 align-items-start"
                      >
                        {item.product?.image && (
                          <Image
                            src={item.product.image}
                            rounded
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "contain",
                            }}
                          />
                        )}
                        <div>
                          <strong>
                            {item.product?.name || "Product"}
                          </strong>
                          <div className="small text-muted">
                            Capacity: {item.capacity || "-"} <br />
                            Material: {item.material || "-"} <br />
                            Dimensions: {dimText} <br />
                            Add-ons:{" "}
                            {item.addOns?.length
                              ? item.addOns.join(", ")
                              : "-"}
                          </div>
                          <div className="fw-bold">
                            ₹{item.totalPrice}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </td>

                <td>₹{order.totalPrice}</td>

               {/* PAYMENT */}
               <td>
                <div className="mb-1">
                 {order.paymentMethod?.type || "N/A"}
                </div>

               {/* Payment Status Badge */}
                <Badge
                 className="mb-2"
                 bg={
                  order.paymentMethod?.status === "PAID"
                  ? "success"
                  : order.paymentMethod?.status === "FAILED"
                  ? "danger"
                : "warning"
                    }
                >
              {order.paymentMethod?.status || "PENDING"}
               </Badge>

              {/* Change Payment Status */}
               <Dropdown className="mt-1">
                <Dropdown.Toggle
                 size="sm"
                 variant="outline-secondary"
                 >
                 Change
                </Dropdown.Toggle>

              <Dropdown.Menu>
               {["PENDING", "PAID", "FAILED"].map((status) => (
               <Dropdown.Item
                 key={status}
                 onClick={() =>
                  handlePaymentChange(
                 order.userKey,
                 order.id,
                 status
                 )
                 }
                 >
                  {status}
                 </Dropdown.Item>
                 ))}
                 </Dropdown.Menu>
               </Dropdown>
          </td>


                {/* ORDER STATUS */}
                <td>
                  <Badge
                    bg={
                      order.status === "CANCELLED"
                        ? "danger"
                        : order.status === "CREATED"
                        ? "warning"
                        : "success"
                    }
                  >
                    {order.status}
                  </Badge>
                </td>

                {/* ACTIONS */}
                <td>
                  <Dropdown as={ButtonGroup} className="me-2">
                    <Button size="sm" variant="secondary">
                      Change
                    </Button>
                    <Dropdown.Toggle split size="sm" />

                    <Dropdown.Menu>
                      {["CREATED", "COMPLETED", "CANCELLED"].map(
                        (status) => (
                          <Dropdown.Item
                            key={status}
                            onClick={() =>
                              handleStatusChange(
                                order.userKey,
                                order.id,
                                status
                              )
                            }
                          >
                            {status}
                          </Dropdown.Item>
                        )
                      )}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      handleDelete(order.userKey, order.id)
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
