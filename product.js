// =====================================
// SHOPEASE - PRODUCTS PAGE
// =====================================


// GET HTML ELEMENTS

let searchInput = document.getElementById("searchInput");
let sortSelect = document.getElementById("sortSelect");
let filterButtons = document.querySelectorAll(".filter-btn");

let productGrid = document.getElementById("productGrid");
let resultCount = document.getElementById("resultCount");
let noProducts = document.getElementById("noProducts");

let selectedCategory = "All";


// =====================================
// GET EXISTING HTML PRODUCTS
// =====================================

let products = Array.from(
    document.querySelectorAll(".shop-product-card")
);


// =====================================
// LOAD SELLER PRODUCTS
// =====================================

let sellerProducts = JSON.parse(
    localStorage.getItem("sellerProducts")
) || [];


// =====================================
// CREATE SELLER PRODUCT CARDS
// =====================================

sellerProducts.forEach(function(product) {

    let card = document.createElement("article");

    card.className = "shop-product-card";

    card.dataset.name = product.name.toLowerCase();
    card.dataset.category = product.category;
    card.dataset.price = product.price;

    // IMAGE SECTION

    let imageBox = document.createElement("div");
    imageBox.className = "shop-product-image";

    let label = document.createElement("span");
    label.className = "sale-label";
    label.innerText = "SELLER PRODUCT";

    let wishlist = document.createElement("button");
    wishlist.className = "shop-wishlist";
    wishlist.innerText = "♡";
    wishlist.setAttribute("aria-label", "Add to wishlist");

    let image = document.createElement("img");
    image.src = product.image || "";
    image.alt = product.name;

    imageBox.appendChild(label);
    imageBox.appendChild(wishlist);

    if (product.image) {
        imageBox.appendChild(image);
    }


    // PRODUCT INFORMATION

    let info = document.createElement("div");
    info.className = "shop-product-info";

    let category = document.createElement("span");
    category.className = "shop-category";
    category.innerText = product.category.toUpperCase();

    let name = document.createElement("h3");
    name.innerText = product.name;

    let description = document.createElement("p");
    description.innerText = product.description || "";


    // PRICE

    let priceBox = document.createElement("div");
    priceBox.className = "shop-price";

    let price = document.createElement("strong");

    price.innerText =
        "₹" + Number(product.price).toLocaleString("en-IN");

    priceBox.appendChild(price);


    // STOCK

    let stock = document.createElement("p");

    stock.innerText = "Stock: " + product.stock;


    // ADD TO CART BUTTON

    let addButton = document.createElement("button");

    addButton.className = "shop-add-btn";
    addButton.innerText = "Add to Cart +";


    // CHECK INITIAL STOCK

    if (Number(product.stock) <= 0) {

        addButton.innerText = "Out of Stock";
        addButton.disabled = true;

    } else {

        // ADD TO CART EVENT

        addButton.addEventListener("click", function() {

            // GET LATEST SELLER PRODUCTS

            let latestProducts = JSON.parse(
                localStorage.getItem("sellerProducts")
            ) || [];


            // FIND CURRENT PRODUCT

            let currentProduct = latestProducts.find(function(item) {

                return item.id === product.id;

            });


            // CHECK STOCK

            if (!currentProduct || Number(currentProduct.stock) <= 0) {

                alert("Sorry! Product is out of stock.");

                addButton.innerText = "Out of Stock";
                addButton.disabled = true;

                stock.innerText = "Stock: 0";

                return;

            }


            // CHECK CART FUNCTION

            if (typeof addToCart !== "function") {

                alert("Cart system is not loaded!");

                return;

            }


            // ADD PRODUCT TO CART

            addToCart(
                product.name,
                Number(product.price)
            );


            // DECREASE STOCK

            currentProduct.stock =
                Number(currentProduct.stock) - 1;


            // SAVE UPDATED STOCK

            localStorage.setItem(
                "sellerProducts",
                JSON.stringify(latestProducts)
            );


            // UPDATE PRODUCT CARD

            product.stock = currentProduct.stock;

            stock.innerText =
                "Stock: " + currentProduct.stock;


            // OUT OF STOCK CHECK

            if (Number(currentProduct.stock) <= 0) {

                addButton.innerText = "Out of Stock";
                addButton.disabled = true;

            }

        });

    }


    // BUILD PRODUCT CARD

    info.appendChild(category);
    info.appendChild(name);
    info.appendChild(description);
    info.appendChild(priceBox);
    info.appendChild(stock);
    info.appendChild(addButton);

    card.appendChild(imageBox);
    card.appendChild(info);

    productGrid.appendChild(card);

});


