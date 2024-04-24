
// async function getTasks() {
//   //retrieve the tasks from data.json
//   let response = await fetch("http://localhost:3000/tasks")
//   let data = await response.json()
//   console.log(data)
// }


async function createProduct(data) {
    console.log(data)
  let product = {
    "cn": "954917",
    "expiration": "2024-12-30",
    "batch": "FGD563",
    "location": "A1"
  }
  let response = await fetch(
    "http://localhost:3000/products", 
    {
      method: "POST",
      body: JSON.stringify(product)
    }
  )
  return response.json();
}


// submitButton.addEventListener("click", submitForm);
