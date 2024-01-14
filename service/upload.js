import request from ".";

export async function uploadFile(data) {
  return request(`/image/upload`, {
    method: "POST",
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data
  });
}