import request from ".";

export async function getAllProduct(params) {
  return request(`/product/all`, {
    method: "GET",
    params
  });
}
export async function getProductById(id) {
  return request(`/product/${id}`, {
    method: "GET",
  });
}

export async function createProduct(data) {
  return request(`/product/create`, {
    method: "POST",
    data,
  });
}
export async function updateProduct(id, data) {
  return request(`/product/update/${id}`, {
    method: "POST",
    data,
  });
}
export async function updateMultiProduct(data) {
  return request(`/product/change-status/`, {
    method: "POST",
    data,
  });
}
export async function deleteProduct(id) {
  return request(`/product/delete/${id}`, {
    method: "DELETE",
  });
}