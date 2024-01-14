import request from ".";

export async function getAllCategory(params) {
  return request(`/category/all`, {
    method: "GET",
    params
  });
}
export async function getCategoryById(id) {
  return request(`/category/${id}`, {
    method: "GET",
  });
}
export async function createCategory(data) {
  return request(`/category/create`, {
    method: "POST",
    data,
  });
}
export async function updateCategory(id, data) {
  return request(`/category/update/${id}`, {
    method: "POST",
    data,
  });
}
export async function deleteCategory(id) {
  return request(`/category/delete/${id}`, {
    method: "DELETE",
  });
}