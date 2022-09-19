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
          <img src="${el}" class="img-thumbnail miniImage" class="container">
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

    const secCommenters = document.getElementById('secCommenters');
    const promedioComentarios = document.getElementById('promedioComentarios');
    
    promedioComentarios.textContent = await title.textContent

    let promedio = 0;
    let star5 = 0
    let star4 = 0
    let star3 = 0
    let star2 = 0
    let star1 = 0

    data.forEach((comentario, i) => {
      promedio += comentario.score
      switch(comentario.score){
        case 5: 
          star5++;
          break;
        case 4:
          star4++;
          break;
        case 3:
          star3++;
          break;
        case 2:
          star2++;
          break;
        case 1:
          star1++;
          break;
      }

      secCommenters.innerHTML += `
      <div class="row px-2">
        <div class="px-4 estrellasComentarios">
        <span class="fa fa-star text-muted"></span>
        <span class="fa fa-star text-muted"></span>
        <span class="fa fa-star text-muted"></span>
        <span class="fa fa-star text-muted"></span>
        <span class="fa fa-star text-muted"></span>
        </div>      
      </div>
      <div class="container row">
        <p class="fw-bold">${comentario.user} - <span class="text-muted">${comentario.dateTime}</span></p>
      </div>
      <div class="container mb-4">
        <p class="px-2">${comentario.description}<p>
      </div>
      `      
    })
    
    let estrellasComentarios = document.getElementsByClassName('estrellasComentarios');

    data.forEach((comentario, i) => {
      for(let j = 0; j < estrellasComentarios[i].children.length; j++){
        if( j < comentario.score){
          estrellasComentarios[i].children[j].classList.remove('text-muted')
          estrellasComentarios[i].children[j].classList.add('text-primary')
        }
      }
    })

    promedio = promedio/data.length;
    const numeroPromedio = document.getElementById('numeroPromedio');
    
    numeroPromedio.textContent = Math.round10(promedio, -1);
    if(!Math.round10(promedio, -1)){
      numeroPromedio.textContent = 0;
    }

    const cantOpiniones = document.getElementById('cantOpiniones');
    cantOpiniones.innerHTML = data.length;

    const star5cant = document.getElementById('star5');
    const star4cant = document.getElementById('star4');
    const star3cant = document.getElementById('star3');
    const star2cant = document.getElementById('star2');
    const star1cant = document.getElementById('star1');

    star5 > 1 ? star5cant.innerHTML += ' ' + star5 + ' opiniones' : star5cant.innerHTML += ' ' + star5 + ' opinión';
    star4 > 1 ? star4cant.innerHTML += ' ' + star4 + ' opiniones' : star4cant.innerHTML += ' ' + star4 + ' opinión';
    star3 > 1 ? star3cant.innerHTML += ' ' + star3 + ' opiniones' : star3cant.innerHTML += ' ' + star3 + ' opinión';
    star2 > 1 ? star2cant.innerHTML += ' ' + star2 + ' opiniones' : star2cant.innerHTML += ' ' + star2 + ' opinión';
    star1 > 1 ? star1cant.innerHTML += ' ' + star1 + ' opiniones' : star1cant.innerHTML += ' ' + star1 + ' opinión';
    
    const starNumberPromedio = document.getElementById('starNumberPromedio');
    for(let i = 0; i < Math.floor(promedio); i++){
      starNumberPromedio.children[i].classList.remove('text-muted')
      starNumberPromedio.children[i].classList.add('text-primary')
    }
  }catch(error){
    console.log(error)
  }
}

const textarea = document.getElementById('textareaDescription');
const numScore = document.getElementById('numScore');
const submit = document.getElementById('submit');
const user = document.getElementById('user');

let today = '';

function llenarClick(){
  submit.addEventListener('click', (e) => {
    today = new Date().toJSON();
    today = today.split('T');
    today[1] = today[1].split('.');

    e.preventDefault();

    rellenarCampo();

    scoreNewComment();
  })
}

function rellenarCampo(){
  secCommenters.innerHTML += `
  <div class="row px-2">
    <div class="px-4 estrellasComentariosNew">
    <span class="fa fa-star text-muted"></span>
    <span class="fa fa-star text-muted"></span>
    <span class="fa fa-star text-muted"></span>
    <span class="fa fa-star text-muted"></span>
    <span class="fa fa-star text-muted"></span>
    </div>      
  </div>
  <div class="container row">
    <p class="fw-bold">${user.textContent} - <span class="text-muted">${today[0]} ${today[1][0]}</span></p>
  </div>
  <div class="container mb-4">
    <p class="px-2">${textarea.value}<p>
  </div>
  ` 
  }

function scoreNewComment(){
  let estrellasComentariosNew = document.getElementsByClassName("estrellasComentariosNew")

  for(let i = 0; i < estrellasComentariosNew[estrellasComentariosNew.length - 1].children.length; i++){
    if(i < numScore.value){
      estrellasComentariosNew[estrellasComentariosNew.length - 1].children[i].classList.remove('text-muted')
      estrellasComentariosNew[estrellasComentariosNew.length - 1].children[i].classList.add('text-primary')
    }
  }
}


(function() {
  /**
   * Ajuste decimal de un número.
   *
   * @param {String}  tipo  El tipo de ajuste.
   * @param {Number}  valor El numero.
   * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
   * @returns {Number} El valor ajustado.
   */
  function decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();



login();
logout();
showProducts();
showComments();
llenarClick();