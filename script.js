// SmartBuy - script.js

// ---- PRODUCT DATA ----
// Each product is an object with these properties:
// id, name, category, price, oldPrice, rating, badge, emoji, bg (background colour)

var products = [
  { id: 1,  name: "Wireless Earbuds Pro",      category: "electronics", price: 7499,  oldPrice: 10999, rating: 4.8, badge: "SALE", emoji: "🎧", bg: "#e8f0fe" },
  { id: 2,  name: "Smart Watch Series X",       category: "electronics", price: 16999, oldPrice: null,  rating: 4.6, badge: "NEW",  emoji: "⌚", bg: "#f0e8fe" },
  { id: 3,  name: "Bluetooth Speaker",          category: "electronics", price: 4999,  oldPrice: 6999,  rating: 4.5, badge: "SALE", emoji: "🔊", bg: "#fef3e8" },
  { id: 4,  name: "Laptop Stand",               category: "electronics", price: 3799,  oldPrice: null,  rating: 4.7, badge: null,   emoji: "💻", bg: "#e8fef0" },
  { id: 5,  name: "Premium Sunglasses",         category: "fashion",     price: 9999,  oldPrice: 13499, rating: 4.9, badge: "SALE", emoji: "🕶️", bg: "#fee8e8" },
  { id: 6,  name: "Leather Tote Bag",           category: "fashion",     price: 7499,  oldPrice: null,  rating: 4.4, badge: "NEW",  emoji: "👜", bg: "#fef5e8" },
  { id: 7,  name: "Classic Sneakers",           category: "fashion",     price: 6299,  oldPrice: 7999,  rating: 4.6, badge: "SALE", emoji: "👟", bg: "#e8f6fe" },
  { id: 8,  name: "Silk Scarf",                 category: "fashion",     price: 4599,  oldPrice: null,  rating: 4.3, badge: null,   emoji: "🧣", bg: "#fce8fe" },
  { id: 9,  name: "Ceramic Planter Set",        category: "home",        price: 3199,  oldPrice: null,  rating: 4.7, badge: "NEW",  emoji: "🪴", bg: "#e8fee8" },
  { id: 10, name: "Linen Throw Pillow",         category: "home",        price: 2499,  oldPrice: null,  rating: 4.5, badge: null,   emoji: "🛋️", bg: "#fef0e8" },
  { id: 11, name: "Scented Candle Bundle",      category: "home",        price: 3499,  oldPrice: 4599,  rating: 4.8, badge: "SALE", emoji: "🕯️", bg: "#fefce8" },
  { id: 12, name: "Bamboo Cutting Board",       category: "home",        price: 2849,  oldPrice: null,  rating: 4.6, badge: null,   emoji: "🍳", bg: "#e8fefc" },
  { id: 13, name: "Yoga Mat Premium",           category: "sports",      price: 5699,  oldPrice: 7099,  rating: 4.7, badge: "SALE", emoji: "🧘", bg: "#f0fee8" },
  { id: 14, name: "Resistance Band Set",        category: "sports",      price: 1899,  oldPrice: null,  rating: 4.5, badge: null,   emoji: "💪", bg: "#fee8f0" },
  { id: 15, name: "Insulated Water Bottle",     category: "sports",      price: 2899,  oldPrice: null,  rating: 4.9, badge: "NEW",  emoji: "🍶", bg: "#e8f8fe" },
  { id: 16, name: "Running Backpack",           category: "sports",      price: 6699,  oldPrice: 8399,  rating: 4.4, badge: "SALE", emoji: "🎒", bg: "#fef8e8" },
  { id: 17, name: "Vitamin C Serum",            category: "beauty",      price: 3999,  oldPrice: 4999,  rating: 4.8, badge: "SALE", emoji: "✨", bg: "#fef0e8" },
  { id: 18, name: "Jade Roller Set",            category: "beauty",      price: 2699,  oldPrice: null,  rating: 4.6, badge: "NEW",  emoji: "💚", bg: "#e8fef5" },
  { id: 19, name: "Lip Balm Collection",        category: "beauty",      price: 1599,  oldPrice: null,  rating: 4.4, badge: null,   emoji: "💋", bg: "#fee8ea" },
  { id: 20, name: "Hair Mask Treatment",        category: "beauty",      price: 2199,  oldPrice: 2849,  rating: 4.5, badge: "SALE", emoji: "💆", bg: "#f5e8fe" },
  { id: 21, name: "Mechanical Keyboard",        category: "electronics", price: 12499, oldPrice: null,  rating: 4.7, badge: "NEW",  emoji: "⌨️", bg: "#e8effe" },
  { id: 22, name: "Minimalist Watch",           category: "fashion",     price: 16299, oldPrice: 19999, rating: 4.9, badge: "SALE", emoji: "🕰️", bg: "#fef9e8" },
  { id: 23, name: "Essential Oil Diffuser",     category: "home",        price: 4199,  oldPrice: null,  rating: 4.6, badge: null,   emoji: "🌿", bg: "#e8fef0" },
  { id: 24, name: "Speed Jump Rope",            category: "sports",      price: 1699,  oldPrice: null,  rating: 4.5, badge: null,   emoji: "🤸", bg: "#fee8fe" }
];

