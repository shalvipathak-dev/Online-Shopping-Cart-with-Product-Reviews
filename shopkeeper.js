// =====================================
// SHOPEASE - SHOPKEEPER DASHBOARD
// =====================================


// GET HTML ELEMENTS

const productForm = document.getElementById("productForm");
const productList = document.getElementById("sellerProductList");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productStock = document.getElementById("productStock");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");

const formMessage = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");


// =====================================
// LOAD SAVED PRODUCTS
// =====================================

let sellerProducts = JSON.parse(
    localStorage.getItem("sellerProducts")
) || [];

let editProductId = null;


// =====================================
// SAVE PRODUCTS
// =====================================

function saveProducts() {

    localStorage.setItem(
        "sellerProducts",
        JSON.stringify(sellerProducts)
    );

}


// =====================================
// REFRESH PRODUCTS FROM STORAGE
// =====================================

function refreshProducts() {

    sellerProducts = JSON.parse(
        localStorage.getItem("sellerProducts")
    ) || [];

    displayProducts();

}


// =====================================
// UPDATE DASHBOARD STATISTICS
// =====================================

function updateDashboard() {

    // TOTAL PRODUCTS

    document.getElementById("totalProducts").innerText =
        sellerProducts.length;


    // TOTAL STOCK

    let totalStock = sellerProducts.reduce(
        function(total, product) {

            return total + Number(product.stock || 0);

        }, 0
    );


    // TOTAL INVENTORY VALUE

    let totalValue = sellerProducts.reduce(
        function(total, product) {

            return total +
                (Number(product.price) * Number(product.stock || 0));

        }, 0
    );


    document.getElementById("totalStock").innerText =
        totalStock;


    document.getElementById("totalValue").innerText =
        "₹" + totalValue.toLocaleString("en-IN");


    document.getElementById("productCount").innerText =
        sellerProducts.length + " Products";

}


// =====================================
// DISPLAY PRODUCTS
// =====================================

function displayProducts() {

    productList.innerHTML = "";


    // EMPTY STATE

    if (sellerProducts.length === 0) {

        productList.innerHTML = `
            <div class="empty-state">
                <span>📦</span>
                <h3>No Products Added Yet</h3>
                <p>Your added products will appear here.</p>
            </div>
        `;

        updateDashboard();

        return;

    }


    // PRODUCT CARDS

    sellerProducts.forEach(function(product) {

        let card = document.createElement("div");

        card.className = "seller-product-card";


        // IMAGE

        let image = document.createElement("img");

        image.src = product.image || "";
        image.alt = product.name;


        // PRODUCT INFORMATION

        let info = document.createElement("div");

        info.className = "seller-product-info";


        // NAME

        let name = document.createElement("h3");

        name.innerText = product.name;


        // PRICE

        let price = document.createElement("p");

        price.className = "price";

        price.innerText =
            "₹" + Number(product.price).toLocaleString("en-IN");


        // CATEGORY

        let category = document.createElement("p");

        category.innerText =
            "Category: " + product.category;


        // STOCK

        let stock = document.createElement("p");

        let availableStock = Number(product.stock || 0);

        stock.className = "stock-status";

        if (availableStock > 0) {

            stock.innerText =
                "Stock: " + availableStock + " | In Stock";

        } else {

            stock.innerText =
                "Stock: 0 | Out of Stock";

        }


        // DESCRIPTION

        let description = document.createElement("p");

        description.innerText = product.description || "";


        // ACTION BUTTONS

        let actions = document.createElement("div");

        actions.className = "product-actions";


        // EDIT BUTTON

        let editButton = document.createElement("button");

        editButton.className = "edit-btn";

        editButton.innerText = "Edit";

        editButton.addEventListener("click", function() {

            editProduct(product.id);

        });


        // DELETE BUTTON

        let deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", function() {

            deleteProduct(product.id);

        });


        // BUILD CARD

        actions.append(editButton, deleteButton);

        info.append(
            name,
            price,
            category,
            stock,
            description,
            actions
        );

        card.append(image, info);

        productList.appendChild(card);

    });


    // UPDATE STATISTICS

    updateDashboard();

}


