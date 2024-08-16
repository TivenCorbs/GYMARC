document.addEventListener('DOMContentLoaded',function() {
    const savedUsername = localStorage.getItem('username');
    if(savedUsername){
        document.getElementById('username').value = savedUsername;
    }
});
document.querySelector('.register-today').addEventListener('click', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'New User', email: 'newuser@example.com' })
    });
  
    const data = await response.json();
    console.log(data);
  });
  

  function auth(){
    var email = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    
    //Retrieve stored credential from localStorage
    var storedEmail = localStorage.getItem("userEmail");
    var storedPassword = localStorage.getItem("userPassword");

    //Basic authentication check
    if(email === storedEmail && pass ===storedPassword){
      alert("Login sucessful!");
      window.location.href = "dashboard.html";
      return false;

    }else{
      alert("Invalid email or password. Please try again.")
      return false;
    }
  }