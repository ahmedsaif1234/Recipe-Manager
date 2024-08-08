
document.addEventListener('DOMContentLoaded', loadRecipes);

        function addRecipe() {
            const recipeName = document.getElementById('recipeName').value;
            const ingredients = document.getElementById('ingredients').value;
            const instructions = document.getElementById('instructions').value;

            if (recipeName && ingredients && instructions) {
                const recipe = {
                    name: recipeName,
                    ingredients: ingredients,
                    instructions: instructions
                };

                let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
                recipes.push(recipe);
                localStorage.setItem('recipes', JSON.stringify(recipes));

                renderRecipe(recipe);

                
                document.getElementById('recipeName').value = '';
                document.getElementById('ingredients').value = '';
                document.getElementById('instructions').value = '';
            }
        }

        function loadRecipes() {
            const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
            recipes.forEach(renderRecipe);
        }

        function renderRecipe(recipe) {
            const recipeList = document.getElementById('recipeList');

            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';

            recipeDiv.innerHTML = `
        <h2>${recipe.name}</h2>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <button class="edit" onclick="editRecipe(this)">Edit</button>
        <button class="delete" onclick="deleteRecipe(this)">Delete</button>
    `;

            recipeList.appendChild(recipeDiv);
        }

        function editRecipe(button) {
            const recipe = button.parentElement;
            const recipeName = recipe.querySelector('h2').innerText;
            const ingredients = recipe.querySelector('p strong').nextSibling.nodeValue.trim();
            const instructions = recipe.querySelectorAll('p')[1].innerText.split(': ')[1];

            document.getElementById('recipeName').value = recipeName;
            document.getElementById('ingredients').value = ingredients;
            document.getElementById('instructions').value = instructions;

            deleteRecipe(button); 
        }

        function deleteRecipe(button) {
            const recipe = button.parentElement;
            const recipeName = recipe.querySelector('h2').innerText;

            let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
            recipes = recipes.filter(r => r.name !== recipeName);
            localStorage.setItem('recipes', JSON.stringify(recipes));

            recipe.remove();
        }