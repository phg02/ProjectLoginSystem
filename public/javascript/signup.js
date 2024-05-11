const togglePassword = document
    .querySelector('#togglePassword');
const password = document.querySelector('#password');
togglePassword.addEventListener('click', () => {
    // Toggle the type attribute using
    // getAttribure() method
    const type = password
        .getAttribute('type') === 'password' ?
        'text' : 'password';
    password.setAttribute('type', type);
    // Toggle the eye and bi-eye icon
    togglePassword.classList.toggle('bi-eye');
    togglePassword.classList.toggle('bi-eye-slash');
});

const togglePassword2 = document
    .querySelector('#togglePassword2');
const password2 = document.querySelector('#confirm-password');
togglePassword2.addEventListener('click', () => {
    // Toggle the type attribute using
    // getAttribure() method
    const type = password2
        .getAttribute('type') === 'password' ?
        'text' : 'password';
    password2.setAttribute('type', type);
    // Toggle the eye and bi-eye icon
    togglePassword2.classList.toggle('bi-eye');
    togglePassword2.classList.toggle('bi-eye-slash');
});


const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    //documents
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');
    const consent = document.querySelector('#consent');

    //regrex
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/;
    const numbers = /[0-9]/;
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    //remove error
    username.classList.remove('error-input');
    email.classList.remove('error-input');
    password.classList.remove('error-input');
    confirmPassword.classList.remove('error-input');


    let error = false;
    const regrex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let errorList = '';

    if (username.value === '' || username.value === null) {
        error = true;
        username.classList.add('error-input');
        username.focus();
        errorList += '<li>Username is required</li>';
    }
    if (email.value === '' || email.value == null) {
        error = true;
        email.classList.add('error-input');
        email.focus();
        errorList += '<li>Email is required</li>';

    }
    if (regrex.test(email.value) === false) {
        error = true;
        email.classList.add('error-input');
        email.focus();
        errorList += '<li>Email is invalid</li>';
    }
    if (password.value === '' || password.value == null) {
        error = true;
        password.classList.add('error-input');
        password.focus();
        errorList += '<li>Please enter a password</li>';

    }
    if (password.value.length < 8) {
        error = true;
        password.classList.add('error-input');
        password.focus();
        errorList += '<li>Password must be at least 8 character</li>';

    }
    if (!lowerCaseLetters.test(password.value)) {
        error = true;
        password.classList.add('error-input');
        password.focus();
        errorList += '<li>Password must contain a lowercase letter</li>';

    }

    if (!upperCaseLetters.test(password.value)) {
        error = true;
        password.classList.add('error-input');
        password.focus();
        errorList += '<li>Password must contain a uppercase letter</li>';

    }
    if (!numbers.test(password.value)) {
        error = true;
        password.classList.add('error-input');
        password.focus();
        errorList += '<li>Password must contain a number letter</li>';
    }

    if (!specialCharacters.test(password.value)) {
        error = true;
        password.classList.add('error-input');
        password.focus();
        errorList += '<li>Password must contain a special character</li>';

    }
    if (password.value !== confirmPassword.value) {
        error = true;
        password.classList.add('error-input');
        confirmPassword.classList.add('error-input');
        errorList += '<li>Password not match</li>';
    }
    if (!consent.checked) {
        error = true;
        password.classList.add('error-input');
        confirmPassword.classList.add('error-input');
        errorList += '<li>Please agree the policy</li>';
    }
    if (grecaptcha.getResponse().length <= 0) {
        error = true;
        password.classList.add('error-input');
        confirmPassword.classList.add('error-input');
        errorList += '<li>Please complete the captcha</li>';
    }


    let errors = "<ul class='error-list'>" + errorList + "</ul>";
    if (error == true) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: errors
        });
        return
    }
    form.submit();
})


const username = document.querySelector('#username');
const email = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');


username.addEventListener('input', () => {
    if (username.value !== '' || username.value !== null) {
        username.classList.remove('error-input');  
    }
});

email.addEventListener('change', () => {
    let error = true;
    const regrex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value !== '' || email.value !== null) {
        console.log('email1')
        error = false;
    }
    if (regrex.test(email.value) !== false) {
        console.log('email2')
        error = false;
    }
    if(error == false){
        email.classList.remove('error-input');
        console.log('result')
    }
});

inputPassword.addEventListener('input', () => {
    let error = true;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/;
    const numbers = /[0-9]/;
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (inputPassword.value !== '' || inputPassword.value !== null) {
        error = false;
    }
    if (inputPassword.value.length >= 8) {
        error = false;
    }
    if (lowerCaseLetters.test(inputPassword.value)) {
        error = false;
    }
    if (upperCaseLetters.test(inputPassword.value)) {
        error = false;
    }
    if (numbers.test(inputPassword.value)) {
        error = false;
    }
    if (specialCharacters.test(inputPassword.value)) {
        error = false;
    }
    if (error == false) {
        inputPassword.classList.remove('error-input');
    }
});

confirmPassword.addEventListener('input', () => {
    const inputPassword = document.querySelector('#password');
    let error = true;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/;
    const numbers = /[0-9]/;
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (confirmPassword.value !== '' || confirmPassword.value !== null) {
        error = false;
    }
    if (confirmPassword.value.length >= 8) {
        error = false;
    }
    if (lowerCaseLetters.test(confirmPassword.value)) {
        error = false;
    }
    if (lowerCaseLetters.test(confirmPassword.value)) {
        error = false;
    }
    if (numbers.test(confirmPassword.value)) {
        error = false;
    }
    if (specialCharacters.test(confirmPassword.value)) {
        error = false;
    }
    if(confirmPassword.value === inputPassword.value){
        error = false;
    }
    if (error == false) {
        inputPassword.classList.remove('error-input');
        confirmPassword.classList.remove('error-input');
    }
});