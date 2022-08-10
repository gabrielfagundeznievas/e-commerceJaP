const catName = document.getElementById('catName');
const sectionProduct = document.getElementById('product');

async function mostrarProductos(){
    try{
        const result = await fetch(PRODUCTS_URL + localStorage.catID + '.json');
        const data = await result.json();

        catName.textContent = data.catName;

        for ( product of data.products){
            sectionProduct.innerHTML += `<div class="card card_product shadow-sm mb-5 bg-body rounded" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="foto de producto">
        <div class="card-body">
          <p class="card-text fs-3">${product.currency} ${product.cost}</p>
          <p class="card-text fw-bold">${product.name}</p>
          <p class="card-text fw-light">${product.description}</p>
        </div>
      </div>`
        }
        

    } catch (error) {
        console.log(error);
    }
    
}

mostrarProductos();

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "product-info.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "product-info.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "product-info.html"
    });
});