// ---- VALID PROMO CODES ----
var promoCodes = {
  "SAVE10":  10,
  "SAVE20":  20,
  "WELCOME": 15,
  "INDIA30": 30
};

// ---- APP STATE ----
// These variables track what filters are active and what's in the cart

var cart            = [];       // Array of cart items
var activeCategory  = "all";    // Which category is selected
var maxPrice        = 20000;    // Max price from the slider
var sortOrder       = "default";// How to sort the products
var discount        = 0;        // Discount percentage (0 means no discount)
var checkoutStep    = 1;        // Which step of checkout we're on (1, 2, or 3)


// DISPLAY PRODUCTS

// This function shows the given list of products on screen
function displayProducts(list) {
  var grid    = document.getElementById("productGrid");
  var noRes   = document.getElementById("noResults");
  var counter = document.getElementById("resultCount");

  grid.innerHTML = ""; // Clear the grid first

  // If nothing to show, display the "no results" message
  if (list.length === 0) {
    noRes.style.display = "block";
    counter.textContent = "0 products found";
    return;
  }

  noRes.style.display = "none";
  counter.textContent = "Showing " + list.length + " products";

  // Loop through each product and build its card HTML
  for (var i = 0; i < list.length; i++) {
    var p = list[i];

    // Build the star rating string
    var stars = "";
    var fullStars = Math.floor(p.rating);
    for (var s = 0; s < fullStars; s++) { stars += "★"; }
    for (var s = fullStars; s < 5; s++) { stars += "☆"; }

    // Build the old price HTML (only if there is one)
    var oldPriceHTML = "";
    if (p.oldPrice) {
      oldPriceHTML = '<span class="product-old-price">Rs.' + p.oldPrice.toLocaleString("en-IN") + '</span>';
    }

    // Put the full card HTML together
    var cardHTML =
      '<div class="product-card">' +
        '<div class="product-img" style="background-color:' + p.bg + '">' +
         p.emoji +
        '</div>' +
        '<div class="product-info">' +
          '<p class="product-category">' + p.category + '</p>' +
          '<p class="product-name">' + p.name + '</p>' +
          '<p class="product-rating">' + stars + ' (' + p.rating + ')</p>' +
          '<p>' +
            '<span class="product-price">Rs.' + p.price.toLocaleString("en-IN") + '</span>' +
            oldPriceHTML +
          '</p>' +
          '<button class="add-btn" id="btn-' + p.id + '" onclick="addToCart(' + p.id + ')">Add to Cart</button>' +
        '</div>' +
      '</div>';

    grid.innerHTML += cardHTML;
  }
}

// FILTERING & SORTING

// Reads all the active filters and re-renders the product grid
function applyFilters() {
  var searchText = document.getElementById("searchInput").value.toLowerCase();

  // Start with all products, then filter down
  var filtered = [];
  for (var i = 0; i < products.length; i++) {
    var p = products[i];

    var matchCategory = (activeCategory === "all") || (p.category === activeCategory);
    var matchPrice    = p.price <= maxPrice;
    var matchSearch   = p.name.toLowerCase().indexOf(searchText) !== -1 ||
                        p.category.toLowerCase().indexOf(searchText) !== -1;

    if (matchCategory && matchPrice && matchSearch) {
      filtered.push(p);
    }
  }

  // Sort the filtered list
  if (sortOrder === "price-asc") {
    filtered.sort(function(a, b) { return a.price - b.price; });
  } else if (sortOrder === "price-desc") {
    filtered.sort(function(a, b) { return b.price - a.price; });
  } else if (sortOrder === "rating") {
    filtered.sort(function(a, b) { return b.rating - a.rating; });
  } else if (sortOrder === "name") {
    filtered.sort(function(a, b) { return a.name.localeCompare(b.name); });
  }

  displayProducts(filtered);
}

