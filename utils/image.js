export const getImage = (img) => {
  return img?.split?.(process.env.NEXT_PUBLIC_BASE_URL_SERVER)?.[1];
};
