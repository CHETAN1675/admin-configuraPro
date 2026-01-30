import { useEffect, useState } from "react";
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
    editing
      ? await updateProduct(current.id, current)
      : await addProduct(current);

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
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Products
        </h1>

        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <ProductList
        products={products}
        onEdit={edit}
        onDelete={remove}
      />

      {/* Modal */}
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
