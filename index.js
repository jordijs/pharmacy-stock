const productForm = document.getElementById("productForm");

const toggleProductForm = () => {
  productForm.classList.toggle("hidden");
}

const submitProductButton = document.getElementById("submitProductButton");

function addClickListenerProducts () {
    const rows = document.querySelectorAll("tr");
    rows.forEach(row => {
      console.log(row)
      row.addEventListener("click", () => {
        const cn = row.getAttribute("cn");
        console.log("Data for row with cn=" + cn);
      });
    });
}

// const medicinesTable = document.getElementById("medicinesTable");
// medicinesTable.addEventListener("click", (event) => {
// medicinesTable.  


// )
// const portfolioContainer = document.querySelector("#portfolioContainer");
// const projectsString = localStorage.getItem("projects");
// const projectsArray = JSON.parse(projectsString);

// if (projectsArray) {
//   for (project of projectsArray) {
//     if (project.imageURL) {
//       portfolioContainer.innerHTML += `<img class="object-contain" src="${project.imageURL}" onClick="showDetail('${project.title}')" />`;
//     }
//   }
// }

// function submitForm() {
//   const title = document.getElementById("projectTitle").value;
//   const imageURL = document.getElementById("imageURL").value;
//   const description = document.getElementById("projectDescription").value;
//   if (!(title && imageURL && description)) {
//     alert("All fields are required");
//     return;
//   }
//   const project = {
//     title: title,
//     imageURL: imageURL,
//     description: description,
//   };

//   const projectString = JSON.stringify(project);
//   let toLocalStorage = "";
//   if (projectsString) {
//     projectsArray.push(project);
//     toLocalStorage = JSON.stringify(projectsArray);
//   } else {
//     toLocalStorage = `[${projectString}]`;
//   }
//   localStorage.setItem("projects", toLocalStorage);
// }

// function showDetail(projectTitle) {
//   const projectData = projectsArray.find((e) => e.title === projectTitle);
//   const imageHTML = `<img src="${projectData.imageURL}" class="w-full justify-center">`;
//   document.getElementById("detailImage").innerHTML = imageHTML;
//   document.getElementById("detailTitle").innerText = projectData.title;
//   document.getElementById("detailDescription").innerText = projectData.description;
// }

// //MOVE to tasks.js
// async function getTasks() {
//   //retrieve the tasks from data.json
//   let response = await fetch("http://localhost:3000/tasks")
//   let data = await response.json()
//   console.log(data)
// }

// //MOVE to users.js
// async function getUsers() {
//   //retrieve the users from data.json
//   let response = await fetch("http://localhost:3000/users")
//   let data = await response.json()
//   console.log(data)
// }

// async function createTask() {
//   let task = {
//     "name": "taskNew",
//     "description": "taskNew description",
//     "status": "pending"
//   }
//   let response = await fetch(
//     "http://localhost:3000/tasks",
//     {
//       method: "POST",
//       body: JSON.stringify(task)
//     }
//   )

//   return response.json();

// }

// document.addEventListener("click", submitForm);

// submitProductButton.addEventListener("click", function(e) {
//   e.preventDefault();
//   createProduct();
// });
