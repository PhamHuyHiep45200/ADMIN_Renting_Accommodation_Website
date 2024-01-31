import request from ".";

export async function getAllCategory(params) {
  return request(`/category`, {
    method: "GET",
    params,
  });
}
export async function getCategoryById(id) {
  return request(`/category/${id}`, {
    method: "GET",
  });
}
export async function createCategory(data) {
  return request(`/category`, {
    method: "POST",
    data,
  });
}
export async function updateCategory(id, data) {
  return request(`/category/${id}`, {
    method: "PATCH",
    data,
  });
}
export async function deleteCategory(id, active) {
  return request(`/category/${id}`, {
    method: "DELETE",
    data: { active },
  });
}
