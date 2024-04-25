function toggleProductForm() {
  const productForm = document.getElementById("productForm");
  productForm.classList.toggle("hidden");
}

async function createProduct() {
  const cn = document.getElementById("cn").value;
  const expiration = document.getElementById("expiration").value;
  const batch = document.getElementById("batch").value;
  const locationLetter = document.getElementById("locationLetter").value;
  const locationNumber = document.getElementById("locationNumber").value;
  const product = {
    cn: cn,
    expiration: expiration,
    batch: batch,
    location: locationLetter + locationNumber,
  };
  console.log(product);
  let response = await fetch("http://localhost:3000/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
  return response.json();
}
