document.addEventListener('DOMContentLoaded',function() {
    const savedUsername = localStorage.getItem('username');
    if(savedUsername){
        document.getElementById('username').value = savedUsername;
    }
});

document.getElementById('loginForm').addEventListener('submit',function(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
});

if(username && password){
    localStorage.setItem('username',username);

    window.location.href = 'tracker.html';
}
else{
    document.getElementById('error-message').textContent = 'Please enter both username and password. ';
}