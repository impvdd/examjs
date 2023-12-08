const toSign = document.querySelector('.to__signUp')
const toLogin = document.querySelector('.to__login')
const loginPage = document.querySelector('.login')
const signUpPage = document.querySelector('.signUp')
const createAccountBtn = document.querySelector('.signUp__btn')



let usernameFlag = false

const email = document.getElementById('login__email')
const signUpUsername = document.getElementById('signUp__username')
const signUpPassword = document.getElementById('singUp__password')
const signUpPasswordAgain = document.getElementById('login__password-again')

const passwordError = document.querySelector('.under__password')
const passwordAgainError = document.querySelector('.under__password-again')
const emailError = document.querySelector('.under__mail')   

//signIn

createAccountBtn.addEventListener('click', () => {
    const userEmail = email.value;
    const username = signUpUsername.value;
    const password = signUpPassword.value;
    const confirmPassword = signUpPasswordAgain.value;

    if (password.length < 7) {
        alert('Password must contain at least 8 characters')
        passwordError.innerHTML = '*Something went wrong'
        passwordAgainError.innerHTML = '*Something went wrong'
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        passwordError.innerHTML = '*Passwords do not match'
        passwordAgainError.innerHTML = '*Passwords do not match'
        return;
    }

    if (localStorage.getItem(userEmail)) {
        alert('User with this email already exists. Please use a different email.');
        emailError.innerHTML = '*User with this email already exists'
        return;
    }


    const newUser = {
        username: username,
        password: password,
        
    };
    localStorage.setItem(userEmail, JSON.stringify(newUser));
    


    alert('Registration successful!');
    loginPage.style.display = "flex"
    signUpPage.style.display = 'none'


    email.value = '';
    signUpUsername.value = '';
    signUpPassword.value = '';
    signUpPasswordAgain.value = '';
});


toSign.addEventListener('click', () => {
    loginPage.style.display = 'none'
    signUpPage.style.display = 'flex'
})
toLogin.addEventListener('click', () => {
    loginPage.style.display = 'flex'
    signUpPage.style.display = 'none'
})

//-----------------------------------------------------------
//login
const loginEmail = document.getElementById('login__username');
const password = document.getElementById('login__password');
const loginBtn = document.querySelector('.login__btn');




loginBtn.addEventListener('click', () => {
    const userEmail = loginEmail.value;
    const userPassword = password.value;


    if (!localStorage.getItem(userEmail)) {
        alert('User does not exist. Please register.');
        return;
    }


    const userData = JSON.parse(localStorage.getItem(userEmail));

    if (userData.password === userPassword) {
        alert('Login successful!');
        window.location.href = './index.html'
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('allUsers', userData.username)
        loggedInStatus.textContent = 'Logged In';
        
    } else {
        alert('Incorrect password. Please try again.');
    }

    loginEmail.value = '';
    password.value = '';
    
});

