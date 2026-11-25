let cart = JSON.parse(localStorage.getItem("shopCart")) || [];


// SAVE CART

function saveCart() {

    localStorage.setItem("shopCart", JSON.stringify(cart));

}


// UPDATE CART COUNT

function updateCartCount() {

    let count = cart.reduce(function(total, item) {

        return total + item.quantity;

    }, 0);

    let counter = document.getElementById("cart-count");

    if (counter) {

        counter.innerText = count;

    }

}


// ADD PRODUCT TO CART

function addToCart(name, price) {

    let existingProduct = cart.find(function(item) {

        return item.name === name;

    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    alert(name + " added to your cart!");

}


// INITIAL UPDATE

updateCartCount();