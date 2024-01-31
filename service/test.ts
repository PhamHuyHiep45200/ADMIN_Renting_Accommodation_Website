import axios from 'axios';
const api = axios.create({
  baseURL: 'https://your-api-url.com',
});
let isRefreshing = false;
let refreshSubscribers = [];
// Hàm kiểm tra và làm mới token
const checkAndRefreshToken = async () => {
  // Kiểm tra xem token có hết hạn không
  if (tokenIsExpired()) {
    // Nếu đang làm mới token, chờ đợi
    if (isRefreshing) {
      return await new Promise((resolve) => {
        refreshSubscribers.push(resolve);
      });
    }
    isRefreshing = true;
    try {
      const response = await api.post('/refresh-token', { refreshToken });
      const newToken = response.data.token;
      // Lưu token mới vào localStorage hoặc nơi lưu trữ khác
      localStorage.setItem('token', newToken);
      // Thông báo cho các yêu cầu đang chờ biết rằng token đã được làm mới
      refreshSubscribers.forEach((cb) => cb(newToken));
      refreshSubscribers = [];
      return newToken;
    } catch (error) {
      // Xử lý lỗi khi làm mới token (ví dụ: đăng nhập lại)
      console.error('Lỗi khi làm mới token:', error);
      throw error;
    } finally {
      isRefreshing = false;
    }
  }
};
// Hàm kiểm tra token đã hết hạn
const tokenIsExpired = () => {
  // Kiểm tra logic hết hạn của token ở đây
};
// Interceptor trước khi gửi yêu cầu
api.interceptors.request.use(async (config) => {
  await checkAndRefreshToken(); // Kiểm tra và làm mới token trước khi gửi yêu cầu
  return config;
}, (error) => {
  return Promise.reject(error);
});
export default api;