document.addEventListener("DOMContentLoaded", () => {
  async function showProducts() {
    try {
      const result = await fetch(PRODUCTS_URL + localStorage.catID + ".json");
      const data = await result.json();
      const catName = document.getElementById("catName");
      const sectionProduct = document.getElementById("product");
      const sortAsc = document.getElementById("sortAsc");
      const sortDesc = document.getElementById("sortDesc");
      const sortByRel = document.getElementById("sortByRel");
      const inputBuscar = document.getElementById("inputBuscar");
      const btnBuscar = document.getElementById("btnBuscar");
      const priceMin = document.getElementById("rangeFilterPriceMin");
      const priceMax = document.getElementById("rangeFilterPriceMax");
      const rangeFilterPrice = document.getElementById("rangeFilterPrice");
      const clearRangeFilter = document.getElementById("clearRangeFilter");

      const arrProducts = data.products;
      // const arrProducts2 = data.products;

      catName.textContent = data.catName;

      sortAsc.addEventListener("click", () => {
        data.products = data.products.sort((a, b) => b.cost - a.cost);

        sectionProduct.innerHTML = "";
        cardProducts();
      });

      sortDesc.addEventListener("click", () => {
        data.products = data.products.sort((a, b) => a.cost - b.cost);

        sectionProduct.innerHTML = "";
        cardProducts();
      });

      sortByRel.addEventListener("click", () => {
        data.products = data.products.sort((a, b) => b.soldCount - a.soldCount);

        sectionProduct.innerHTML = "";
        cardProducts();
      });

      rangeFilterPrice.addEventListener("click", () => {
        data.products = arrProducts;
        data.products = data.products.filter(filterPrice);

        sectionProduct.innerHTML = "";
        cardProducts();
      });

      function filterPrice(element) {
        if (priceMin.value === "") {
          priceMin.value = 0;
        } else if (priceMax.value === "") {
          priceMax.value = Number.MAX_VALUE;
        }

        return element.cost <= priceMax.value && element.cost >= priceMin.value;
      }

      btnBuscar.addEventListener("click", (e) => {
        e.preventDefault();

        sectionProduct.innerHTML = "";
        cardProductsCon();
      });

      inputBuscar.addEventListener("input", () => {
        sectionProduct.innerHTML = "";
        cardProductsCon();
      });

      clearRangeFilter.addEventListener('click', () => {
        data.products = arrProducts;
        priceMax.value = '';
        priceMin.value = '';
        inputBuscar.value = '';

        sectionProduct.innerHTML = '';
        cardProducts()
        arrProducts2 = arrProducts;
      })

      function cardProducts() {
        for (product of data.products) {
          sectionProduct.innerHTML += `<div onclick="setCatID(${product.id})" class="card card_product shadow-sm mb-5 bg-body rounded cursor-active" style="width: 18rem;">
            <img src="${product.image}" class="card-img-top" alt="foto de producto">
            <div class="card-body">
              <p class="card-text fs-3">${product.currency} ${product.cost}</p>
              <p class="card-text fw-bold">${product.name}</p>
              <p class="card-text fw-light">${product.description}</p>
              <p class="card-text fw-lighter text-end">${product.soldCount} vendidos</p>
            </div>
          </div>`;
        }
      }

      function cardProductsCon() {
        let arrAux = [];

        data.products = arrProducts;

        for (product of data.products){
          if (
            product.name
              .toLowerCase()
              .includes(inputBuscar.value.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(inputBuscar.value.toLowerCase())
          ) {
            arrAux.push(product);
          }
        }
        
        data.products = arrAux;

        for (let i = 0; i < data.products.length; i++) {
            sectionProduct.innerHTML += `<div onclick="setCatID(${data.products[i].id})" class="card card_product shadow-sm mb-5 bg-body rounded cursor-active" style="width: 18rem;">
            <img src="${data.products[i].image}" class="card-img-top" alt="foto de producto">
            <div class="card-body">
              <p class="card-text fs-3">${data.products[i].currency} ${data.products[i].cost}</p>
              <p class="card-text fw-bold">${data.products[i].name}</p>
              <p class="card-text fw-light">${data.products[i].description}</p>
              <p class="card-text fw-lighter text-end">${data.products[i].soldCount} vendidos</p>
            </div>
          </div>`;
        }
      }

      cardProducts();
    } catch (error) {
      console.log(error);
    }
  }

  showProducts();
});

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "product-info.html";
}

function login() {
  const user = document.getElementById("user");

  if (localStorage.getItem("redirect") == 1)
    user.textContent = localStorage.getItem("user");
}

function logout() {
  const logOut = document.getElementById("logout");

  logOut.addEventListener("click", () => {
    localStorage.removeItem("redirect");
    window.location = "login.html";
  });
}

login();
logout();