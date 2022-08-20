const catName = document.getElementById('catName');
const sectionProduct = document.getElementById('product');


async function showProducts() {
  try {
    const result = await fetch(PRODUCTS_URL + localStorage.catID + '.json');
    const data = await result.json();

    catName.textContent = data.catName;

    for (product of data.products) {
      sectionProduct.innerHTML += `<a href='product-info.html' id="product${product.id}" class="card card_product shadow-sm mb-5 bg-body rounded" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="foto de producto">
        <div class="card-body">
          <p class="card-text fs-3">${product.currency} ${product.cost}</p>
          <p class="card-text fw-bold">${product.name}</p>
          <p class="card-text fw-light">${product.description}</p>
        </div>
      </a>`

    };
  } catch (error) {
    console.log(error);
  }
}


showProducts();