let bookings = [];

export const getBookings = function () {
  bookings = JSON.parse(localStorage.getItem('Bookings'));
};
export const storeBookings = function (data) {
  bookings.push(data);
  localStorage.removeItem('Bookings');
  localStorage.setItem('Bookings', JSON.stringify(bookings));
  alert('Bookings Stored SuccessFully');
};

export const clearBookings = function () {
  localStorage.removeItem('Bookings');
};
