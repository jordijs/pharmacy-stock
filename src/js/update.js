
function toggleEditForm(id) {
  const form = document.getElementById("editProductForm");
  form.setAttribute("action", `javascript: editProduct('${id}')`);
  form.querySelector(
    "h2"
  ).textContent = `Editing product with internal id: ${id}`;
  form.classList.toggle("hidden");
}
function editProduct(id) {
  const cn = document.getElementById("cnEdit").value;
  const locationLetter = document.getElementById("locationLetterEdit").value;
  const locationNumber = document.getElementById("locationNumberEdit").value;
  const batch = document.getElementById("batchEdit").value;
  const expiration = document.getElementById("expirationEdit").value;
  const product = {};
  if (cn) {
    product.cn = cn;
  }
  if (expiration) {
    product.expiration = expiration;
  }
  if (batch) {
    product.batch = batch;
  }
  if (locationLetter && locationNumber) {
    product.location = locationLetter + locationNumber;
  }

  fetch(`http://localhost:3000/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
}
