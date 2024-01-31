import request from ".";

export async function getAllUser(params) {
  return request(`/users`, {
    method: "GET",
    params
  });
}
export async function getUserById(id) {
  return request(`/users/${id}`, {
    method: "GET",
  });
}

export async function userGetMe() {
  return request(`users/me`, {
    method: "GET",
  });
}
export async function createUser(data) {
  return request(`/user`, {
    method: "POST",
    data,
  });
}
export async function updateUser(id, data) {
  return request(`/users/${id}`, {
    method: "PATCH",
    data,
  });
}
export async function deleteUser(id, active) {
  return request(`/users/${id}`, {
    method: "DELETE",
    data: { active }
  });
}