// =====================================
// ADD OR UPDATE PRODUCT
// =====================================

productForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // GET LATEST PRODUCTS

    sellerProducts = JSON.parse(
        localStorage.getItem("sellerProducts")
    ) || [];


    // GET FORM VALUES

    let name = productName.value.trim();

    let price = Number(productPrice.value);

    let category = productCategory.value;

    let stock = Number(productStock.value);

    let description = productDescription.value.trim();

    let file = productImage.files[0];


    // VALIDATION

    if (
        !name ||
        !category ||
        !description ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !Number.isInteger(stock) ||
        stock < 0
    ) {

        formMessage.innerText =
            "Please enter valid product details.";

        return;

    }


    // IMAGE VALIDATION

    if (file && (

        !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size > 2 * 1024 * 1024

    )) {

        formMessage.innerText =
            "Choose a JPG, PNG or WEBP image under 2 MB.";

        return;

    }


    // FIND EXISTING PRODUCT

    let existingProduct = sellerProducts.find(
        function(product) {

            return product.id === editProductId;

        }
    );


    // UPDATE EXISTING PRODUCT

    if (existingProduct) {

        existingProduct.name = name;

        existingProduct.price = price;

        existingProduct.category = category;

        existingProduct.stock = stock;

        existingProduct.description = description;


        // UPDATE IMAGE IF NEW IMAGE SELECTED

        if (file) {

            let reader = new FileReader();

            reader.onload = function() {

                existingProduct.image = reader.result;

                finishSave("Product updated successfully!");

            };

            reader.readAsDataURL(file);

            return;

        }


        finishSave("Product updated successfully!");

        return;

    }


    // NEW PRODUCT REQUIRES IMAGE

    if (!file) {

        formMessage.innerText =
            "Please select a product image.";

        return;

    }


    // READ NEW PRODUCT IMAGE

    let reader = new FileReader();

    reader.onload = function() {

        let newProduct = {

            id: Date.now(),

            name: name,

            price: price,

            category: category,

            stock: stock,

            description: description,

            image: reader.result

        };


        sellerProducts.push(newProduct);


        finishSave("Product added successfully!");

    };


    reader.readAsDataURL(file);

});


// =====================================
// SAVE AND RESET FORM
// =====================================

function finishSave(message) {

    saveProducts();

    productForm.reset();

    editProductId = null;

    submitBtn.innerText = "+ Add Product";

    formMessage.innerText = message;

    displayProducts();

}


// =====================================
// EDIT PRODUCT
// =====================================

function editProduct(id) {

    // GET LATEST DATA

    sellerProducts = JSON.parse(
        localStorage.getItem("sellerProducts")
    ) || [];


    let product = sellerProducts.find(
        function(item) {

            return item.id === id;

        }
    );


    if (!product) return;


    editProductId = id;


    // FILL FORM

    productName.value = product.name;

    productPrice.value = product.price;

    productCategory.value = product.category;

    productStock.value = product.stock;

    productDescription.value = product.description;


    submitBtn.innerText = "Update Product";

    formMessage.innerText =
        "Editing: " + product.name;


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =====================================
// DELETE PRODUCT
// =====================================

function deleteProduct(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );


    if (!confirmDelete) return;


    // GET LATEST DATA

    sellerProducts = JSON.parse(
        localStorage.getItem("sellerProducts")
    ) || [];


    // REMOVE PRODUCT

    sellerProducts = sellerProducts.filter(
        function(product) {

            return product.id !== id;

        }
    );


    // RESET FORM IF SAME PRODUCT WAS BEING EDITED

    if (editProductId === id) {

        editProductId = null;

        productForm.reset();

        submitBtn.innerText = "+ Add Product";

    }


    saveProducts();

    displayProducts();

}


// =====================================
// AUTOMATIC STOCK UPDATE
// =====================================

// When products are changed from another browser tab,
// refresh the seller dashboard automatically.

window.addEventListener("storage", function(event) {

    if (event.key === "sellerProducts") {

        refreshProducts();

    }

});


// =====================================
// INITIAL LOAD
// =====================================

displayProducts();