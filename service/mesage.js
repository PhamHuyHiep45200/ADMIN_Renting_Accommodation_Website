import request from ".";

export async function getUserMessage() {
  return request(`/chat/user-chat`, {
    method: "GET",
  });
}

export async function getChatByUser(params) {
  return request(`/chat`, {
    method: "GET",
    params
  });
}