// Called when a category button is clicked
function setCategory(cat, btn) {
  activeCategory = cat;

  // Remove "active" from all category buttons, add it to the clicked one
  var allBtns = document.querySelectorAll(".filter-btn");
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].classList.remove("active");
  }
  btn.classList.add("active");

  applyFilters();
}

// Called when the price slider moves
function setPriceFilter(value) {
  maxPrice = Number(value);
  document.getElementById("priceLabel").textContent = Number(value).toLocaleString("en-IN");
  applyFilters();
}

// Called when the sort dropdown changes
function setSort(value) {
  sortOrder = value;
  applyFilters();
}

// CART - ADD / REMOVE / CHANGE QUANTITY

// Adds a product to the cart (or increases quantity if already there)
function addToCart(productId) {
  var product = products.find(p => p.id === productId);

  var existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      qty: 1
    });
  }

  refreshCartUI();
  showToast(product.name + " added to cart");
}

// Removes an item from the cart completely
function removeFromCart(productId) {
  var newCart = [];
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id !== productId) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;
  refreshCartUI();
}

// Changes the quantity of an item (+1 or -1)
function changeQty(id, change) {
  change = Number(change);

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty += change;

      if (cart[i].qty <= 0) {
        removeFromCart(id);
        return;
      }
      break;
    }
  }

  refreshCartUI();
}


// CART UI - REDRAW THE CART PANEL

function refreshCartUI() {
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    total += cart[i].qty;
  }

  document.getElementById("cartCount").textContent = total;

  var cartItemsDiv = document.getElementById("cartItems");
  var cartFooter = document.getElementById("cartFooter");

  // 🧼 Always reset cleanly
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "block";

  var html = "";

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];

    html += `
      <div class="cart-item">
        <div class="cart-item-emoji">${item.emoji}</div>

        <div class="cart-item-info">
          <p>${item.name}</p>
          <p>Rs.${item.price}</p>

          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>

        <button onclick="removeFromCart(${item.id})">🗑</button>
      </div>
    `;
  }

  cartItemsDiv.innerHTML = html;

  updateTotals(); // 🔥 THIS is why totals weren’t updating properly
}

// Recalculates and updates the subtotal, discount, shipping, and grand total
function updateTotals() {
  var subtotal = 0;
  for (var i = 0; i < cart.length; i++) {
    subtotal += cart[i].price * cart[i].qty;
  }

  var discountAmount = Math.round(subtotal * discount / 100);
  var shipping       = subtotal > 0 ? 49 : 0;
  var grandTotal     = subtotal - discountAmount + shipping;

  document.getElementById("subtotal").textContent   = "Rs." + subtotal.toLocaleString("en-IN");
  document.getElementById("shippingAmt").textContent = subtotal > 0 ? "Rs.49" : "Rs.0";
  document.getElementById("grandTotal").textContent  = "Rs." + grandTotal.toLocaleString("en-IN");

  // Show or hide the discount row
  var discountRow = document.getElementById("discountRow");
  if (discount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("discountLabel").textContent = "Discount (" + discount + "%)";
    document.getElementById("discountAmt").textContent   = "-Rs." + discountAmount.toLocaleString("en-IN");
  } else {
    discountRow.style.display = "none";
  }
}

// PROMO CODES

function applyPromo() {
  var code    = document.getElementById("promoInput").value.trim().toUpperCase();
  var msgEl   = document.getElementById("promoMsg");

  if (promoCodes[code]) {
    discount = promoCodes[code];
    msgEl.textContent = "Code applied! You get " + discount + "% off.";
    msgEl.style.color = "green";
    updateTotals();
    showToast(discount + "% discount applied!");
  } else {
    msgEl.textContent = "Invalid code. Try: SAVE10, SAVE20, WELCOME, INDIA30";
    msgEl.style.color = "red";
  }
}

// OPEN / CLOSE CART

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

// CHECKOUT MODAL

