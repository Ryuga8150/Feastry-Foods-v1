class BookingsView {
  _parentElement = document.querySelector('.add-bookings-window');
  _bookings = [];
  _renderBookings() {
    this._parentElement.classList.toggle('hidden');
  }
  _addHandlerClick() {
    const bookingBtnEl = document.querySelector('#bookingBtn');
    let self = this; //here ony this will point to Bookings View
    //handled this problem
    //1. store this before
    //2. use arrow function as they don't have their own this
    //https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
    bookingBtnEl.addEventListener('click', e => {
      e.preventDefault();
      //console.log(this);
      this._renderBookings();
    });
  }
  _closeBookingsWindow() {
    this._parentElement.classList.toggle('hidden');
  }
  _addHandlerClose() {
    const closeBookingsBtnEl = document.querySelector('.btn--close-modal');
    closeBookingsBtnEl.addEventListener('click', e => {
      e.preventDefault();
      this._closeBookingsWindow();
    });
  }
  _clearForm(formData) {
    formData.forEach(input => {
      input.value = '';
    });
  }
  _submitBookings(handler) {
    const formData = document.querySelectorAll('.form-data');

    let data = {};
    data.name = formData[0].value;
    data.email = formData[1].value;
    data.gathering = Number(formData[2].value);
    data.contactNo = Number(formData[3].value);
    data.serveTime = formData[4].value;
    data.address = formData[5].value;

    console.log(data);
    handler(data);
    this._clearForm(formData);
  }
  _addHandlerSubmit(handler) {
    const submitBookingsBtnEl = document.querySelector('.upload__btn');
    console.log(submitBookingsBtnEl);
    submitBookingsBtnEl.addEventListener('click', e => {
      e.preventDefault();
      this._submitBookings(handler);
    });
  }
}
export default new BookingsView();
