import request from ".";

export async function getAllProduct(params) {
  return request(`/house/status`, {
    method: "GET",
    params
  });
}
export async function updateStatusProduct(data) {
  return request(`/house/status`, {
    method: "PUT",
    data
  });
}
export async function getProductById(id) {
  return request(`/house/${id}`, {
    method: "GET",
  });
}

export async function createProduct(data) {
  return request(`/house/create`, {
    method: "POST",
    data,
  });
}
export async function updateProduct(id, data) {
  return request(`/house/update/${id}`, {
    method: "POST",
    data,
  });
}
export async function updateMultiProduct(data) {
  return request(`/house/status`, {
    method: "PUT",
    data,
  });
}
export async function deleteProduct(id) {
  return request(`/house/delete/${id}`, {
    method: "DELETE",
  });
}