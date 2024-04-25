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
  const countExpired = await data.reduce((accumulator, product) => {
    const today = new Date();
    formattedToday = formatDate(today);
    if (product.expiration < formattedToday) {
      accumulator += 1;
    }
    return accumulator;
  }, 0);

  const expiredButton = document.getElementById("expiredButton");

  if (countExpired >= 1) {
    expiredButton.classList.add("bg-red-500");
    document.getElementById("expiredCounter").innerText = countExpired;
  } else {
    expiredButton.classList.add("bg-green-500");
    document.getElementById("expiredCounter").innerText = "0";
  }

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
function addClickListenerProducts() {
  const rows = document.querySelectorAll("#medicinesTable tr");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const cn = row.getAttribute("cn");
      displayDetailMedicine(cn);
    });
  });
}

async function displayDetailMedicine(cn) {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  const filteredData = data.filter((product) => product.cn === cn);
  const detailHtml = filteredData
    .map((product) => {
      return `<tr class="flex">
        <td class="p-2 flex-1">${product.id}</td>
        <td class="p-2 flex-1">${product.expiration}</td>
        <td class="p-2 flex-1">${product.batch}</td>
        <td class="p-2 flex-1">${product.location}</td>
        <td class="p-2 flex-1"><i onclick="toggleEditForm('${product.id}')" class="fa-solid fa-pen mr-4 text-blue-600"></i><i onclick="toggleDeleteConfirmation('${product.id}')" class="fa-solid fa-trash text-red-400"></i></td>
        </tr>`;
    })
    .join("");
  document.querySelector("#productsDetail tbody").innerHTML = detailHtml;
  const rows = document.querySelectorAll("#medicinesTable tr");
  rows.forEach((row) => row.classList.remove("bg-blue-200"));
  document
    .querySelector("#medicinesTable tr" + `[cn="${cn}"]`)
    .classList.add("bg-blue-200");
  document
    .querySelector("#medicinesTable tr" + `[cn="${cn}"]`)
    .classList.add("bg-blue-200");
  document.getElementById("productsDetail").classList.remove("hidden");
}
