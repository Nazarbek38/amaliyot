let cart = [];

async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=18");
    if (!res.ok) throw new Error("Failed to fetch");
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    document.getElementById("products-container").innerHTML =
      `<p style="color:red;text-align:center">Xatolik: ${err.message}</p>`;
  }
}

function renderProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="product-info">
        <span class="category-tag">${p.category}</span>
        <h3 class="product-title">${p.title}</h3>
        <p class="product-description">${p.description}</p>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button class="add-to-cart-btn">🛒 Savatga qo'shish</button>
      </div>
    `;
    card.querySelector(".add-to-cart-btn").addEventListener("click", () => addToCart(p));
    container.appendChild(card);
  });
}

// Add to cart
function addToCart(product) {
  cart.push(product);
  updateCartCount();
  showCart();
}

// Update cart counter
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

// Show cart modal
function showCart() {
  const modal = document.getElementById("cart-modal");
  const cartItems = document.getElementById("cart-items");
  const emptyText = document.getElementById("cart-empty");

  modal.style.display = "block";
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyText.style.display = "block";
  } else {
    emptyText.style.display = "none";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${item.title} - $${item.price.toFixed(2)}`;
      cartItems.appendChild(li);
    });
  }
}

// Close modal
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
});

// Open cart when clicking cart icon
document.getElementById("cart-btn").addEventListener("click", () => {
  showCart();
});

// Close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("cart-modal")) {
    document.getElementById("cart-modal").style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", fetchProducts);
