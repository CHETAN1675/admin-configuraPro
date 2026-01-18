import { Table, Button, Image } from "react-bootstrap";

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Materials</th>
          <th>Capacities</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              No products found
            </td>
          </tr>
        ) : (
          products.map((p) => (
            <tr key={p.id}>
              <td>
                {p.image ? (
                  <Image src={p.image} width={60} rounded />
                ) : (
                  "—"
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.materials.map((m) => m.name).join(", ")}</td>
              <td>{p.capacities.map((c) => c.name).join(", ")}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
