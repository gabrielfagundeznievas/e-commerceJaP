document.addEventListener("DOMContentLoaded", function(){
    const user = document.getElementById('user');

    if(!localStorage.getItem('redirect')){
        localStorage.setItem('redirect', 0);
    } 
    
    if(localStorage.getItem('redirect') == 0){
        window.location = "login.html";
    } else if(localStorage.getItem('redirect') == 1){
        user.textContent = localStorage.getItem('user');
    }

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    function logout(){
        const logOut = document.getElementById('logout');

        logOut.addEventListener('click', () => {
            localStorage.removeItem('redirect');
            window.location = "login.html"
        })
    }

    logout();
});

