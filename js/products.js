document.addEventListener('DOMContentLoaded', () => {
  async function showProducts() {
    try {
      const result = await fetch(PRODUCTS_URL + localStorage.catID + '.json');
      const data = await result.json();
      const catName = document.getElementById('catName');
      const sectionProduct = document.getElementById('product');
      const sortAsc = document.getElementById('sortAsc');
      const sortDesc = document.getElementById('sortDesc');
      const sortByRel = document.getElementById('sortByRel');
  
      catName.textContent = data.catName;
  
      sortAsc.addEventListener('click', () => {
        data.products = data.products.sort((a, b) => b.cost - a.cost);

        sectionProduct.innerHTML = "";
        cardProducts();
      });

      sortDesc.addEventListener('click', () => {
        data.products = data.products.sort((a, b) => a.cost - b.cost);

        sectionProduct.innerHTML = "";
        cardProducts();
      });

      sortByRel.addEventListener('click', () => {
        data.products = data.products.sort((a, b) => b.soldCount - a.soldCount);

        sectionProduct.innerHTML = "";
        cardProducts();
      });

      function cardProducts(){
        for (product of data.products) {
          sectionProduct.innerHTML += `<div onclick="setCatID(${product.id})" class="card card_product shadow-sm mb-5 bg-body rounded cursor-active" style="width: 18rem;">
            <img src="${product.image}" class="card-img-top" alt="foto de producto">
            <div class="card-body">
              <p class="card-text fs-3">${product.currency} ${product.cost}</p>
              <p class="card-text fw-bold">${product.name}</p>
              <p class="card-text fw-light">${product.description}</p>
              <p class="card-text fw-lighter text-end">${product.soldCount} vendidos</p>
            </div>
          </div>`
        };
      };

      cardProducts();
      
    } catch (error) {
      console.log(error);
    }
  }

  showProducts();
})

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "product-info.html";
}

function login(){
  const user = document.getElementById('user');

  if(localStorage.getItem('redirect') == 1) user.textContent = localStorage.getItem('user');  
}

function logout(){
  const logOut = document.getElementById('logout');

  logOut.addEventListener('click', () => {
      localStorage.removeItem('redirect');
      window.location = "login.html"
  })
}



login()
logout()