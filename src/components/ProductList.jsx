export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Materials</th>
            <th className="px-4 py-3 text-left">Capacities</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {products.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="px-4 py-10 text-center text-slate-500 dark:text-slate-400"
              >
                No products found
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <td className="px-4 py-3">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-12 w-12 rounded-lg object-cover border"
                    />
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>

                <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-400">
                  {p.name}
                </td>

                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {p.materials.map((m) => m.name).join(", ")}
                </td>

                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {p.capacities.map((c) => c.name).join(", ")}
                </td>

                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="px-3 py-1.5 rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20 transition text-xs font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(p.id)}
                    className="px-3 py-1.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition text-xs font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
