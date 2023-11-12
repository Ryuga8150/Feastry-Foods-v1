let cartItems = [];

export const storeInCart = function (item) {
  cartItems.push(item);
};
export const getCartItems = function (item) {
  return cartItems;
};
