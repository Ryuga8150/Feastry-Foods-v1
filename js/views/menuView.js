import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
class MenuView {
  _parentElement = document.querySelector(".cards");
  _mealsElement = document.querySelector(".meals");
  _cartItems = [];
  _generateMarkup(data) {
    return `
      <div class="card">
        <img src="${data.imageUrl}" class="card-img" alt="" />
        <div class="card-content">
          <p class="card-title">${data.name}</p>
          <div class="card-tags">
            <span class="tag tag--vegan ${
              data.tags.indexOf("vegan") > -1 ? "" : "hidden"
            }">Vegan</span>
            <span class="tag ${
              data.tags.indexOf("vegetarian") > -1
                ? "tag--vegetarian"
                : "tag--vegetarian"
            }">${
      data.tags.indexOf("vegetarian") > -1 ? "Veg" : "Non-Veg"
    }</span>
            <span class="tag tag--popular ${
              data.tags.indexOf("popular") > -1 ? "" : "hidden"
            }">Popular</span>
          </div>
          <ul class="card-attributes flex card-flex">
            <li class="card-attribute">
              <span>
                <span class="bold-card-attribute">Cook Time: </span>${
                  data.cookTime
                } min
              </span>
            </li>
            <li class="card-attribute">
              <span>
                <span class="bold-card-attribute">Price: </span>${data.price}
              </span>
            </li>
            <li class="card-attribute">
              <span>
                <span class="bold-card-attribute">Servings: </span>${
                  data.servings
                }
              </span>
            </li>
          </ul>
        </div>
        <button class="btn-AddToCart">Add To Cart</button>
      </div>
    `;
  }
  _clearParentElement() {
    this._parentElement.innerHTML = "";
  }
  _renderMenu(data) {
    this._clearParentElement();
    let isWine = 0;
    let dataArr = data;

    for (let i = 0; i < data.length; ++i) {
      const html = this._generateMarkup(dataArr[i]);
      this._parentElement.insertAdjacentHTML("beforeend", html);
    }
    this._handleAddToCartClick();
  }
  _handleAddToCartClick(handler) {
    console.log("Click handlers added");
    const addToCartBtnElements =
      this._parentElement.querySelectorAll(".card button");
    let self = this;

    addToCartBtnElements.forEach((btnEl) => {
      btnEl.addEventListener("click", function (e) {
        self._storeCartItemInfo(this, handler);
      });
    });
  }
  _storeCartItemInfo(btnEl, handler) {
    console.log(btnEl.previousElementSibling);
    const cardContentEl = btnEl.previousElementSibling;
    let item = {};
    item.imageUrl = cardContentEl.previousElementSibling.src;
    item.name = cardContentEl.querySelector("p").textContent;
    const el = cardContentEl.querySelector("ul").children[1];
    item.price = Number(
      el.querySelector("span").textContent.trim().split(" ")[1]
    );
    console.log(item);
    this._cartItems.push(item);
    handler(item);
    Toastify({
      text: "Added To Cart",
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
  }
  _setActive(meal) {
    this._mealsElement.children.forEach((el) => {
      el.classList.remove("meal-active");
    });
    meal.classList.add("meal-active");
  }
  _addHandlerClick(handler) {
    console.log(this._mealsElement);
    let self = this;
    this._mealsElement.children.forEach((meal) => {
      meal.addEventListener("click", function (e) {
        //console.log(this.dataset.point);
        const index = Number(this.dataset.point);
        handler(index);
        self._setActive(this);
      });
    });
  }
}
export default new MenuView();
