// Smooth scrolling for navigation
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".add-to-cart-btn");
  const cartTableBody = document.querySelector("#cart-table-body");
  const totalAmount = document.querySelector("#total-amount");

  let cart = {};

  // Increment and Decrement buttons for product card (using the innerText)
  document.querySelectorAll(".increment").forEach(button => {
    button.addEventListener("click", () => {
      const counter = button.closest(".product-card, .product-card2").querySelector(".count");
      let currentCount = parseInt(counter.innerText);
      counter.innerText = currentCount + 1;
    });
  });

  document.querySelectorAll(".decrement").forEach(button => {
    button.addEventListener("click", () => {
      const counter = button.closest(".product-card, .product-card2").querySelector(".count");
      let currentCount = parseInt(counter.innerText);
      if (currentCount > 0) {
        counter.innerText = currentCount - 1;
      }
    });
  });

  // Increment and Decrement buttons for the input counter field
  document.querySelectorAll(".increment").forEach(button => {
    button.addEventListener("click", () => {
      const counter = button.closest(".counter").querySelector(".count");
      let currentCount = parseInt(counter.value);
      counter.value = currentCount + 1;
    });
  });

  document.querySelectorAll(".decrement").forEach(button => {
    button.addEventListener("click", () => {
      const counter = button.closest(".counter").querySelector(".count");
      let currentCount = parseInt(counter.value);
      if (currentCount > 0) {
        counter.value = currentCount - 1;
      }
    });
  });


  // Add to Cart Functionality
  productCards.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".product-card, .product-card2");
      const name = productCard.querySelector("h3").textContent;
      const price = parseFloat(productCard.querySelector("p").textContent.replace("LKR ", "").replace(",", ""));
      const countElement = productCard.querySelector(".count");
      const count = parseInt(countElement.innerText) || parseInt(countElement.value); // Use innerText for display or input value for manual input

      // Alert if count is zero
      if (count === 0) {
        alert("You could not add this to cart. There is nothing selected.");
        return;
      }

      // Add or update product in the cart
      if (!cart[name]) {
        cart[name] = { price, quantity: count };
      } else {
        cart[name].quantity += count;
      }

      // Reset the counter after adding to the cart
      countElement.innerText = "0";
      countElement.value = "0";

      updateCartTable();
    });
  });

  // Update Cart Table
  const updateCartTable = () => {
    cartTableBody.innerHTML = "";
    let total = 0;

    Object.entries(cart).forEach(([name, item], index) => {
      const row = document.createElement("tr");

      row.innerHTML = 
        `<td>${index + 1}</td>
        <td>${name}</td>
        <td>LKR ${item.price.toFixed(2)}</td>
        <td>
          <button class="decrement-qty">-</button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="increment-qty">+</button>
        </td>
        <td>LKR ${(item.price * item.quantity).toFixed(2)}</td>
        <td><button class="remove-item">Remove</button></td>`
      ;

      // Decrement Quantity in the cart
      row.querySelector(".decrement-qty").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          delete cart[name];
        }
        updateCartTable();
      });

      // Increment Quantity in the cart
      row.querySelector(".increment-qty").addEventListener("click", () => {
        item.quantity++;
        updateCartTable();
      });

      // Remove Item from the cart
      row.querySelector(".remove-item").addEventListener("click", () => {
        delete cart[name];
        updateCartTable();
      });

      cartTableBody.appendChild(row);
      total += item.price * item.quantity;
    });

    totalAmount.textContent = `Total: LKR ${total.toFixed(2)}`
  };

  // Save cart data to localStorage when clicking the "Favorite" button
  document.querySelector("#favorite").addEventListener("click", () => {
    localStorage.setItem("cartData", JSON.stringify(cart));
    localStorage.setItem("totalAmount", totalAmount.textContent);
  });

  // Save cart data to localStorage when clicking the "Favorite" button
  document.querySelector("#favorite").addEventListener("click", () => {
    localStorage.setItem("favoriteCart", JSON.stringify(cart)); // Save cart as 'favoriteCart'
    localStorage.setItem("favoriteTotalAmount", totalAmount.textContent); // Save total
    alert("Cart data saved as favorites!");
  });

  // Apply favorite cart data to the table
document.querySelector("#applyFavorite").addEventListener("click", () => {
  const savedFavorites = localStorage.getItem("favoriteCart");
  const savedFavoriteTotal = localStorage.getItem("favoriteTotalAmount");

  if (savedFavorites) {
    cart = JSON.parse(savedFavorites); // Restore cart from favorites
    totalAmount.textContent = savedFavoriteTotal || "0"; // Restore total amount
    updateCartTable(); // Update table
    alert("Favorite cart applied!");
  } else {
    alert("No favorite cart found!");
  }
});


const searchBar = document.getElementById("search");
const searchButton = document.getElementById("submit");

function filterProducts() {
  const find = searchBar.value.trim().toLowerCase();
  const productCardsSet = document.querySelectorAll(".product-card, .product-card2");

  productCardsSet.forEach(function(card) {
    const productName = card.querySelector("h3").textContent.toLowerCase();
    if (productName.includes(find)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchBar.addEventListener("input", filterProducts);
searchButton.addEventListener("click", filterProducts);


});





