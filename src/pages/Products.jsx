import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Alert, Spinner, Image } from "react-bootstrap";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../services/ProductService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setError("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateProduct(editingId, form);
      } else {
        await addProduct(form);
      }
      setForm({ name: "", price: "", description: "", image: "" });
      setEditingId(null);
      setShowModal(false);
      loadProducts();
    } catch {
      setError("Failed to save product");
    }
  };

  const handleEdit = (prod) => {
    setForm({ name: prod.name, price: prod.price, description: prod.description, image: prod.image || "" });
    setEditingId(prod.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      setError("Failed to delete product");
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container mt-3">
      <h2>Products</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button className="mb-3" onClick={() => setShowModal(true)}>Add Product</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="5" className="text-center">No products found</td></tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.image ? <Image src={p.image} alt={p.name} width={50} height={50} rounded /> : "No image"}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(p)} className="me-2">Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://example.com/image.jpg" />
            </Form.Group>
            <Button onClick={handleSave} className="mt-2">{editingId ? "Update" : "Add"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
