import { useEffect, useState } from "react";
import { Row, Col, Card, Table, Badge, Spinner } from "react-bootstrap";
import { fetchOrders } from "../services/orderServices";
import { fetchProducts } from "../services/productService";

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

  if (loading) return <Spinner className="m-4" />;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "PENDING").length;
  const totalRevenue = orders
    .filter(o => o.status === "COMPLETED")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const recentOrders = [...orders]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <Row className="mb-4">
        <Col md={3}>
          <Card body>
            <h6>Total Orders</h6>
            <h3>{totalOrders}</h3>
          </Card>
        </Col>

        <Col md={3}>
          <Card body>
            <h6>Pending Orders</h6>
            <h3>{pendingOrders}</h3>
          </Card>
        </Col>

        <Col md={3}>
          <Card body>
            <h6>Total Products</h6>
            <h3>{productsCount}</h3>
          </Card>
        </Col>

        <Col md={3}>
          <Card body>
            <h6>Total Revenue</h6>
            <h3>₹{totalRevenue}</h3>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header>Recent Orders</Card.Header>
        <Card.Body>
          <Table size="sm" responsive>
            <thead>
              <tr>
                <th>Order</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id.slice(-6)}</td>
                  <td>{order.userEmail}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <Badge bg={
                      order.status === "PENDING"
                        ? "warning"
                        : order.status === "CANCELLED"
                        ? "danger"
                        : "success"
                    }>
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
