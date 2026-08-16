const urlParams = new URLSearchParams(window.location.search);
const encodedData = urlParams.get('data');

if (encodedData) {
    try {
        const receipt = JSON.parse(decodeURIComponent(atob(encodedData)));

        document.getElementById("receiptDate").innerHTML = receipt.date;
        const tbody = document.getElementById("receiptItems");
        tbody.innerHTML = "";

        receipt.items.forEach(items => {
            tbody.innerHTML += `
    <tr>
    <td>${items.name}</td>
    <td style= "text-align: center;">x${items.quantity}</td>
    <td style= "text-align: right;">${items.total.toFixed(2)} Ks</td>
    </tr>`

        });

        document.getElementById("receiptTotal").innerHTML = Number(receipt.grandTotal).toFixed(2) + 'Ks';
    }
    catch (e) {
        console.error("Invalid Receipt Data", e);
    }
}