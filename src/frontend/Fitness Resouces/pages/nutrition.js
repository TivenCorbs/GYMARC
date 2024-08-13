document.addEventListener('DOMContentLoaded',function()){
    fetchNutritionPlan('Monday');

    document.querySelectorAll('.container').forEach(container =>{
        container.addEventListener('click',function(event)){
            const mealType = this.querySelector('.breakfast, .lunch, .dinner').textContent.trim();
            fetchMealDetails(mealType);
        }
    })

}