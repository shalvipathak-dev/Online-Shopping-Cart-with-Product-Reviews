// GET HTML ELEMENTS

let cartItems = document.getElementById("cart-items");

let emptyCart = document.getElementById("empty-cart");

let subtotalElement = document.getElementById("subtotal");

let deliveryElement = document.getElementById("delivery");

let discountElement = document.getElementById("discount");

let totalElement = document.getElementById("total");

let itemCount = document.getElementById("item-count");

let cartCount = document.getElementById("cart-count");

let couponInput = document.getElementById("coupon");

let couponMessage = document.getElementById("coupon-message");

let applyCoupon = document.getElementById("applyCoupon");

let checkoutBtn = document.getElementById("checkoutBtn");


// LOAD CART

//let cart = JSON.parse(localStorage.getItem("shopCart")) || [];

let discount = 0;


// SAVE CART

function saveCart() {

    localStorage.setItem("shopCart", JSON.stringify(cart));

}


// DISPLAY CART

function displayCart() {

    cartItems.innerHTML = "";

    let subtotal = 0;

    let totalQuantity = 0;


    if (cart.length === 0) {

        emptyCart.style.display = "block";

        cartItems.style.display = "none";

    } else {

        emptyCart.style.display = "none";

        cartItems.style.display = "block";

    }


    cart.forEach(function(item, index) {

        let itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        totalQuantity += item.quantity;


        let div = document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <img src="${item.image || 'https://placehold.co/200x200/101a2d/55b5ff?text=ShopEase'}"
                 alt="${item.name}">

            <div class="cart-item-details">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <div class="quantity-box">

                    <button onclick="changeQuantity(${index}, -1)">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">+</button>

                </div>

            </div>

            <button class="remove-item"
                onclick="removeItem(${index})">
                Remove
            </button>

        `;


        cartItems.appendChild(div);

    });


    // DELIVERY CHARGE

    let delivery = subtotal === 0 || subtotal >= 1999 ? 0 : 49;


    // DISCOUNT

    if (discount > subtotal) {
        discount = 0;
    }


    // FINAL TOTAL

    let finalTotal = subtotal + delivery - discount;


    // UPDATE VALUES

    subtotalElement.innerText = "₹" + subtotal;

    deliveryElement.innerText =
        delivery === 0 ? "FREE" : "₹" + delivery;

    discountElement.innerText = "₹" + discount;

    totalElement.innerText = "₹" + finalTotal;


    itemCount.innerText = totalQuantity + " Items";

    cartCount.innerText = totalQuantity;


    checkoutBtn.disabled = cart.length === 0;

}


// CHANGE QUANTITY

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

    displayCart();

}


// REMOVE PRODUCT

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}


// APPLY COUPON

applyCoupon.addEventListener("click", function() {

    let code = couponInput.value.trim().toUpperCase();

    let subtotal = cart.reduce(function(total, item) {

        return total + item.price * item.quantity;

    }, 0);


    if (subtotal === 0) {

        couponMessage.innerText = "Add products first.";

        couponMessage.style.color = "#ff647c";

        return;

    }


    if (code === "SAVE10") {

        discount = Math.round(subtotal * 0.10);

        couponMessage.innerText = "10% discount applied!";

        couponMessage.style.color = "#4ed9a0";

    } else {

        discount = 0;

        couponMessage.innerText = "Invalid coupon code.";

        couponMessage.style.color = "#ff647c";

    }


    displayCart();

});


// CHECKOUT

checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    alert("Checkout page will be connected soon!");

});


// MOBILE MENU

let menuBtn = document.getElementById("menuBtn");

let navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("open");

});


// INITIAL DISPLAY

displayCart();