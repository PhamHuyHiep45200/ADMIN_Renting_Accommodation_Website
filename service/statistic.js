import request from ".";

export async function statistic() {
  return request(`/common/statistic`, {
    method: "GET",
  });
}