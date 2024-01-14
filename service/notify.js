import request from ".";

export async function getNotify() {
  return request(`/notify`, {
    method: "GET",
  });
}