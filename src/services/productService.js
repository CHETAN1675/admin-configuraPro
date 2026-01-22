const DB_URL =
  "https://configurapro-default-rtdb.firebaseio.com/products";

export const fetchProducts = async () => {
  const res = await fetch(`${DB_URL}.json`);
  const data = await res.json();
  if (!data) return [];
  return Object.entries(data).map(([id, p]) => ({ id, ...p }));
};

export const addProduct = async (product) => {
  await fetch(`${DB_URL}.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (id, product) => {
  await fetch(`${DB_URL}/${id}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id) => {
  await fetch(`${DB_URL}/${id}.json`, { method: "DELETE" });
};