// =====================================
// GET ALL PRODUCTS
// INCLUDING SELLER PRODUCTS
// =====================================

products = Array.from(
    document.querySelectorAll(".shop-product-card")
);


// =====================================
// SEARCH, FILTER AND SORT
// =====================================

function filterProducts() {

    let searchText = searchInput.value.toLowerCase();

    let visibleProducts = [];


    // SEARCH AND CATEGORY FILTER

    products.forEach(function(product) {

        let name = product.dataset.name.toLowerCase();

        let category = product.dataset.category.toLowerCase();

        let matchesSearch = name.includes(searchText);

        let matchesCategory =
            selectedCategory === "All" ||
            category === selectedCategory.toLowerCase();


        if (matchesSearch && matchesCategory) {

            visibleProducts.push(product);

        }

    });


    // SORT PRODUCTS

    let sortValue = sortSelect.value;


    if (sortValue === "low") {

        visibleProducts.sort(function(a, b) {

            return Number(a.dataset.price) -
                   Number(b.dataset.price);

        });

    }

    else if (sortValue === "high") {

        visibleProducts.sort(function(a, b) {

            return Number(b.dataset.price) -
                   Number(a.dataset.price);

        });

    }

    else if (sortValue === "name") {

        visibleProducts.sort(function(a, b) {

            return a.dataset.name.localeCompare(b.dataset.name);

        });

    }


    // HIDE ALL PRODUCTS

    products.forEach(function(product) {

        product.style.display = "none";

    });


    // DISPLAY FILTERED PRODUCTS

    visibleProducts.forEach(function(product) {

        product.style.display = "block";

        productGrid.appendChild(product);

    });


    // UPDATE RESULT COUNT

    resultCount.innerText =
        "Showing " + visibleProducts.length + " products";


    // NO PRODUCTS MESSAGE

    if (visibleProducts.length === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }

}


// =====================================
// SEARCH EVENT
// =====================================

searchInput.addEventListener("input", filterProducts);


// =====================================
// SORT EVENT
// =====================================

sortSelect.addEventListener("change", filterProducts);


// =====================================
// CATEGORY FILTER
// =====================================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterProducts();

    });

});


// =====================================
// WISHLIST
// =====================================

productGrid.addEventListener("click", function(event) {

    let button = event.target.closest(".shop-wishlist");

    if (!button) return;

    button.classList.toggle("liked");

    if (button.classList.contains("liked")) {

        button.innerText = "♥";

    } else {

        button.innerText = "♡";

    }

});


// =====================================
// IMAGE PREVIEW
// =====================================

let modal = document.getElementById("imageModal");

let previewImage = document.getElementById("previewImage");

let closeModal = document.getElementById("closeModal");


productGrid.addEventListener("click", function(event) {

    let image = event.target.closest(".shop-product-image img");

    if (!image) return;

    previewImage.src = image.src;

    modal.classList.add("active");

});


// =====================================
// CLOSE IMAGE PREVIEW
// =====================================

closeModal.addEventListener("click", function() {

    modal.classList.remove("active");

});


modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        modal.classList.remove("active");

    }

});


// =====================================
// MOBILE MENU
// =====================================

let menuBtn = document.getElementById("menuBtn");

let navLinks = document.getElementById("navLinks");


menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("open");

});


// =====================================
// INITIAL DISPLAY
// =====================================

filterProducts();