function openCheckout() {
  if (cart.length === 0) return;
  closeCart();
  checkoutStep = 1;
  showStep(1);
  document.getElementById("modalOverlay").classList.add("open");
}

function closeCheckout() {
  document.getElementById("modalOverlay").classList.remove("open");
}

// Shows the correct step and hides the others
function showStep(step) {
  // Hide all steps
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";
  document.getElementById("successStep").style.display = "none";
  document.getElementById("modalFooter").style.display = "flex";

  // Update the tab indicators
  var tabs = ["tab1", "tab2", "tab3"];
  for (var i = 0; i < tabs.length; i++) {
    document.getElementById(tabs[i]).className = "step";
    if (i + 1 < step)  document.getElementById(tabs[i]).classList.add("done");
    if (i + 1 === step) document.getElementById(tabs[i]).classList.add("active");
  }

  // Show the right step
  if (step === 1) document.getElementById("step1").style.display = "block";
  if (step === 2) document.getElementById("step2").style.display = "block";
  if (step === 3) {
    document.getElementById("step3").style.display = "block";
    buildReviewStep();
  }

  // Update Back button visibility
  document.getElementById("backBtn").style.visibility = step > 1 ? "visible" : "hidden";

  // Update Next button label
  document.getElementById("nextBtn").textContent = step === 3 ? "Place Order" : "Continue";
}

// Builds the order summary shown in step 3
function buildReviewStep() {
  var subtotal       = 0;
  for (var i = 0; i < cart.length; i++) {
    subtotal += cart[i].price * cart[i].qty;
  }
  var discountAmount = Math.round(subtotal * discount / 100);
  var grandTotal     = subtotal - discountAmount + 49;

  var html = "";
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    html +=
      '<div class="review-item">' +
        '<span>' + item.emoji + ' ' + item.name + ' x' + item.qty + '</span>' +
        '<span>Rs.' + (item.price * item.qty).toLocaleString("en-IN") + '</span>' +
      '</div>';
  }

  if (discount > 0) {
    html += '<div class="review-item"><span>Discount (' + discount + '%)</span><span>-Rs.' + discountAmount.toLocaleString("en-IN") + '</span></div>';
  }
  html += '<div class="review-item"><span>Shipping</span><span>Rs.49</span></div>';

  document.getElementById("reviewItems").innerHTML = html;
  document.getElementById("reviewTotal").textContent = "Rs." + grandTotal.toLocaleString("en-IN");
}

// Go to next step
function nextStep() {
  if (checkoutStep < 3) {
    checkoutStep++;

    if (checkoutStep === 3) {
      buildReviewStep(); // force update here
    }

    showStep(checkoutStep);
  } else {
    placeOrder();
  }
}

// Go back one step
function prevStep() {
  if (checkoutStep > 1) {
    checkoutStep--;
    showStep(checkoutStep);
  }
}

// Finalise the order and show the success screen
function placeOrder() {
  var orderNum = "SB-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("orderNum").textContent = orderNum;

  // Hide the step tabs and footer buttons
  document.getElementById("step3").style.display    = "none";
  document.getElementById("modalFooter").style.display = "none";
  document.getElementById("successStep").style.display = "block";

  // Mark all tabs as done
  document.getElementById("tab1").className = "step done";
  document.getElementById("tab2").className = "step done";
  document.getElementById("tab3").className = "step done";
}

// Clears the cart after a successful order
function resetCart() {
  cart     = [];
  discount = 0;
  document.getElementById("promoInput").value = "";
  document.getElementById("promoMsg").textContent = "";
  refreshCartUI();
}


// TOAST NOTIFICATION

function showToast(message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function() {
    toast.classList.remove("show");
  }, 2500);
}

// CARD INPUT FORMATTING

// Formats card number as groups of 4: 1234 5678 9012 3456
function formatCard(input) {
  var digits = input.value.replace(/\D/g, "").substring(0, 16);
  var formatted = "";
  for (var i = 0; i < digits.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += " ";
    formatted += digits[i];
  }
  input.value = formatted;
}

// Formats expiry as MM / YY
function formatExpiry(input) {
  var digits = input.value.replace(/\D/g, "").substring(0, 4);
  if (digits.length >= 3) {
    input.value = digits.substring(0, 2) + " / " + digits.substring(2);
  } else {
    input.value = digits;
  }
}

// START THE PAGE

// When the page loads, display all products
displayProducts(products);
