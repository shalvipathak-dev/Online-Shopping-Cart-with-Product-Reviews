// GET ELEMENTS

let loginForm = document.getElementById("loginForm");

let loginEmail = document.getElementById("loginEmail");

let loginPassword = document.getElementById("loginPassword");

let togglePassword = document.getElementById("togglePassword");

let loginMessage = document.getElementById("loginMessage");

let rememberMe = document.getElementById("rememberMe");


// SHOW / HIDE PASSWORD

togglePassword.addEventListener("click", function() {

    if (loginPassword.type === "password") {

        loginPassword.type = "text";

        togglePassword.innerText = "Hide";

    } else {

        loginPassword.type = "password";

        togglePassword.innerText = "Show";

    }

});


// LOGIN FORM

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    let emailValue = loginEmail.value.trim();

    let passwordValue = loginPassword.value;


    // CHECK EMAIL

    if (emailValue === "") {

        showLoginMessage("Please enter your email address.", "error");

        return;

    }


    // CHECK PASSWORD

    if (passwordValue.length < 8) {

        showLoginMessage(
            "Password must contain at least 8 characters.",
            "error"
        );

        return;

    }


    // DEMO LOGIN

    showLoginMessage(
        "Login form submitted successfully! Demo only.",
        "success"
    );


    // REMEMBER EMAIL ONLY

    if (rememberMe.checked) {

        localStorage.setItem("rememberedEmail", emailValue);

    } else {

        localStorage.removeItem("rememberedEmail");

    }

});


// DISPLAY MESSAGE

function showLoginMessage(message, type) {

    loginMessage.innerText = message;

    if (type === "success") {

        loginMessage.style.color = "#4ed9a0";

    } else {

        loginMessage.style.color = "#ff647c";

    }

}


// FORGOT PASSWORD

let forgotPassword = document.getElementById("forgotPassword");

forgotPassword.addEventListener("click", function(event) {

    event.preventDefault();

    alert("Password reset feature will be added later.");

});


// LOAD REMEMBERED EMAIL

let savedEmail = localStorage.getItem("rememberedEmail");

if (savedEmail) {

    loginEmail.value = savedEmail;

    rememberMe.checked = true;

}


// MOBILE MENU

let menuBtn = document.getElementById("menuBtn");

let navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("open");

});