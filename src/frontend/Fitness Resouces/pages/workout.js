document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to each workout type container
    document.querySelectorAll('.container-12 > div, .container-3 > div').forEach(container => {
        container.addEventListener('click', function(event) {
            const workoutType = this.querySelector('.weight-training, .yoga-training, .hiit-training, .boxing-training').textContent.trim();
            fetchWorkoutDetails(workoutType);
        });
    });
});

async function fetchWorkoutDetails(workoutType){
    try{
        const response = await fetch(`/api/workout-plan?workout=${workoutType}`);
        const data = await response.json();
        console.log(data);
        alert(`Details for ${workoutType}:\nDuration: ${data.duration}\nIntensity: ${data.intensity}\nDescription: ${data.description}`);
    }
    catch(error){
        console.error('Error fetching workout details:',error);
    }
}
        