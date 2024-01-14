import request from ".";

export async function loginUser(data) {
  return request(`/auth/login`, {
    method: "POST",
    data
  });
}