const products = [
  {
    id: 1,
    name: "iPhone 17 Pro Max",
    category: "Smartphone",
    price: 1299,
    rating: 5,
    img: "img/iphone17.jpg",
  },

  {
    id: 2,
    name: "iPhone 16 Pro Max",
    category: "Smartphone",
    price: 999,
    oldPrice: 1199,
    rating: 5,
    img: "img/iphone16.jpg",
  },

  {
    id: 3,
    name: "iPhone 15 Pro Max",
    category: "Smartphone",
    price: 699,
    oldPrice: 999,
    rating: 3,
    img: "img/iphone15pro.jpg",
  },

  {
    id: 4,
    name: "Samsung Galaxy Z Fold 7",
    category: "Smartphone",
    price: 1799,
    rating: 5,
    img: "img/samsung z flip7.jpg",
  },

  {
    id: 5,
    name: "Samsung Galaxy S26 Ultra",
    category: "Smartphone",
    price: 1199,
    rating: 4,
    img: "img/samsung26.jpg",
  },

  {
    id: 6,
    name: "Samsung Galaxy S25 Ultra",
    category: "Smartphone",
    price: 899,
    oldPrice: 1099,
    rating: 4,
    img: "img/samsung s25.jpg",
  },

  {
    id: 7,
    name: "Google Pixel 10 Pro XL",
    category: "Smartphone",
    price: 1099,
    rating: 5,
    img: "img/g10.jpg",
  },

  {
    id: 8,
    name: "Google Pixel 9 Pro XL",
    category: "Smartphone",
    price: 799,
    oldPrice: 999,
    rating: 5,
    img: "img/g9.jpg",
  },

  {
    id: 9,
    name: "Asus Zenbook Duo (2024)",
    category: "Laptop",
    price: 1299,
    oldPrice: 1499,
    rating: 3,
    img: "img/a1.jpg",
  },

  {
    id: 10,
    name: "ASUS ROG Strix G16",
    category: "Laptop",
    price: 1399,
    oldPrice: 1699,
    rating: 4,
    img: "img/a2.jpg",
  },

  {
    id: 11,
    name: "MSI GE63VR Raider",
    category: "Laptop",
    price: 899,
    oldPrice: 1199,
    rating: 5,
    img: "img/m1.jpg",
  },

  {
    id: 12,
    name: "MSI Prestige 16 AI Evo",
    category: "Laptop",
    price: 1299,
    oldPrice: 1499,
    rating: 5,
    img: "img/m2.jpg",
  },

  {
    id: 13,
    name: "Alienware m16 R2",
    category: "Laptop",
    price: 1799,
    rating: 5,
    img: "img/l1.jpg",
  },

  {
    id: 14,
    name: "Alienware m15 R7",
    category: "Laptop",
    price: 1399,
    oldPrice: 1799,
    rating: 5,
    img: "img/l2.jpg",
  },

  {
    id: 15,
    name: "Lenovo Legion Pro Rollable",
    category: "Laptop",
    price: 1999,
    rating: 5,
    img: "img/g2.jpg",
  },

  {
    id: 16,
    name: "Lenovo Legion 7 Gen 7i",
    category: "Laptop",
    price: 1499,
    oldPrice: 1899,
    rating: 4,
    img: "img/g1-.jpg",
  },

  {
    id: 17,
    name: "Sony WH-1000XM5i",
    category: "Accessories",
    price: 399,
    oldPrice: 449,
    rating: 4,
    img: "img/s1.jpg",
  },

  {
    id: 18,
    name: "AirPods Pro 3",
    category: "Accessories",
    price: 249,
    rating: 5,
    img: "img/s2.jpg",
  },

  {
    id: 19,
    name: "Anker GaNPrime 65W 3-Port",
    category: "Accessories",
    price: 59,
    oldPrice: 79,
    rating: 5,
    img: "img/s3.jpg",
  },

  {
    id: 20,
    name: "Ergonomic Laptop Stand",
    category: "Accessories",
    price: 39,
    oldPrice: 59,
    rating: 5,
    img: "img/s4.jpg",
  },

  {
    id: 21,
    name: "Apple Magic Keyboard",
    category: "Accessories",
    price: 99,
    oldPrice: 129,
    rating: 4,
    img: "img/s5.jpg",
  },

  {
    id: 22,
    name: "Apple's Magic Keyboard for iPad",
    category: "Accessories",
    price: 299,
    rating: 5,
    img: "img/s6.jpg",
  },

  {
    id: 23,
    name: "Logitech G305 LIGHTSPEED",
    category: "Accessories",
    price: 49,
    oldPrice: 69,
    rating: 3,
    img: "img/s7.jpg",
  },

  {
    id: 24,
    name: "USB-C Adapters and hubs",
    category: "Accessories",
    price: 29,
    oldPrice: 49,
    rating: 4,
    img: "img/s8.jpg",
  },
];

