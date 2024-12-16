document.addEventListener("DOMContentLoaded", () => {
  const cartData = JSON.parse(localStorage.getItem("cartData")) || {}; // Retrieve cart data or use an empty object
  let totalAmount = Object.values(cartData).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ); // Calculate total amount dynamically from cart data
  const cartTableBody = document.querySelector("#cart-table-body"); // Correct tbody selector
  const totalAmountDisplay = document.querySelector("#total-amount"); // Correct total amount selector

  // Check if cart data exists and populate the table
  if (Object.keys(cartData).length > 0) {
    let index = 1;
    Object.entries(cartData).forEach(([name, item]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index++}</td>
        <td>${name}</td>
        <td>LKR ${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>LKR ${(item.price * item.quantity).toFixed(2)}</td>
        <td><button data-name="${name}" class="remove-item">Remove</button></td>
      `;
      cartTableBody.appendChild(row);
    });
  } else {
    // If the cart is empty, display a message
    cartTableBody.innerHTML = `<tr><td colspan="6">No items in the cart</td></tr>`;
  }

  // Update the total amount display
  totalAmountDisplay.textContent = `Total: LKR ${totalAmount.toFixed(2)}`;

  // Add an event listener to remove items from the cart
  cartTableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      const itemName = event.target.getAttribute("data-name");
      delete cartData[itemName]; // Remove the item from the cart data
      localStorage.setItem("cartData", JSON.stringify(cartData)); // Update the cart data in localStorage

      // Recalculate the total amount dynamically and update localStorage
      totalAmount = Object.values(cartData).reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      localStorage.setItem("totalAmount", totalAmount);

      // Refresh the table and total amount display
      location.reload(); // Reload to reflect changes
    }
  });

  // Add functionality to the checkout button
  document.querySelector("#checkout").addEventListener("click", () => {
    if (Object.keys(cartData).length === 0) {
      alert("Your cart is empty. Add some items before checking out.");
    } else {
      alert("Proceeding to checkout...");
    }
  });
  
});
document.addEventListener("DOMContentLoaded", function () {
  const purchaseBtn = document.getElementById("checkout");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");
  const form = document.querySelector("form");
  const table = document.getElementById("main-cart-section");
  const totalElement = document.getElementById("total-amount");

  // Show popup on button click
  purchaseBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission

    // Validation logic
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("text02").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.querySelector("[name='address']").value.trim();
    const paymentMethod = document.querySelector(".paymentmethod").value;
    const cardPaymentMethod = document.querySelector(".cardpaymentmethod").value;
    const cardNumber = document.querySelector("[name='cardnumber']").value.trim();
    const expiryDate = document.querySelector("[name='month']").value.trim();
    const cvv = document.querySelector("[name='cvv']").value.trim();

    let isValid = true;
    let errorMessage = "";

    // Personal Information Validation
    if (!firstName) {
      errorMessage += "First Name is required.\n";
      isValid = false;
    }
    if (!lastName) {
      errorMessage += "Last Name is required.\n";
      isValid = false;
    }
    if (!phone || !/^(07\d{8})$/.test(phone)) {
      errorMessage += "Valid Phone Number is required (e.g., 07XXXXXXXX).\n";
      isValid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMessage += "Valid Email is required (e.g., example@mail.com).\n";
      isValid = false;
    }
    if (!address) {
      errorMessage += "Delivery Address is required.\n";
      isValid = false;
    }

    // Payment Information Validation
    if (paymentMethod === "Card") {
      if (!cardPaymentMethod) {
        errorMessage += "Card Payment Method is required.\n";
        isValid = false;
      }
      if (!cardNumber || !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNumber)) {
        errorMessage += "Valid Card Number is required (e.g., 1234-5678-9012-3456).\n";
        isValid = false;
      }
      if (!expiryDate) {
        errorMessage += "Expiry Date is required.\n";
        isValid = false;
      }
      if (!cvv || !/^\d{3}$/.test(cvv)) {
        errorMessage += "Valid CVV/CVC is required (e.g., 123).\n";
        isValid = false;
      }
    }

    // Display errors or show popup
    if (!isValid) {
      alert(errorMessage);
    } else {
      // Clear the form and table
      if (form) form.reset(); // Reset the form fields
      if (table) {
        // Get the table header (thead) and the table body (tbody)
        const tableBody = table.querySelector("tbody");
      
        // Clear the body content
        if (tableBody) {
          tableBody.innerHTML = ""; // Clear all existing rows in the tbody
        }
      
        // Create a new row for the tbody with the "Thank you" message
        const thankYouRow = document.createElement("tr");
        thankYouRow.innerHTML = `
          <td colspan="6" style="text-align: center; font-style: italic;">
            Your order is being processed and will arrive within the next 3 hours.
          </td>
        `;
        if (tableBody) {
          tableBody.appendChild(thankYouRow); // Add the thank you message row to the tbody
        }

        if (totalElement) {
          totalElement.style.display = "none"; // Hide the total amount
        }

        if (purchaseBtn) {
          purchaseBtn.style.display = "none"; // Hide the checkout button
        }
      
      }
      

      // Show the popup
      popup.style.display = "flex";
    }
  });

  // Close popup on close button click
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close popup when clicking outside the content box
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
