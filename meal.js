document.getElementById('error-result').style.display = 'none';
const searchFood = () => {
	const searchField = document.getElementById('search-field');
	const searchFieldTxt = searchField.value;

	searchField.value = '';

	fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldTxt}`
	)
		.then((res) => res.json())
		.then((data) => displaySearchResults(data.meals))
		.catch((err) => displayErr(err));
};
const displayErr = (err) => {
	document.getElementById('error-result').style.display = 'block';
};
const displaySearchResults = (meals) => {
	const searchResults = document.getElementById('search-result');
	searchResults.innerHTML = '';
	meals.forEach((meal) => {
		const div = document.createElement('div');
		div.classList.add('col');
		div.innerHTML = `<div onclick="mealInfo(${meal.idMeal})" class="card">
					<img class="img-fluid" src="${
						meal.strMealThumb
					}" class="card-img-top" alt="..." />
					<div class="card-body">
						<h5 class="card-title">${meal.strMeal}</h5>
						<p class="card-text">
							${meal.strInstructions.slice(0, 200)}
						</p>
					</div>
				</div>`;
		searchResults.appendChild(div);
	});
};
const mealInfo = async (mealId) => {
	const res = await fetch(
		`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
	);
	const data = await res.json();
	displayMeals(data.meals[0]);
};
const displayMeals = (meal) => {
	console.log(meal);
	const mealResults = document.getElementById('meal-results');
	mealResults.innerHTML = '';
	const div = document.createElement('div');
	div.innerHTML = `	<div class="card" style="width: 18rem;">
			<img src="${meal.strMealThumb}" class="img-fluid" alt="..." />
					<div class="card-body">
					<h5 class="card-title">${meal.strMeal}</h5>
					<p class="card-text">
						${meal.strInstructions.slice(0, 190)}
					</p>
					<a href="${meal.strYoutube}" class="btn btn-success">Link</a>
					</div>
					</div>`;
	mealResults.appendChild(div);
};
