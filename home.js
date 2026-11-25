// MOBILE MENU

let menuBtn = document.getElementById("menuBtn");
let navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("open");

});


// CLOSE MENU AFTER CLICKING A LINK

let navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("open");

    });

});


// WISHLIST BUTTON

let wishlistButtons = document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {

            button.innerText = "♥";

        } else {

            button.innerText = "♡";

        }

    });

});


// SCROLL ANIMATION

let animatedElements = document.querySelectorAll(
    ".section, .trust-item, .promo-section, .newsletter"
);

animatedElements.forEach(function(element) {

    element.classList.add("reveal");

});

let observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.12
});

animatedElements.forEach(function(element) {

    observer.observe(element);

});


// NEWSLETTER

let newsletterForm = document.getElementById("newsletter-form");

newsletterForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let email = document.getElementById("newsletter-email").value;

    let message = document.getElementById("newsletter-message");

    message.style.color = "#55b5ff";

    message.innerText = "Thanks for subscribing!";

    newsletterForm.reset();

});