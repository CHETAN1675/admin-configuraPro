import { useState } from "react";

export default function ProductForm({ show, onClose, onSave, product, setProduct, editing }) {
  if (!show) return null;

  const addMaterial = () => {
    setProduct({
      ...product,
      materials: [...product.materials, { name: "", price: "" }],
    });
  };

  const addCapacity = () => {
    setProduct({
      ...product,
      capacities: [...product.capacities, { name: "", price: "", dimensions: [] }],
    });
  };

  const addDimension = (capIndex) => {
    const copy = [...product.capacities];
    copy[capIndex].dimensions.push("");
    setProduct({ ...product, capacities: copy });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-5xl mx-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-auto max-h-[90vh] border border-white/30 dark:border-slate-700/40 animate-fadeIn" 
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/20 dark:border-slate-700/50">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {editing ? "Edit Product" : "Add Product"}
          </h2>
          <button
            className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-2xl transition"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* PRODUCT DETAILS */}
          <div className="p-6 rounded-xl shadow-md bg-gradient-to-br from-white/50 to-white/30 dark:from-slate-800/50 dark:to-slate-900/40 border border-white/20 dark:border-slate-700/40 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Product Details</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/60 dark:bg-slate-700/60 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/60 dark:bg-slate-700/60 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                value={product.image}
                onChange={(e) => setProduct({ ...product, image: e.target.value })}
              />
            </div>
          </div>

          {/* MATERIALS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Materials</h3>
            <div className="space-y-3">
              {product.materials.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-3 p-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-xl shadow hover:shadow-lg transition"
                >
                  <input
                    type="text"
                    placeholder="Material Name"
                    className="flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800/50 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-yellow-400 transition"
                    value={m.name}
                    onChange={(e) => {
                      const copy = [...product.materials];
                      copy[i].name = e.target.value;
                      setProduct({ ...product, materials: copy });
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-32 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800/50 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-yellow-400 transition"
                    value={m.price}
                    onChange={(e) => {
                      const copy = [...product.materials];
                      copy[i].price = Number(e.target.value);
                      setProduct({ ...product, materials: copy });
                    }}
                  />
                </div>
              ))}
              <button
                onClick={addMaterial}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl font-semibold shadow-lg transition"
              >
                + Add Material
              </button>
            </div>
          </div>

          {/* CAPACITIES */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Capacities & Dimensions</h3>
            {product.capacities.map((cap, ci) => (
              <div
                key={ci}
                className="p-4 bg-gradient-to-br from-white/50 to-white/30 dark:from-slate-800/50 dark:to-slate-900/40 backdrop-blur-sm rounded-2xl shadow-md space-y-3 border border-white/20 dark:border-slate-700/40"
              >
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Capacity Name"
                    className="flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/60 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-400 transition"
                    value={cap.name}
                    onChange={(e) => {
                      const copy = [...product.capacities];
                      copy[ci].name = e.target.value;
                      setProduct({ ...product, capacities: copy });
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-32 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/60 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-400 transition"
                    value={cap.price}
                    onChange={(e) => {
                      const copy = [...product.capacities];
                      copy[ci].price = Number(e.target.value);
                      setProduct({ ...product, capacities: copy });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <strong className="text-slate-900 dark:text-white pr-2">Dimensions</strong>
                  {cap.dimensions.map((d, di) => (
                    <input
                      key={di}
                      type="text"
                      placeholder="e.g. 2 x 2 x 2"
                      className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/60 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-400 transition"
                      value={d}
                      onChange={(e) => {
                        const copy = [...product.capacities];
                        copy[ci].dimensions[di] = e.target.value;
                        setProduct({ ...product, capacities: copy });
                      }}
                    />
                  ))}
                  <button
                    onClick={() => addDimension(ci)}
                    className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition"
                  >
                    + Add Dimension
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addCapacity}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-lg transition"
            >
              + Add Capacity
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-white/20 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-b-2xl">
          <button
            onClick={onSave}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold shadow-lg transition"
          >
            {editing ? "Update Product" : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
