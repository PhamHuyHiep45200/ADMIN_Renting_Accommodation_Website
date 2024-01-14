import request from ".";

export async function getAllBanner() {
  return request(`/banner`, {
    method: "GET",
  });
}
export async function createBanner(data) {
  return request(`/banner`, {
    method: "POST",
    data,
  });
}
export async function updateBanner(id, data) {
  return request(`/banner/${id}`, {
    method: "PUT",
    data,
  });
}
export async function deleteBanner(id) {
  return request(`/banner/${id}`, {
    method: "DELETE",
  });
}
