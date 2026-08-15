
const inventory = {
  "8886805705430": { name: "Fish Crackers", price: 7000 },
  "8859858300754": { name: "ပေါင်မုန့်", price: 2500 },
  "8859819400578": { name: "အပ်မှို", price: 5000 },
  "8836000095294": { name: "လပ်ကီးခေါက်ဆွဲ", price: 3000 },
  "8996001354001": { name: "ချောကလက်မုန့်", price: 1500 },
  "8850006944257": { name: "Toothpaste", price: 2000 },
};

let cart = [];
let buffer = "";

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

    let totalPrice = product.price * quantity;

    cart.push({
      name: product.name,
      price: product.price,
      quantity: quantity,
      total: totalPrice
    });

    updatecartDisplay();
  } else {
    alert("Barcode: " + scannedBarcode + "\nThis product is not found in inventory!");
  }
}

function updatecartDisplay() {
  let tablebody = document.getElementById("Table");
  let TotalDisplay = document.getElementById("grandTotalDisplay");
  tablebody.innerHTML = "";

  let grandTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    grandTotal += item.total;

    tablebody.innerHTML += `<tr>
      <td>${item.name}</td>
      <td>${item.price.toFixed(2)} Ks</td>
      <td style="text-align: center;">${item.quantity}</td>
      <td style="text-align: right;">${item.total.toFixed(2)} Ks</td>
    </tr>`;
  }
  TotalDisplay.textContent = grandTotal.toFixed(2);
}

function clearCart() {
  cart = [];
  document.getElementById("Table").innerHTML = `
    <tr>
      <td colspan="4" style="text-align: center;">No items scanned yet. Click here and scan a barcode.</td>
    </tr>
  `;
  document.getElementById("grandTotalDisplay").textContent = "0.00";
}

// function givingReceipt() {
//   if (cart.length === 0) {
//     alert("NO Items Scanned Yet!");
//     return;
//   }

//   let receiptText = "==== Tun's Mart Receipt ====\n\n";
//   receiptText += "Date: " + new Date().toLocaleString() + "\n\n";
//   receiptText += "-------------------------------\n";
//   let grandTotal = 0;
//   for (let i = 0; i < cart.length; i++) {
//     let item = cart[i];
//     receiptText += `${item.name} x${item.quantity} = ${item.total.toFixed(2)} Ks\n`;
//     grandTotal += item.total;
//   }
//   receiptText += "-------------------------------\n";
//   receiptText += `Grand Total: ${grandTotal.toFixed(2)} Ks\n`;
//   receiptText += "===============================\n";
//   receiptText += "Thank you for shopping at Tun's Mart!\n";

//   document.getElementById("qrcode").innerHTML = "";
//   let qrcode = new QRCode(document.getElementById("qrcode"), {
//     text: receiptText,
//     width: 200,
//     height: 200
//   });

//   document.getElementById("receiptModal").style.display = "flex";
//   cart = [];
//   updatecartDisplay();
// }

function closeReceipt() {
  document.getElementById("receiptModal").style.display = "none";
}

// function givingReceipt() {
//   // 1. Check if cart is empty FIRST
//   if (cart.length === 0) {
//     alert("NO Items Scanned Yet!");
//     return;
//   }

//   // 2. Build the receipt text
//   let receiptText = "==== Tun's Mart Receipt ====\n\n";
//   receiptText += "Date: " + new Date().toLocaleString() + "\n\n";
//   receiptText += "-------------------------------\n";
  
//   let grandTotal = 0;
//   for (let i = 0; i < cart.length; i++) {
//     let item = cart[i];
//     receiptText += `${item.name} x${item.quantity} = ${item.total.toFixed(0)} Ks\n`;
//     grandTotal += item.total;
//   }
  
//   receiptText += "-------------------------------\n";
//   receiptText += `Grand Total: ${grandTotal.toFixed(0)} Ks\n`;
//   receiptText += "===============================\n";
//   receiptText += "Thank you for shopping at Tun's Mart!\n";

//   // 3. Clear previous QR Code HTML content safely
//   let qrcodeContainer = document.getElementById("qrcode");
//   qrcodeContainer.innerHTML = "";

//   // 4. Try generating the QR code
//   try {
//     new QRCode(qrcodeContainer, {
//       text: receiptText,
//       width: 200,
//       height: 200
//     });
//   } catch (error) {
//     console.error("QR Code Error:", error);
//     alert("Error generating QR code! Check if QRCode library is linked in HTML.");
//     return;
//   }

//   // 5. Show the modal popup window
//   let modal = document.getElementById("receiptModal");
//   if (modal) {
//     modal.style.display = "flex";
//   } else {
//     alert("Error: Could not find element with id='receiptModal'");
//     return;
//   }

//   // 6. FINALLY clear the cart ONLY after the QR code is generated successfully!
//   cart = [];
//   updatecartDisplay();
// }

