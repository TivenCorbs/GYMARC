document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to each workout type container
    document.querySelectorAll('.container-12 > div, .container-3 > div').forEach(container => {
        container.addEventListener('click', function(event) {
            const workoutType = this.querySelector('.weight-training, .yoga-training, .hiit-training, .boxing-training').textContent.trim();
            fetchWorkoutDetails(workoutType);
        });
    });
});
        