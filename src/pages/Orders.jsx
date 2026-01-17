import { useEffect, useState } from "react";
import {Table,Button,Spinner,Alert,Badge,Dropdown,ButtonGroup} from "react-bootstrap";
import {fetchOrders,updateOrderStatus,deleteOrder} from "../services/orderServices";

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
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  } catch {
    setError("Failed to update order status");
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


  return (
    <div className="container mt-4">
      <h2>Orders</h2>

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

                <td>
                  {order.items?.map((item, i) => (
                    <div key={i}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>

                <td>₹{order.totalPrice}</td>

                <td>
                  {order.paymentMethod?.type || "N/A"}
                  <br />
                  <small className="text-muted">
                    {order.paymentMethod?.status}
                  </small>
                </td>

                <td>
                  <Badge
                    bg={
                      order.status === "PENDING"
                        ? "warning"
                        : order.status === "CANCELLED"
                        ? "danger"
                        : "success"
                    }
                  >
                    {order.status}
                  </Badge>
                </td>

                <td>
                  <Dropdown as={ButtonGroup} className="me-2">
                    <Button size="sm" variant="secondary">
                      Change
                    </Button>

                    <Dropdown.Toggle
                      split
                      size="sm"
                      variant="secondary"
                    />

                    <Dropdown.Menu>
                      {["PENDING", "COMPLETED", "CANCELLED"].map(
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
