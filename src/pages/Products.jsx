import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const emptyProduct = {
  name: "",
  image: "",
  materials: [],
  capacities: [],
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState(emptyProduct);

const load = async () => {
  const data = await fetchProducts();

  const normalized = data.map((p) => ({
    ...p,
    materials: Array.isArray(p.materials)
      ? p.materials
      : Object.entries(p.materials || {}).map(
          ([name, price]) => ({ name, price })
        ),

    capacities: Array.isArray(p.capacities)
      ? p.capacities
      : Object.entries(p.capacities || {}).map(
          ([name, value]) => ({
            name,
            price: value.price || 0,
            dimensions: value.dimensions || [],
          })
        ),
  }));

  setProducts(normalized);
};


  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (editing) {
      await updateProduct(current.id, current);
    } else {
      await addProduct(current);
    }
    setShow(false);
    setEditing(false);
    setCurrent(emptyProduct);
    load();
  };

  const edit = (p) => {
    setCurrent(p);
    setEditing(true);
    setShow(true);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await deleteProduct(id);
    load();
  };

  return (
    <div className="container mt-4">
      <h2>Products</h2>

      <Button className="mb-3" onClick={() => setShow(true)}>
        Add Product
      </Button>

      <ProductList
        products={products}
        onEdit={edit}
        onDelete={remove}
      />

      <ProductForm
        show={show}
        onClose={() => {
          setShow(false);
          setEditing(false);
          setCurrent(emptyProduct);
        }}
        onSave={save}
        product={current}
        setProduct={setCurrent}
        editing={editing}
      />
    </div>
  );
}
