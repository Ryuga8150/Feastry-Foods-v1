class Reviews {
  _parentElement = document.querySelector(".reviews");
  _reviews = [];
  _currReview = 0;
  self = this;
  _generateMarkup(review, curr, isActive) {
    return `
    <div class="review-card ${isActive == 1 ? "active" : ""}">
      <div>
        <h3 class="review-subheading">Rating</h3>
        <div class="star-box flex">
          <ion-icon name="star" class="star-icon"></ion-icon>
          <ion-icon name="star" class="star-icon"></ion-icon>
          <ion-icon name="star" class="star-icon"></ion-icon>
          <ion-icon name="star-half-outline" class="star-icon"></ion-icon>
          <ion-icon name="star-outline" class="star-icon"></ion-icon>
        </div>
      </div>
      <p class="review-description">
        ${review.review}
      </p>
      <div>
        <span class="signature">${review.name}</span>
        <span class="customer-name">Customer Name</span>
      </div>
      <img src="images/pics/quotations.png" class="quotation-img" />
      <img src="images/users/user-${curr + 1}.jpg" class="customer-img" />
    </div>
    `;
  }
  _reviewSlider() {
    let curr = this._currReview;
    let cycle = 0;
    while (cycle < 3) {
      curr = curr % 3;
      let arr = this._reviews[curr];
      //cl(arr, curr);

      const html = this._generateMarkup(arr, curr, cycle);
      this._parentElement.insertAdjacentHTML("beforeend", html);
      cycle++;
      curr++;
    }
    this._currReview++;
    this._currReview %= 3;
  }
  _renderReviews(getData) {
    //REMEMBER this._reviews and reviews in model will reflect each other's changes
    this._reviews = getData();
    this._currReview = 0;
    //console.log(this);
    setInterval(() => {
      this._parentElement.innerHTML = "";
      this._reviewSlider();
    }, 5000);
  }
}
export default new Reviews();
