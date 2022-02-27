document.getElementById("button-addon2").addEventListener("click", function () {
    spinnerBorder("block");

    const userField = document.getElementById("userInput");
    const userValue = userField.value;
    getApi(userValue);
    userField.value = "";
    // document.getElementById("row").innerHTML = '';
});
document.getElementById("userInput").addEventListener("focus", function () {
    document.getElementById("row").innerHTML = "";
    // document.getElementById("rows").innerHTML = '';
});

const spinnerBorder = (spinners) => {
    document.getElementById("spinner").style.display = spinners;
};

const getApi = (foodnames) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodnames}`)
        .then((res) => res.json())
        .then((data) => getFoodName(data.meals));
};
// getApi();
// Getting API From The Meal Db

const getFoodName = (getMeals) => {
    for (foodName of getMeals) {
        const row = document.getElementById("row");
        const div = document.createElement("div");
        div.classList.add("col-md-4", "py-3");
        div.innerHTML = `
        <div class="card">
              <img src="${foodName.strMealThumb
            }" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${foodName.strMeal}</h5>
                <p class="card-text">${foodName.strInstructions.slice(
                0,
                100
            )}</p>
              </div>
              <div class="card-footer">
             <button type="button" class="btn btn-secondary" onclick='singleFoodDetail(${foodName.idMeal
            })' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  See Detail
</button>
              </div>
            </div>
            `;
        row.appendChild(div);
    }
    spinnerBorder("none");
};
// Display Food Name in UI

// document.getElementById("clears").addEventListener('click',function(){
//  // const rows = document.getElementById("rows").textContent = '';
//  console.log('clickde')
// })

const singleFoodDetail = (getSingleFood) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getSingleFood}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showSingleFood(data.meals[0]));
};

const showSingleFood = (getSingleFood) => {
    const rows = document.getElementById("rows");
    rows.innerHTML = `
    <div class="modal-header">
    <h1 class="card-title fw-bolder text-capitalize">${getSingleFood.strMeal}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
</div>
<div class="modal-body" >
<div class="card">
<img src="${getSingleFood.strMealThumb}" class="card-img-top" alt="...">
<div class="card-body">
<div class='d-flex justify-content-between py-3'>
<h5>Category: ${getSingleFood.strCategory}</h5>
<h5>Country: ${getSingleFood.strArea}</h5>
</div>
  <p class="card-text">${getSingleFood.strInstructions}</p>
</div>

</div>
</div>
    `;
};
