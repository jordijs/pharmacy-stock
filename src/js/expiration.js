async function toggleExpiredProducts() {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  const today = new Date();
  formattedToday = formatDate(today);
  const filteredData = data.filter(
    (product) => product.expiration < formattedToday
  );
  const expiredHtml = filteredData
    .map((product) => {
      return `<tr class="flex">
        <td class="p-2 flex-1">${product.id}</td>
        <td class="p-2 flex-1">${product.expiration}</td>
        <td class="p-2 flex-1">${product.batch}</td>
        <td class="p-2 flex-1">${product.location}</td>
</tr>`;
    })
    .join("");
  document.querySelector("#expiredProducts tbody").innerHTML = expiredHtml;
  document.getElementById("expiredProducts").classList.toggle("hidden");
}

function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${year}-${month}-${day}`;
}