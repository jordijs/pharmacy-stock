
function toggleDeleteConfirmation(id) {
  const deleteConfirmation = document.getElementById("deleteConfirmation");
  deleteConfirmation.querySelector(
    "p"
  ).innerText = `Are you sure you want to delete product with internal id: ${id}?`;
  deleteConfirmation
    .querySelector("#deleteButton")
    .setAttribute("onclick", `deleteProduct('${id}')`);
  deleteConfirmation.classList.toggle("hidden");
}
function deleteProduct(id) {
  fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });
  document.getElementById("deleteConfirmation").classList.toggle("hidden");
  getMedicines();
}
