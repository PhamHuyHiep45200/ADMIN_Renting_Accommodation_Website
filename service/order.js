import request from ".";

export async function getAllOrder() {
  return request(`/order`, {
    method: "GET",
  });
}

export async function cancelOrder(id) {
  return request(`/order/update/${id}`, {
    method: "POST",
    data: {
      status: 5
    }
  });
}