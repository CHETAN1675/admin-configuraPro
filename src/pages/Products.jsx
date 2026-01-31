import { useEffect, useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");

  const load = async () => {
    const data = await fetchProducts();

    const normalized = data.map((p) => ({
      ...p,
      materials: Array.isArray(p.materials)
        ? p.materials
        : Object.entries(p.materials || {}).map(([name, price]) => ({
            name,
            price,
          })),
      capacities: Array.isArray(p.capacities)
        ? p.capacities
        : Object.entries(p.capacities || {}).map(([name, value]) => ({
            name,
            price: value.price || 0,
            dimensions: value.dimensions || [],
          })),
    }));

    setProducts(normalized);
  };

  useEffect(() => {
    load();
  }, []);

  /* -------- Search Filter -------- */
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;

    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

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
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Products
        </h1>

        <div className="flex gap-3">
          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name..."
            className="w-64 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                       dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />

          <button
            onClick={() => setShow(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Empty state */}
      {!filteredProducts.length && (
        <p className="mt-10 text-center text-slate-500">
          No products found
          {search && (
            <>
              {" "}
              for{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                “{search}”
              </span>
            </>
          )}
        </p>
      )}

      {/* Table / List */}
      <ProductList
        products={filteredProducts}
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
