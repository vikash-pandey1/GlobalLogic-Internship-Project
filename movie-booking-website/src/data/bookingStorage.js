// utils/bookingStorage.js

export const saveBookingData = (data) => {
  const now = new Date();
  const item = {
    data,
    expiry: now.getTime() + 24 * 60 * 60 * 1000, // 24 hours
  };
  localStorage.setItem("bookingData", JSON.stringify(item));
};

export const getBookingData = () => {
  const itemStr = localStorage.getItem("bookingData");
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem("bookingData");
    return null;
  }

  return item.data;
};
