document.addEventListener('DOMContentLoaded',function()){
    fetchNutritionPlan('Monday');

    document.querySelectorAll('.container').forEach(container =>{
        container.addEventListener('click',function(event){
            const mealType = this.querySelector('.breakfast, .lunch, .dinner').textContent.trim();
            fetchMealDetails(mealType);
        });
    });

async function fetchNutritionPlan(day){
    try{
        const response = await fetch(`/api/nutrition-plan?day=${day}`);
        const data = await response.json();
        console.log(data);

        //Updates DOM with data that is fetched
        document.querySelector('.overnight-oats').textContent = data.breakfast;
        document.querySelector('.black-bean-burrito').textContent = data.lunch;
        document.querySelector('.alfredo-pasta').textContent = data.dinner;
    }
    catch(error){
        console.error('Error fetching nutrition plan:',error);
    }
}
}
