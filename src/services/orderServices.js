const DB_URL = "https://configurapro-default-rtdb.firebaseio.com/orders";

export const fetchOrders = async () => {
  const res = await fetch(`${DB_URL}.json`);
  const data = await res.json();

  if (!data) return [];

  const orders = [];

  Object.entries(data).forEach(([userKey, userOrders]) => {
    if (!userOrders) return;

    Object.entries(userOrders).forEach(([orderId, order]) => {
      orders.push({
        id: orderId,
        userKey,
        userEmail: userKey.replace(/_/g, "."),
        ...order
      });
    });
  });

  return orders;
};

export const updateOrderStatus = async (userKey, orderId, status) => {
  await fetch(`${DB_URL}/${userKey}/${orderId}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
};

export const deleteOrder = async (userKey, orderId) => {
  await fetch(`${DB_URL}/${userKey}/${orderId}.json`, {
    method: "DELETE"
  });
};
