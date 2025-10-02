function showSection(sectionId) {
  document.querySelectorAll(".content").forEach(section => {
    section.classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
}
// 🛒 CART SYSTEM
let cart = [];
function changeQuantity(inputId, change) {
  let input = document.getElementById(inputId);
  let current = parseInt(input.value);
  let newValue = current + change;
  if (newValue >= 1) {
    input.value = newValue;
  }
}
// Add item to cart
function addToCart(name, price,quantity=1) {
// Check if item already in cart
  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  renderCart();
}

// Render cart items
function renderCart() {
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty</p>";
    document.getElementById("cartTotal").innerText = "Total: ₹0";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    cartDiv.innerHTML += `
      <p>${item.name} - ₹${item.price} x ${item.quantity} 
      <button onclick="removeFromCart('${item.name}')">❌</button></p>
    `;
  });

  document.getElementById("cartTotal").innerText = "Total: ₹" + total;
}

// Remove item from cart
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  renderCart();
}

// Handle checkout form
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const payment = document.getElementById("payment").value;

  // build summary
  let orderSummary = "";
  let total=0;

  cart.forEach(item => {
    orderSummary += `${item.quantity} x ${item.name} (₹${item.price})<br>`;
    total += item.price * item.quantity;
  });

  // print result
  document.getElementById("orderResult").innerHTML = `
    ✅ Thank you, <b>${name}</b>! <br>
    📞 Mobile: ${phone} <br><br>
    🍴 <b>Your Order:</b><br>
    ${orderSummary}
    💰 <b>Total Amount:</b> ₹${total} <br>
    💳 <b>Payment Method:</b> ${payment} <br><br>
    🎉 VISIT AGAIN!
  `;

  // clear cart after checkout
  cart = [];
  renderCart();
});

