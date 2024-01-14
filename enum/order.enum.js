export const KIND_MANUAL = 1; // thanh toán khi nhận hàng

export const KIND_PAYPAL = 2; // thanh toán ol

export const STATUS_ORDERED = 1; // đã đặt hàng nhưng chưa thanh toán

export const STATUS_DELIVERING = 2; // đang giao

export const STATUS_PAYMENT_SUCCESS = 3; // thanh toán thành công

export const STATUS_SUCCESS = 4; // giao hàng thành công

export const STATUS_CANCEL = 5; // huỷ

export const StatusOrder = {
  [STATUS_ORDERED]: "red",
  [STATUS_DELIVERING]: "yellow",
  [STATUS_PAYMENT_SUCCESS]: "green",
  [STATUS_SUCCESS]: "blue",
  [STATUS_CANCEL]: "purple",
};

export const StatusTextOrder = {
  [STATUS_ORDERED]: "Đơn Hàng Chưa Thanh Toán",
  [STATUS_DELIVERING]: "Đang Giao",
  [STATUS_PAYMENT_SUCCESS]: "Thanh Toán Thành Công",
  [STATUS_SUCCESS]: "Giao Hàng Thành Công",
  [STATUS_CANCEL]: "Đơn Hàng Đã Huỷ",
};
