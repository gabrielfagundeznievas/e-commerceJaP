const lowImage = document.getElementById("lowImage");
const largeImage = document.getElementById("largeImage");
const dataDescription = document.getElementById("data");
const title = document.getElementById("title");

async function showProducts() {
  try {
    const result = await fetch(PRODUCT_INFO_URL + localStorage.catID + ".json");
    const data = await result.json();

    title.innerHTML = data.name;

    data.images.forEach((el) => {
      lowImage.innerHTML += `
          <img src="${el}" class="img-thumbnail miniImage">
        `;
    });

    largeImage.innerHTML = `<img src="${data.images.at(0)}" class=""></img>`;

    dataDescription.innerHTML = `
    <div class="card" style="width: 18rem;">
      <p class="card-text text-muted px-3">${data.soldCount} vendidos</p>
      <div class="card-body">
        <h5 class="card-subtitle mb-4">${data.name}</h5>
        <h4 class="card-title mb-4">${data.currency} ${data.cost}</h4>
        <p class="card-text">${data.description}</p>
      </div>
    </div>
    `;

    const miniImage = document.querySelectorAll(".miniImage");
    miniImage.forEach((el, i) => {
      el.addEventListener("mouseover", () => {
        largeImage.innerHTML = `<img src="${data.images.at(
          i
        )}" class=""></img>`;
        el.classList.add("border-primary");
      });
      el.addEventListener("mouseout", () => {
        el.classList.remove("border-primary");
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function showComments() {
  try {
    const result = await fetch(PRODUCT_INFO_COMMENTS_URL + localStorage.catID + ".json");
    const data = await result.json();
    console.log(data);
  }catch(error){
    console.log(error)
  }
}


login();
logout();
showProducts();
showComments();