import menuData from "../../data/menuData";

export const getMenuData = async function (item) {
  try {
    let data = menuData[item];
    console.log(data);
    return data;
  } catch (err) {
    console.log("Error in getting recipes", err);
    Toastify({
      text: "Error Fetching Recipes",
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
};
