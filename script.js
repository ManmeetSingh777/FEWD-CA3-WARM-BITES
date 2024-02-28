document.addEventListener('DOMContentLoaded', function() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const randomMealImage = document.getElementById('randomMealImage');
            randomMealImage.src = meal.strMealThumb;
            randomMealImage.alt = meal.strMeal;

            const randomMealName = document.createElement('p');
            randomMealName.textContent = meal.strMeal;
            randomMealName.classList.add('random-meal-name');
            randomMealImage.parentNode.insertBefore(randomMealName, randomMealImage.nextSibling);
            
        })
        .catch(error => {
            console.error('Error fetching random meal image:', error);
        });

    const modal = document.getElementById('modal');
    const randomMealImage = document.getElementById('randomMealImage');

    randomMealImage.addEventListener('click', function() {
        modal.style.display = 'block';
        fetchAndDisplayIngredients();
    });

    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function fetchAndDisplayIngredients() {
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52829')
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                const ingredientList = document.getElementById('ingredientList');
                ingredientList.innerHTML = '';
                for (let i = 1; i <= 20; i++) {
                    const ingredient = meal['strIngredient' + i];
                    const measure = meal['strMeasure' + i];
                    if (ingredient && ingredient.trim() !== '') {
                        const listItem = document.createElement('li');
                        listItem.textContent = measure + ' ' + ingredient;
                        ingredientList.appendChild(listItem);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }
});

function searchMeals() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchInput)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '';
            meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.classList.add('grid-item');
                mealDiv.innerHTML = `
                    <div class="meal-item">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <p>${meal.strMeal}</p>
                    </div>
                `;
                searchResults.appendChild(mealDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            mealDiv.innerHTML=`<div>Sorry Dish not found</div>`
        });
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const randomMealImage = document.getElementById('randomMealImage');
            randomMealImage.src = meal.strMealThumb;
            randomMealImage.alt = meal.strMeal;

            const youtubeLink = meal.strYoutube;
            const recipeVideoButton = document.getElementById('recipeVideoButton');
            recipeVideoButton.addEventListener('click', function() {
                window.open(youtubeLink);
            });
        })
        .catch(error => {
            console.error('Error fetching random meal image:', error);
        });

   
});