document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message');

    if(validateEmail(email)){
        message.textContent = `A reset link has been sent to ${email}`;

    } else{
        message.textContent = "Please enter your valid email address.";
        message.style.color = "red";
    }

});

function validateEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
    