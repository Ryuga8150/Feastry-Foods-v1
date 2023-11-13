import bookingsView from "./views/bookingsView";
import cartView from "./views/cartView";
import reviewView from "./views/reviewView";
import {
  storeBookings,
  getBookings,
  clearBookings,
} from "./model/bookingModel";
import * as menuModel from "./model/menuModel";
import * as cartModel from "./model/cartModel";
import * as reviewModel from "./model/reviewModel";
import menuView from "./views/menuView";
//let userImages = require('../images/users/user1.jpg');

console.log("Inside Controller");
// window.addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log(e.target);
// });
// bookingsButtonEl.addEventListener('click', function (e) {
//   e.preventDefault();
//   bookingsView._showBookings();
// });

const handleBookingSubmit = function (data) {
  storeBookings(data);
};

const handleMenuData = async function (item = 0) {
  const data = await menuModel.getMenuData(item);
  menuView._renderMenu(data);
  menuView._handleAddToCartClick(cartModel.storeInCart);
};
const handleCartData = function () {
  return cartModel.getCartItems();
};
const init = async function () {
  bookingsView._addHandlerClick();
  bookingsView._addHandlerClose();
  bookingsView._addHandlerSubmit(handleBookingSubmit);
  menuView._addHandlerClick(handleMenuData);
  cartView._addHandlerClick(handleCartData);
  reviewView._renderReviews(reviewModel.getReviews);
  await handleMenuData();
};

//To clear the Bookings in the Local Storage
//clearBookings();
init();
