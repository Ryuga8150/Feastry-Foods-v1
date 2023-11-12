class MenuView {
  _parentElement = document.querySelector('.cards');
  _mealsElement = document.querySelector('.meals');
  _cartItems = [];
  _generateMarkup(data, isWine) {
    if (isWine)
      return `
      <div class="card">
        <img src="${data.strDrinkThumb}" class="card-img" alt="" />
        <div class="card-content">
          <p class="card-title">${data.strDrink}</p>
          <ul class="card-attributes flex card-flex">
            <li class="card-attribute">
              <span>
                <span class="bold-card-attribute">Glass: </span>${
                  data.strGlass
                } min
              </span>
            </li>
            <li class="card-attribute">
              <span>
                <span class="bold-card-attribute">Price: </span>$ 10
              </span>
            </li>
            <li class="card-attribute">
              <span>
                <span class="bold-card-attribute">Rating: </span>${9}
              </span>
            </li>
          </ul>
        </div>
        <button class="btn-AddToCart">Add To Cart</button>
      </div>
    `;
    return `
      <div class="card">
        <img src="${data.image}" class="card-img" alt="" />
        <div class="card-content">
          <p class="card-title">${data.title}</p>
          <div class="card-tags">
            <span class="tag tag--vegan ${
              data.vegan ? '' : 'hidden'
            }">Vegan</span>
            <span class="tag ${
              data.vegetarian ? 'tag--vegetarian' : 'tag--vegetarian'
            }">${data.vegetarian ? 'Veg' : 'Non-Veg'}</span>
            <span class="tag tag--popular ${
              data.veryPopular ? '' : 'hidden'
            }">Popular</span>
          </div>
          <ul class="card-attributes flex card-flex">
            <li class="card-attribute">
              <span>
                <span class="bold-card-attribute">Cook Time: </span>${
                  data.readyInMinutes
                } min
              </span>
            </li>
            <li class="card-attribute">
              <span>
                <span class="bold-card-attribute">Price: </span>${
                  data.pricePerServing
                }
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
    this._parentElement.innerHTML = '';
  }
  _renderMenu(data) {
    console.log(data);
    this._clearParentElement();
    let isWine = 0;
    let dataArr;
    if (!data.recipes) {
      isWine = 1;
      dataArr = data.drinks;
    } else {
      dataArr = data.recipes;
    }
    for (let i = 0; i < 9; ++i) {
      const html = this._generateMarkup(dataArr[i], isWine);
      this._parentElement.insertAdjacentHTML('beforeend', html);
    }
    //this._handleAddToCartClick();
  }
  _handleAddToCartClick(handler) {
    const addToCartBtnElements =
      this._parentElement.querySelectorAll('.card button');
    let self = this;
    //console.log(addToCartBtnElements);
    addToCartBtnElements.forEach(btnEl => {
      btnEl.addEventListener('click', function (e) {
        self._storeCartItemInfo(this, handler);
      });
    });
  }
  _storeCartItemInfo(btnEl, handler) {
    console.log(btnEl.previousElementSibling);
    const cardContentEl = btnEl.previousElementSibling;
    let item = {};
    item.imageUrl = cardContentEl.previousElementSibling.src;
    item.name = cardContentEl.querySelector('p').textContent;
    const el = cardContentEl.querySelector('ul').children[1];
    item.price = Number(
      el.querySelector('span').textContent.trim().split(' ')[1]
    );
    console.log(item);
    //this._cartItems.push(item);
    handler(item);
  }
  _setActive(meal) {
    this._mealsElement.children.forEach(el => {
      el.classList.remove('meal-active');
    });
    meal.classList.add('meal-active');
  }
  _addHandlerClick(handler) {
    console.log(this._mealsElement);
    let self = this;
    this._mealsElement.children.forEach(meal => {
      meal.addEventListener('click', function (e) {
        //console.log(this.dataset.point);
        const index = Number(this.dataset.point);
        handler(index);
        self._setActive(this);
      });
    });
  }
}
export default new MenuView();
