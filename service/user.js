import request from ".";

export async function getAllUser(params) {
  return request(`/user/all`, {
    method: "GET",
    params
  });
}
export async function getUserById(id) {
  return request(`/user/${id}`, {
    method: "GET",
  });
}

export async function userGetMe() {
  return request(`/me`, {
    method: "GET",
  });
}
export async function createUser(data) {
  return request(`/user/create`, {
    method: "POST",
    data,
  });
}
export async function updateUser(id, data) {
  return request(`/user/update/${id}`, {
    method: "POST",
    data,
  });
}
export async function deleteUser(id) {
  return request(`/user/delete/${id}`, {
    method: "DELETE",
  });
}