document.getElementById("searchBtn").addEventListener("click", function () {
    const inputValue = document.getElementById("inputValue").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals) {
                displayFoodItems(data);
            } else {
                alert("Data not found");
            }
        });
});
const displayFoodItems = (food) => {
    const foodItems = food.meals;
    const foodDetailDiv = document.getElementById("foodDetail");
    foodItems.forEach((foodItem) => {
        const foodItemDiv = document.createElement("div");
        foodItemDiv.className = "foodItem";

        const foodInfo = `
        <img src="${foodItem.strMealThumb}">
       <h6> ${foodItem.strMeal}</h6>
       
        `;
        foodItemDiv.addEventListener("click", () => {
            foodItemIngredients(foodItem.strMeal);
        });
        foodItemDiv.innerHTML = foodInfo;
        foodDetailDiv.appendChild(foodItemDiv);
    });
};

const foodItemIngredients = (list) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${list}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => renderFoodInformation(data));
};

const renderFoodInformation = (ingredient) => {
    const foodIngredient = ingredient.meals;
    foodIngredient.forEach((foodElements) => {
        const foodIngredients = document.getElementById("foodIngredients");
        foodIngredients.innerHTML = `
    <img src="${foodElements.strMealThumb}">
    <h3> ${foodElements.strMeal}</h3>
    <h5>Ingredients:</h5>
    <ul>
    <li>${foodElements.strIngredient1}</li>
    <li>${foodElements.strIngredient2}</li>
    <li>${foodElements.strIngredient3}</li>
    <li>${foodElements.strIngredient4}</li>
    <li>${foodElements.strIngredient5}</li>
    <li>${foodElements.strIngredient6}</li>
    <li>${foodElements.strIngredient7}</li>
    </ul>

    `;
    });
};
