document.getElementById('registerForm').addEventListener('submit',function(event){
    event.preventDefault();

    //Clear previous error Messages
    clearErrors();


    //Get form message
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    //Validation For Name
    if(name ==='' || name.length <3){
        showError('nameError','Name must be at least 3 characters long');
        document.getElementById('name').classList.add('invalid');
        isValid = false;
    }

    //Email Validation
    if(!isvalidEmail(email)){
        showError('emailError','Please Enter a Valid Email');
        document.getElementById('email').classList.add('invalid');
        isValid = false;
    }

    //Phone Validation
    if(!isvalidPhone(phone)){
        showError('phoneError','Please Enter a Valid Phone');
        document.getElementById('phone').classList.add('invalid');
        isValid = false;
    }

    //Password Validation
    if(password.length <6){
        showError('passwordError','Password must be at least 6 characters long');
        document.getElementById('password').classList.add('invalid');
        isValid = false;
    }

    if(isValid){
        alert('Registration successful!');
        console.log({
            name:name.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
        });
    }
    name.value = '';
    email.value = '';
    phone.value = '';
    password.value ='';
}); 

    function clearErrors(){
        const errorMessages = document.querySelectorAll('.error-message')
        errorMessages.forEach(message => message.computedStyleMap.display='none');

        const invalidInput = document.querySelectorAll('input.valid');
        invalidInput.forEach(input => input.classList.remove(invalid));
    }

    function isvalidEmail(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isvalidPhone(phone){
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    }
    