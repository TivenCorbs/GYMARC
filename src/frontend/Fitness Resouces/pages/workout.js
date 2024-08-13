document.addEventListener('DOMContentLoaded', function() {
    // Fetch initial workout data when the page loads
    fetchWorkoutData();

    // Event listener for setting daily reminders
    document.querySelector('.set-daily-reminder').addEventListener('click', function() {
        setDailyReminder();
    });
});
async function fetchWorkoutData(){
    try{
        const response = await fetch('/api/workout-data');
        const data = await response.json();
        console.log(data);

        document.querySelector('.container-6').textContent = data.steps;
        document.querySelector('.average-time').textContent = `Average time: ${data.averageTime}`;
    }
    catch(error){
        console.error('Error fetching workout data:', error);
    }
    async function setDailyReminder(){
        try{
            const response = await fetch('/api/set-reminder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({reminder:'daily'})
        });
        const data = await response.json();
        console.log(data);

        alert('Daily reminder set successfully!');
    }
    catch(error){
        console.error('Error setting daily reminder:', error);
   
}
}

}