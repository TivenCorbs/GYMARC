document.addEventListener('DOMContentLoaded', function() {
    // Fetch the nutrition plan for Monday when the page loads
    fetchNutritionPlan('Monday');

    // Add event listeners to meal containers to handle clicks and data fetching
    document.querySelectorAll('.container').forEach(container => {
        container.addEventListener('click', function(event) {
            const mealType = this.querySelector('.breakfast, .lunch, .dinner').textContent.trim();
            fetchMealDetails(mealType);
        });
    });
});

async function fetchNutritionPlan(day) {
    try {
        const response = await fetch(`/api/nutrition-plan?day=${day}`);
        const data = await response.json();
        console.log(data);

        // Update DOM with fetched data
        document.querySelector('.overnight-oats').textContent = data.breakfast;
        document.querySelector('.black-bean-burrito').textContent = data.lunch;
        document.querySelector('.alfredo-pasta').textContent = data.dinner;
    } catch (error) {
        console.error('Error fetching nutrition plan:', error);
    }
}

async function fetchMealDetails(mealType) {
    try {
        const response = await fetch(`/api/meal-details?meal=${mealType}`);
        const data = await response.json();
        console.log(data);

        alert(`Details for ${mealType}: ${data.details}`);
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}