let cart = [];
let currentCategory = "all";
let currentMaxPrice = 2500;
let currentSort = "default";
let currentSearch = "";
let selectedPayment = "card";

function stars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function formatPrice(n) {
  return "$" + n.toFixed(2);
}

function imgWithFallback(src, fallback, alt) {
  return `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">`;
}

function renderProducts() {
  let filtered = products.filter((p) => {
    const matchCat =
      currentCategory === "all" || p.category === currentCategory;
    const matchPrice = p.price <= currentMaxPrice;
    const matchSearch =
      p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchPrice && matchSearch;
  });

  if (currentSort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (currentSort === "price-desc")
    filtered.sort((a, b) => b.price - a.price);
  else if (currentSort === "rating")
    filtered.sort((a, b) => b.rating - a.rating);
  else if (currentSort === "name")
    filtered.sort((a, b) => a.name.localeCompare(b.name));

  const grid = document.getElementById("productsGrid");
  document.getElementById("productCount").textContent = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <svg width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <p>No products found. Try adjusting your filters.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered
    .map((p) => {
      const inCart = cart.find((c) => c.id === p.id);
      const badgeHtml = p.badge
        ? `<span class="badge badge-${p.badge}">${p.badge === "sale" ? "Sale" : "New"}</span>`
        : "";
      const oldPriceHtml = p.oldPrice
        ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>`
        : "";

      return `
    <div class="product-card">
      <div class="product-img-wrap">
        ${badgeHtml}
        ${imgWithFallback(p.img, p.fallback, p.name)}
      </div>
      <div class="product-body">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="stars">${stars(p.rating)}</div>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${oldPriceHtml}
        </div>
        <button class="add-btn ${inCart ? "added" : ""}" onclick="addToCart(${p.id})">
          ${
            inCart
              ? `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                   <polyline points="20 6 9 17 4 12"/>
                 </svg> Added`
              : `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                   <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                   <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                 </svg> Add to Cart`
          }
        </button>
      </div>
    </div>`;
    })
    .join("");
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  renderProducts();
  showToast(`✓  ${product.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  renderCart();
  renderProducts();
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  renderCart();
}

function getTotal() {
  return cart.reduce((s, c) => s + c.price * c.qty, 0);
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const footer = document.getElementById("cartFooter");
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = getTotal();

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = formatPrice(total);
  document.getElementById("cartSubtotal").textContent = formatPrice(total);

  if (cart.length === 0) {
    footer.style.display = "none";
    container.innerHTML = `
      <div class="cart-empty">
        <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>Your cart is empty</p>
      </div>`;
    return;
  }

  footer.style.display = "block";
  container.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${imgWithFallback(item.img, item.fallback, item.name)}
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatPrice(item.price * item.qty)}</p>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6M14 11v6"/>
        </svg>
      </button>
    </div>`,
    )
    .join("");
}

function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("open");
}

function setCategory(cat, btn) {
  currentCategory = cat;
  document
    .querySelectorAll(".cat-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts();
}

function updatePrice(val) {
  currentMaxPrice = parseInt(val);
  document.getElementById("priceLabel").textContent = "$" + val;
  renderProducts();
}

function sortProducts(val) {
  currentSort = val;
  renderProducts();
}

function filterProducts() {
  currentSearch = document.getElementById("searchInput").value;
  renderProducts();
}

function openCheckout() {
  if (cart.length === 0) return;
  toggleCart(); // close cart drawer first
  setTimeout(() => {
    document.getElementById("checkoutModal").classList.add("open");
    document.getElementById("modalOverlay").classList.add("open");
    goToStep(1);
  }, 300);
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("open");
  document.getElementById("modalOverlay").classList.remove("open");
}

function goToStep(step) {
  if (step === 2) {
    if (!validateStep1()) return;
  }
  if (step === 3) {
    if (!validateStep2()) return;
    populateConfirm();
  }

  [1, 2, 3].forEach((s) => {
    document.getElementById(`formStep${s}`).classList.add("hidden");
  });
  document.getElementById("formSuccess").classList.add("hidden");

  document.getElementById(`formStep${step}`).classList.remove("hidden");

  ["step1-ind", "step2-ind", "step3-ind"].forEach((id, i) => {
    const el = document.getElementById(id);
    el.classList.remove("active", "done");
    if (i + 1 < step) el.classList.add("done");
    if (i + 1 === step) el.classList.add("active");

    const num = el.querySelector(".step-num");
    if (i + 1 < step) {
      num.innerHTML = `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else {
      num.textContent = i + 1;
    }
  });
}

function validateStep1() {
  const name = document.getElementById("custName");
  const phone = document.getElementById("custPhone");
  const email = document.getElementById("custEmail");
  let valid = true;

  [name, phone, email].forEach((f) => f.classList.remove("error"));

  if (!name.value.trim()) {
    name.classList.add("error");
    valid = false;
  }
  if (!phone.value.trim()) {
    phone.classList.add("error");
    valid = false;
  }
  if (!email.value.trim() || !email.value.includes("@")) {
    email.classList.add("error");
    valid = false;
  }

  if (!valid) showToast("⚠  Please fill in all required fields");
  return valid;
}

function validateStep2() {
  if (selectedPayment === "card") {
    const cardNum = document.getElementById("cardNum");
    const cardExp = document.getElementById("cardExp");
    const cardCvv = document.getElementById("cardCvv");
    let valid = true;

    [cardNum, cardExp, cardCvv].forEach((f) => f.classList.remove("error"));

    const rawNum = cardNum.value.replace(/\s/g, "");
    if (rawNum.length < 16) {
      cardNum.classList.add("error");
      valid = false;
    }
    if (cardExp.value.length < 5) {
      cardExp.classList.add("error");
      valid = false;
    }
    if (cardCvv.value.length < 3) {
      cardCvv.classList.add("error");
      valid = false;
    }

    if (!valid) showToast("⚠  Please check your card details");
    return valid;
  }
  return true;
}

function selectPayment(type) {
  selectedPayment = type;
  document
    .querySelectorAll(".payment-opt")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(`opt-${type}`).classList.add("active");

  const cardFields = document.getElementById("cardFields");
  cardFields.style.display = type === "card" ? "block" : "none";
}

function populateConfirm() {
  const paymentLabels = {
    card: "Credit / Debit Card",
    paypal: "PayPal",
    gcash: "GCash / E-Wallet",
    cod: "Cash on Delivery",
  };

  document.getElementById("confName").textContent =
    document.getElementById("custName").value;
  document.getElementById("confPhone").textContent =
    document.getElementById("custPhone").value;
  document.getElementById("confEmail").textContent =
    document.getElementById("custEmail").value;
  document.getElementById("confPayment").textContent =
    paymentLabels[selectedPayment];
  document.getElementById("confirmTotal").textContent = formatPrice(getTotal());

  const itemsEl = document.getElementById("confirmItems");
  itemsEl.innerHTML = cart
    .map(
      (item) => `
    <div class="confirm-item">
      <span>${item.name} × ${item.qty}</span>
      <span>${formatPrice(item.price * item.qty)}</span>
    </div>`,
    )
    .join("");
}

function placeOrder() {
  const orderId =
    "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  [1, 2, 3].forEach((s) =>
    document.getElementById(`formStep${s}`).classList.add("hidden"),
  );

  ["step1-ind", "step2-ind", "step3-ind"].forEach((id) => {
    const el = document.getElementById(id);
    el.classList.remove("active");
    el.classList.add("done");
    el.querySelector(".step-num").innerHTML =
      `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
  });

  document.getElementById("orderIdBox").innerHTML =
    `Order ID: <strong>${orderId}</strong>`;
  document.getElementById("formSuccess").classList.remove("hidden");
}

function finishOrder() {
  cart = [];
  renderCart();
  renderProducts();
  closeCheckout();

  [
    "custName",
    "custPhone",
    "custEmail",
    "cardNum",
    "cardExp",
    "cardCvv",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  selectedPayment = "card";
  document
    .querySelectorAll(".payment-opt")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById("opt-card").classList.add("active");
  document.getElementById("cardFields").style.display = "block";

  showToast("🎉  Thank you for your order!");
}

function formatCard(input) {
  let val = input.value.replace(/\D/g, "").substring(0, 16);
  input.value = val.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, "").substring(0, 4);
  if (val.length >= 2) val = val.substring(0, 2) + " / " + val.substring(2);
  input.value = val;
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2800);
}

renderProducts();
renderCart();
