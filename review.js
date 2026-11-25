// GET ELEMENTS

let reviewForm = document.getElementById("reviewForm");

let reviewName = document.getElementById("reviewName");

let reviewEmail = document.getElementById("reviewEmail");

let reviewProduct = document.getElementById("reviewProduct");

let reviewMessage = document.getElementById("reviewMessage");

let reviewFormMessage =
    document.getElementById("reviewFormMessage");

let starButtons = document.querySelectorAll(
    ".star-selector button"
);

let ratingText = document.getElementById("ratingText");

let reviewList = document.getElementById("reviewList");

let averageRating = document.getElementById("averageRating");

let totalReviews = document.getElementById("totalReviews");

let reviewCountLabel = document.getElementById("reviewCountLabel");


// SELECTED RATING

let selectedRating = 0;


// LOAD SAVED REVIEWS

let savedReviews =
    JSON.parse(localStorage.getItem("shopReviews")) || [];


// STAR RATING

starButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        selectedRating = Number(button.dataset.rating);

        starButtons.forEach(function(star) {

            let rating = Number(star.dataset.rating);

            if (rating <= selectedRating) {

                star.classList.add("active");

            } else {

                star.classList.remove("active");

            }

        });

        ratingText.innerText =
            selectedRating + " out of 5 stars";

    });

});


// SUBMIT REVIEW

reviewForm.addEventListener("submit", function(event) {

    event.preventDefault();


    let name = reviewName.value.trim();

    let email = reviewEmail.value.trim();

    let product = reviewProduct.value;

    let message = reviewMessage.value.trim();


    if (name.length < 2) {

        showMessage("Please enter a valid name.", "error");

        return;

    }


    if (selectedRating === 0) {

        showMessage("Please select a star rating.", "error");

        return;

    }


    if (message.length < 10) {

        showMessage(
            "Please write at least 10 characters.",
            "error"
        );

        return;

    }


    // CREATE REVIEW OBJECT

    let review = {

        name: name,

        email: email,

        product: product,

        rating: selectedRating,

        message: message

    };


    // SAVE REVIEW

    savedReviews.unshift(review);

    localStorage.setItem(
        "shopReviews",
        JSON.stringify(savedReviews)
    );


    // UPDATE DISPLAY

    displayReviews();


    // SUCCESS MESSAGE

    showMessage("Thank you! Your review has been submitted.", "success");


    // RESET FORM

    reviewForm.reset();

    selectedRating = 0;

    starButtons.forEach(function(star) {

        star.classList.remove("active");

    });

    ratingText.innerText = "Select your rating";

});


// DISPLAY REVIEWS

function displayReviews() {

    // SHOW SAVED REVIEWS

    savedReviews.forEach(function(review) {

        let card = document.createElement("article");

        card.className = "review-card";


        let stars = "★".repeat(review.rating) +
                    "☆".repeat(5 - review.rating);


        // SAFELY ADD CUSTOMER CONTENT

        let top = document.createElement("div");

        top.className = "review-card-top";

        let avatar = document.createElement("div");

        avatar.className = "customer-avatar";

        avatar.textContent = review.name.charAt(0).toUpperCase();

        let info = document.createElement("div");

        let heading = document.createElement("h3");

        heading.textContent = review.name;

        let productName = document.createElement("p");

        productName.textContent = review.product;

        info.appendChild(heading);

        info.appendChild(productName);

        top.appendChild(avatar);

        top.appendChild(info);


        let starDiv = document.createElement("div");

        starDiv.className = "customer-stars";

        starDiv.textContent = stars;


        let message = document.createElement("p");

        message.className = "customer-review-text";

        message.textContent = review.message;


        card.appendChild(top);

        card.appendChild(starDiv);

        card.appendChild(message);

        reviewList.prepend(card);

    });


    // UPDATE RATING

    let allRatings = savedReviews.map(function(review) {

        return review.rating;

    });


    // DEMO REVIEWS HAVE THEIR OWN RATINGS

    let demoRatings = [5, 5, 4];

    let combinedRatings = demoRatings.concat(allRatings);

    let total = combinedRatings.reduce(function(sum, rating) {

        return sum + rating;

    }, 0);

    let average = total / combinedRatings.length;


    averageRating.innerText = average.toFixed(1);

    totalReviews.innerText =
        "Based on " + combinedRatings.length + " reviews";

    reviewCountLabel.innerText =
        combinedRatings.length + " Reviews";

}


// SHOW MESSAGE

function showMessage(message, type) {

    reviewFormMessage.innerText = message;

    reviewFormMessage.style.color =
        type === "success" ? "#4ed9a0" : "#ff647c";

}


// MOBILE MENU

let menuBtn = document.getElementById("menuBtn");

let navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("open");

});


// INITIAL DISPLAY

displayReviews();