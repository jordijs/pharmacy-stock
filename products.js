getMedicines();

async function getMedicines() {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  const countCn = await data.reduce((accumulator, product) => {
    if (accumulator[product.cn]) {
      accumulator[product.cn] += 1;
    } else {
      accumulator[product.cn] = 1;
    }
    return accumulator;
  }, {});

  const medicinesList = [];

  for (cn in countCn) {
    const apiResponse = await fetch(
      `https://cima.aemps.es/cima/rest/medicamento?cn=${cn}`
    );
    const apiJson = await apiResponse.json();
    const name = apiJson.nombre;
    const productStock = {
      cn: cn,
      name: name,
      stock: countCn[cn],
    };
    medicinesList.push(productStock);
  }

  const medicinesHtml = medicinesList
    .map((medicine) => {
      return `<tr cn=${medicine.cn}>
    <td class="p-2 flex-1">${medicine.name}</td>
    <td class="p-2 w-24 text-center">${medicine.cn}</td>
    <td class="p-2 w-24 text-center">${medicine.stock}</td>
    </tr>`;
    })
    .join("");

  document.getElementById("medicinesTable").innerHTML = medicinesHtml;
  addClickListenerProducts();
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

function addClickListenerProducts () {
    const rows = document.querySelectorAll("#medicinesTable tr");
    rows.forEach(row => {
      row.addEventListener("click", () => {
        const cn = row.getAttribute("cn");
        displayDetailMedicine(cn);
      });
    });
}

async function displayDetailMedicine(cn) {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    const filteredData = data.filter(product => product.cn === cn)
    const detailHtml = filteredData.map(product => {
        return `<tr class="flex">
        <td class="p-2 flex-1">${product.id}</td>
        <td class="p-2 flex-1">${product.expiration}</td>
        <td class="p-2 flex-1">${product.batch}</td>
        <td class="p-2 flex-1">${product.location}</td>
        <td class="p-2 flex-1"><i onclick="toggleEditForm('${product.id}')" class="fa-solid fa-pen mr-4 text-blue-600"></i><i onclick="toggleDeleteConfirmation('${product.id}')" class="fa-solid fa-trash text-red-400"></i></td>
        </tr>`;
    }).join("");
    document.querySelector("#productsDetail tbody").innerHTML = detailHtml;
    const rows = document.querySelectorAll("#medicinesTable tr");
    rows.forEach(row => row.classList.remove("bg-blue-200"));
    document.querySelector("#medicinesTable tr" + `[cn="${cn}"]`).classList.add("bg-blue-200");
    document.querySelector("#medicinesTable tr" + `[cn="${cn}"]`).classList.add("bg-blue-200");
    document.getElementById("productsDetail").classList.remove("hidden");

}

function toggleEditForm(id){
    const form = document.getElementById("editProductForm")
    form.setAttribute("action", `javascript: editProduct('${id}')`);
    form.querySelector("h2").textContent = `Editing product with internal id: ${id}`;
    form.classList.toggle("hidden");
}

function editProduct(id){
    const cn = document.getElementById("cnEdit").value;
    const locationLetter = document.getElementById("locationLetterEdit").value;
    const locationNumber = document.getElementById("locationNumberEdit").value;
    const batch = document.getElementById("batchEdit").value;
    const expiration = document.getElementById("expirationEdit").value;
    const product = {
    }
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

function toggleDeleteConfirmation(id) {
    
const deleteConfirmation = document.getElementById("deleteConfirmation")
deleteConfirmation.querySelector("p").innerText = `Are you sure you want to delete product with internal id: ${id}?`
deleteConfirmation.querySelector("#deleteButton").setAttribute("onclick", `deleteProduct('${id}')`)
deleteConfirmation.classList.toggle("hidden");
}

function deleteProduct(id) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    document.getElementById("deleteConfirmation").classList.toggle("hidden");
    getMedicines();
}