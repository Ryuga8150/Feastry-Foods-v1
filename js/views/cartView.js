import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

class CartView {
  _parentElement = document.querySelector(".section-cart");
  _cartBtnElement = document.querySelector(".cart-logo");
  _closeBtnElement = document.querySelector(".cartBtn--close-modal");
  _cardsContainer = document.querySelector(".cart-cards");
  _totalPriceEl = document.querySelector(".totalPrice");
  _placeOrderButtonEl = document.querySelector(".place-order-btn");
  _message = document.querySelector(".order-box");
  _generateMarkup(item) {
    return `
      <div class="cart-card grid">
        <img src="${item.imageUrl}" class="cart-item-img" />
        <div class="cart-item flex">
          <span>${item.name}</span>
        </div>
        <div class="card-item-quantity flex">
          <ion-icon name="add-outline" class="quantity-btn left-btn"></ion-icon>
          <span class="quantity">1</span>
          <ion-icon name="remove-outline" class="quantity-btn right-btn"></ion-icon>
        </div>
        <div class="card-cost">
          <span class="cost">${item.price}</span>
        </div>
        <div class="checkbox-box">
          <input type="checkbox" name="checkbox" class="checkbox" />
        </div>
      </div>
    `;
  }
  _handleButtons() {
    console.log(document.querySelectorAll(".quantity-btn"));
    document.querySelectorAll(".quantity-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        //console.log(this);
        console.log(e.target);
        const targetEl = e.target;
        if (targetEl.classList.contains("right-btn")) {
          console.log("Right btn clicked");
          let value = Number(targetEl.previousElementSibling.textContent);
          if (value > 1) {
            targetEl.previousElementSibling.textContent = value - 1;
          }
        } else {
          console.log("Left btn clicked");
          let value = Number(targetEl.nextElementSibling.textContent);
          targetEl.nextElementSibling.textContent = value + 1;
        }
      });
    });
    console.log(document.querySelectorAll(".checkbox"));
    document.querySelectorAll(".checkbox").forEach((box) => {
      box.addEventListener("change", (e) => {
        console.log(e.target);
        e.target.parentElement.parentElement.classList.toggle("crossed");
      });
    });
  }
  _renderCart(handler) {
    this._parentElement.classList.toggle("hidden");
    this._cartBtnElement.classList.toggle("hidden");
    let items = handler();
    console.log(items);
    this._cardsContainer.innerHTML = "";
    let totalPrice = 0;
    items.forEach((item) => {
      const html = this._generateMarkup(item);
      totalPrice += item.price;
      this._cardsContainer.insertAdjacentHTML("beforeend", html);
    });
    this._totalPriceEl.textContent = `$${totalPrice}`;
    //this._handleButtons();
    this._placeOrderButtonEl.addEventListener("click", (e) => {
      items = [];
      this._closeCart();
      Toastify({
        text: "Order Placed",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "hsla(0, 0%, 20%, 1)",

          background:
            "radial-gradient(circle, hsla(0, 0%, 20%, 1) 20%, hsla(0, 0%, 11%, 1) 65%)",

          background:
            "-moz-radial-gradient(circle, hsla(0, 0%, 20%, 1) 20%, hsla(0, 0%, 11%, 1) 65%)",

          background:
            "-webkit-radial-gradient(circle, hsla(0, 0%, 20%, 1) 20%, hsla(0, 0%, 11%, 1) 65%)",

          filter:
            "progid: DXImageTransform.Microsoft.gradient( startColorstr=#343434, endColorstr=#1B1B1B, GradientType=1 )",
          boxShadow: "none",
          padding: "12px 24px",
          fontSize: "16px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    });
  }
  _closeCart() {
    this._parentElement.classList.toggle("hidden");
    this._cartBtnElement.classList.toggle("hidden");
  }
  _addHandlerClick(handler) {
    this._cartBtnElement.addEventListener("click", () => {
      this._renderCart(handler);
    });
    this._closeBtnElement.addEventListener("click", () => {
      this._closeCart();
    });
  }
}

export default new CartView();
