import { Modal, Form, Button, Card } from "react-bootstrap";

const emptyProduct = {
  name: "",
  image: "",
  materials: [],
  capacities: [],
};

export default function ProductForm({
  show,
  onClose,
  onSave,
  product,
  setProduct,
  editing,
}) {
  const addMaterial = () => {
    setProduct({
      ...product,
      materials: [...product.materials, { name: "", price: "" }],
    });
  };

  const addCapacity = () => {
    setProduct({
      ...product,
      capacities: [
        ...product.capacities,
        { name: "", price: "", dimensions: [] },
      ],
    });
  };

  const addDimension = (capIndex) => {
    const copy = [...product.capacities];
    copy[capIndex].dimensions.push("");
    setProduct({ ...product, capacities: copy });
  };

  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editing ? "Edit Product" : "Add Product"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* PRODUCT DETAILS */}
        <Card className="p-3 mb-3">
          <Form.Group className="mb-2">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              value={product.image}
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
            />
          </Form.Group>
        </Card>

        {/* MATERIALS */}
        <Card className="p-3 mb-3">
          <h5>Materials</h5>

          {product.materials.map((m, i) => (
            <div key={i} className="d-flex gap-2 mb-2">
              <Form.Control
                placeholder="Material"
                value={m.name}
                onChange={(e) => {
                  const copy = [...product.materials];
                  copy[i].name = e.target.value;
                  setProduct({ ...product, materials: copy });
                }}
              />
              <Form.Control
                type="number"
                placeholder="Price"
                value={m.price}
                onChange={(e) => {
                  const copy = [...product.materials];
                  copy[i].price = Number(e.target.value);
                  setProduct({ ...product, materials: copy });
                }}
              />
            </div>
          ))}

          <Button size="sm" onClick={addMaterial}>
            Add Material
          </Button>
        </Card>

        {/* CAPACITIES */}
        <Card className="p-3">
          <h5>Capacities & Dimensions</h5>

          {product.capacities.map((cap, ci) => (
            <Card key={ci} className="p-3 mb-3">
              <div className="d-flex gap-2 mb-2">
                <Form.Control
                  placeholder="Capacity (e.g. 20 Ton)"
                  value={cap.name}
                  onChange={(e) => {
                    const copy = [...product.capacities];
                    copy[ci].name = e.target.value;
                    setProduct({ ...product, capacities: copy });
                  }}
                />
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={cap.price}
                  onChange={(e) => {
                    const copy = [...product.capacities];
                    copy[ci].price = Number(e.target.value);
                    setProduct({ ...product, capacities: copy });
                  }}
                />
              </div>

              <strong>Dimensions</strong>
              {cap.dimensions.map((d, di) => (
                <Form.Control
                  key={di}
                  className="mt-2"
                  placeholder="e.g. 2 x 2 x 2 or Radius 4 x Length 3"
                  value={d}
                  onChange={(e) => {
                    const copy = [...product.capacities];
                    copy[ci].dimensions[di] = e.target.value;
                    setProduct({ ...product, capacities: copy });
                  }}
                />
              ))}

              <Button
                size="sm"
                className="mt-2"
                onClick={() => addDimension(ci)}
              >
                Add Dimension
              </Button>
            </Card>
          ))}

          <Button size="sm" onClick={addCapacity}>
            Add Capacity
          </Button>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onSave}>
          {editing ? "Update Product" : "Save Product"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
