
const inventory = {
  "8886805705430": { name: "Fish Crackers", price: 7000 },
  "8859858300754": { name: "ပေါင်မုန့်", price: 2500 },
  "8859819400578": { name: "အပ်မှို", price: 5000 },
  "8836000095294": { name: "လပ်ကီးခေါက်ဆွဲ", price: 3000 },
  "8996001354001": { name: "ချောကလက်မုန့်", price: 1500 },
  "8851123237000": {name:"c-vitt",price:2500},
  "8858152047617": {name:"chess cake",price:700}
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
      <td>$${item.price.toFixed(2)}</td>
      <td style="text-align: center;">${item.quantity}</td>
      <td style="text-align: right;">$${item.total.toFixed(2)}</td>
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