// const APIKEY = `19f4c70dae8849b6a9ac4c49a90606cb`;
// const mealURL = `https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=9`;
// const dessertURL = `https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=9&tags=dessert`;
// const wineURL = `https://api.spoonacular.com/food/wine/recommendation?apiKey=${APIKEY}&number=9&wine=red_wine`;
// const cocktailUrl = 'https://the-cocktail-db.p.rapidapi.com/popular.php';
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '1874d3aeddmshc416996fbd9af9ap12e958jsn0584e3284071',
//     'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
//   },
// };
export const getMenuData = async function (item) {
  //&tags=vegetarian,vegan,veryPopular
  try {
    let url;
    if (item === 0) {
      url = mealURL;
    } else if (item === 1) {
      url = dessertURL;
    } else {
      url = cocktailUrl;
    }
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('Error in getting recipes', err);
  }
};
