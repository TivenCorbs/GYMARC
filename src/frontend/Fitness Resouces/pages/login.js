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
  

