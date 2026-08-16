
const inventory = {
  "8886805705430": { name: "Fish Crackers", price: 7000 },
  "8859858300754": { name: "ပေါင်မုန့်", price: 2500 },
  "8859819400578": { name: "အပ်မှို", price: 5000 },
  "8836000095294": { name: "လပ်ကီးခေါက်ဆွဲ", price: 3000 },
  "8996001354001": { name: "ချောကလက်မုန့်", price: 1500 },
  "8850006944257": { name: "Tooth", price: 2000 },
};

let cart = [];
let buffer = "";

// Barcode scanner listener
window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    processScan(buffer.trim());
    buffer = "";
  } else if (event.key.length === 1) {
    buffer += event.key;
  }
});

function processScan(scannedBarcode) {
  if (inventory[scannedBarcode]) {
    let product = inventory[scannedBarcode];

    let productquantityInput = prompt("Product found: " + product.name + "\nEnter quantity: ", "1");
    let quantity = parseInt(productquantityInput) || 1;

    // Check if product already exists in cart
    let existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.price * existingItem.quantity;
    } else {
      cart.push({
        name: product.name,
        price: product.price,
        quantity: quantity,
        total: product.price * quantity
      });
    }

    renderCart(); 
  } else {
    alert("Barcode: " + scannedBarcode + "\nThis product is not found in inventory!");
  }
}


function renderCart() {
  let tablebody = document.getElementById("Table");
  let TotalDisplay = document.getElementById("grandTotalDisplay");


  if (cart.length === 0) {
    tablebody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center;">No items scanned yet. Click here and scan a barcode.</td>
      </tr>
    `;
    if (TotalDisplay) TotalDisplay.textContent = "0.00 Ks";
    return;
  }

  tablebody.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item, index) => {
    item.total = item.price * item.quantity;
    grandTotal += item.total;

    let row = `<tr> 
      <td>${item.name}</td>
      <td>${item.price.toFixed(2)} Ks</td>
      <td style="text-align: center;">
        <button class="btn-qty" onclick="decreaseQuantity(${index})">-</button>
        <span class="quantityDisplay" style="margin: 0 8px;">${item.quantity}</span>
        <button class="btn-qty" onclick="increaseQuantity(${index})">+</button>
      </td>
      <td style="text-align: right;">${item.total.toFixed(2)} Ks</td>
      <td style="text-align: center;">
        <button class="btn-delete" onclick="deleteRow(${index})">Delete</button>
      </td>
    </tr>`;

    tablebody.innerHTML += row;
  });

  if (TotalDisplay) {
    TotalDisplay.textContent = grandTotal.toFixed(2) + " Ks";
  }
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  renderCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    deleteRow(index);
    return;
  }
  renderCart();
}

function deleteRow(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function closeReceipt() {
  document.getElementById("receiptModal").style.display = "none";
}

function givingReceipt() {
  if (cart.length === 0) {
    alert("NO Items Scanned Yet!");
    return;
  }

  let grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

  let receiptObject = {
    date: new Date().toLocaleString(),
    items: cart,
    grandTotal: grandTotal
  };

  let jsonString = JSON.stringify(receiptObject);
  let encodedReceipt = btoa(encodeURIComponent(jsonString));

  let computerIP = "192.168.1.2"; // အကိုတို့ laptop ရဲ့ IP address နဲ့ အစားထိုးလိုက်ပါ
  let port = window.location.port ? ":" + window.location.port : "";
  let receiptURL = "http://" + computerIP + port + window.location.pathname.replace("pc.html", "receipt.html") + "?data=" + encodedReceipt;

  let qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = "";

  try {
    new QRCode(qrcodeContainer, {
      text: receiptURL,
      width: 220,
      height: 220,
      correctLevel: QRCode.CorrectLevel.L
    });
  } catch (error) {
    console.error("QR Code Error", error);
    alert("Error generating QR code!");
    return;
  }

  let modal = document.getElementById("receiptModal");
  if (modal) {
    modal.style.display = "flex";
  }

  cart = [];
  renderCart();
}