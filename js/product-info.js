async function showProducts() {
    try {
      const result = await fetch(PRODUCTS_URL + localStorage.catID + '.json');
      const data = await result.json();
    }
    catch (error){
        console.log(error);
    }
}