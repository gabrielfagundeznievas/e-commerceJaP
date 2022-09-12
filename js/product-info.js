const lowImage = document.getElementById("lowImage");
const largeImage = document.getElementById("largeImage");
const dataDescription = document.getElementById("data");
const title = document.getElementById("title");

async function showProducts() {
  try {
    const result = await fetch(PRODUCT_INFO_URL + localStorage.catID + ".json");
    const data = await result.json();
    console.log(data);

    title.innerHTML = data.name;

    data.images.forEach((el) => {
      lowImage.innerHTML += `
          <img src="${el}" class="img-thumbnail miniImage">
        `;
    });

    largeImage.innerHTML = `<img src="${data.images.at(0)}" class=""></img>`;

    dataDescription.innerHTML = `

    `;

    
    const miniImage = document.querySelectorAll(".miniImage");
    miniImage.forEach((el, i) => {
      el.addEventListener('mouseover', () => {
        largeImage.innerHTML = `<img src="${data.images.at(i)}" class=""></img>`
        el.classList.add('border-primary');
      })
      el.addEventListener('mouseout', () => {
        el.classList.remove('border-primary');
      });
    })
  } catch (error) {
    console.log(error);
  }
}

showProducts();
