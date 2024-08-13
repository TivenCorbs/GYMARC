document.addEventListener('DOMContentLoaded', function() {
    // Fetch initial workout data when the page loads
    fetchWorkoutData();

    // Event listener for setting daily reminders
    document.querySelector('.set-daily-reminder').addEventListener('click', function() {
        setDailyReminder();
    });
});