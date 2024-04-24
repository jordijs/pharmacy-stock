const products = getProducts();
// renderProducts()

// async function renderProducts() {
//     groupedProducts.then(groupedProducts => {
//         const productsHtml = groupedProducts.map(product => {
//             return `<tr class="flex justify-between">
//       <td></td>
//       <td>${product.cn}</td>
//       <td>${product.batch}</td>
//       <td>Edit</td>
//     </tr>`
//         }).join('')
//         console.log(productsHtml)
//         document.getElementById("productsTable").innerHTML = productsHtml
//     })
// }

async function getProducts() {
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

  const productsStock = [];

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
    productsStock.push(productStock);

    const productsHtml = productsStock.map((medicine) => {
        return `<tr>
        <td class="p-2 flex-1">${medicine.name}</td>
        <td class="p-2 w-24 text-center">${medicine.cn}</td>
        <td class="p-2 w-24 text-center">${medicine.stock}</td>
        <td class="p-2 w-24 text-center">Edit</td>
    </tr>`;
      })
      .join("");
    console.log(productsHtml);
    document.getElementById("productsTable").innerHTML = productsHtml;
  }

  console.log(productsStock);
  // const stock = await countCn.map(medicine => {
  //     return {
  //         cn: medicine.cn,
  //         quantity: medicine.quantity
  //     }
  // })

  // products.then(products => {
  //    const groupedProducts = Object.groupBy(products, ({ cn }) => cn)
  //    console.log(groupedProducts)
  // })
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
