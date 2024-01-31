import request from ".";

export async function loginUser(data) {
  return request(`/auth/login`, {
    method: "POST",
    data
  });
}

export async function refreshTokenApi(data) {
  return request(`/auth/refresh`, {
    method: "POST",
    data
  });
}