// function closeReceipt() {
//   let modal = document.getElementById("receiptModal");
//   if (modal) {
//     modal.style.display = "none";
//   }
// }

// function givingReceipt() {
//   if (cart.length === 0) {
//     alert("NO Items Scanned Yet!");
//     return;
//   }

//   // 1. Build a short, clean receipt text
//   let receiptText = "==== Tun's Mart ====\n";
//   receiptText += "Date: " + new Date().toLocaleTimeString() + "\n";
//   receiptText += "--------------------\n";

//   let grandTotal = 0;
//   for (let i = 0; i < cart.length; i++) {
//     let item = cart[i];
//     receiptText += `${item.name} x${item.quantity} = ${item.total.toFixed(0)}Ks\n`;
//     grandTotal += item.total;
//   }

//   receiptText += "--------------------\n";
//   receiptText += `TOTAL: ${grandTotal.toFixed(0)} Ks\n`;
//   receiptText += "Thank you for shopping!";

//   // 2. Clear previous QR code
//   let qrcodeContainer = document.getElementById("qrcode");
//   qrcodeContainer.innerHTML = "";

//   // 3. Generate QR Code using URL encoding to compress Burmese text!
//   try {
//     new QRCode(qrcodeContainer, {
//       text: "data:text/plain;charset=utf-8," + encodeURIComponent(receiptText),
//       width: 200,
//       height: 200,
//       correctLevel: QRCode.CorrectLevel.L
//     });
//   } catch (error) {
//     console.error("QR Code Error:", error);
//     alert("Error generating QR code!");
//     return;
//   }

//   // 4. Show modal popup
//   let modal = document.getElementById("receiptModal");
//   if (modal) {
//     modal.style.display = "flex";
//   }

//   // 5. Clear cart for next sale
//   cart = [];
//   updatecartDisplay();
// }

// function givingReceipt() {
//   if (cart.length === 0) {
//     alert("NO Items Scanned Yet!");
//     return;
//   }

//   // 1. Build clean receipt text
//   let receiptText = "==== Tun's Mart ====\n";
//   receiptText += "Date: " + new Date().toLocaleString() + "\n";
//   receiptText += "--------------------\n";

//   let grandTotal = 0;
//   for (let i = 0; i < cart.length; i++) {
//     let item = cart[i];
//     receiptText += `${item.name} x${item.quantity} = ${item.total.toFixed(0)} Ks\n`;
//     grandTotal += item.total;
//   }

//   receiptText += "--------------------\n";
//   receiptText += `TOTAL: ${grandTotal.toFixed(0)} Ks\n`;
//   receiptText += "Thank you for shopping!";

//   // 2. Convert Burmese multi-byte text safely to Base64
//   let base64Text = btoa(unescape(encodeURIComponent(receiptText)));

//   // 3. Clear previous QR Code
//   let qrcodeContainer = document.getElementById("qrcode");
//   qrcodeContainer.innerHTML = "";

//   // 4. Generate QR Code with Base64 Data URI format
//   try {
//     new QRCode(qrcodeContainer, {
//       text: "data:text/plain;base64," + base64Text,
//       width: 220,
//       height: 220,
//       correctLevel: QRCode.CorrectLevel.L
//     });
//   } catch (error) {
//     console.error("QR Code Error:", error);
//     alert("Error generating QR code!");
//     return;
//   }

//   // 5. Show modal popup
//   let modal = document.getElementById("receiptModal");
//   if (modal) {
//     modal.style.display = "flex";
//   }

//   // 6. Clear cart for next customer
//   cart = [];
//   updatecartDisplay();
// }

function givingReceipt() {
  if (cart.length === 0) {
    alert("NO Items Scanned Yet!");
    return;
  }

  // 1. Keep lines short and clean
  let receiptText = "=== Tun's Mart ===\n";
  receiptText += "Date: " + new Date().toLocaleString() + "\n";
  receiptText += "------------------\n";

  let grandTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    receiptText += `${item.name} x${item.quantity} = ${item.total.toFixed(0)} Ks\n`;
    grandTotal += item.total;
  }

  receiptText += "------------------\n";
  receiptText += `TOTAL: ${grandTotal.toFixed(0)} Ks\n`;
  receiptText += "Thank you for shopping!";

  // 2. Clear previous QR code
  let qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = "";

  // 3. Generate QR code directly with raw text!
  try {
    new QRCode(qrcodeContainer, {
      text: receiptText, // 👈 DIRECT RAW TEXT
      width: 240,        // Slightly larger size for better scanning
      height: 240,
      correctLevel: QRCode.CorrectLevel.L // Low error correction fits maximum data
    });
  } catch (error) {
    console.error("QR Code Error:", error);
    alert("Receipt is too long for QR Code! Try scanning fewer items.");
    return;
  }

  // 4. Show modal
  let modal = document.getElementById("receiptModal");
  if (modal) {
    modal.style.display = "flex";
  }

  // 5. Clear cart
  cart = [];
  updatecartDisplay();
}