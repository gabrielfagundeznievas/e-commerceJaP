function validation(){
    const inputEmail = document.getElementById('InputEmail');
    const inputPassword = document.getElementById('InputPassword');
    const btnSubmit = document.getElementById('btnSubmit');
    const divInEmail = document.getElementById('divInEmail');
    const divInPassword = document.getElementById('divInPassword');

    btnSubmit.addEventListener('click', (e) =>{
        e.preventDefault();
        if(inputEmail.value == ''){
            inputEmail.classList.add('is-invalid');

            const div = document.createElement('div');
            div.classList.add('invalid-feedback');
            div.textContent = 'Ingrese su e-mail';
            if(divInEmail.children.length == 2){
                divInEmail.appendChild(div);
            };

            if(inputPassword.value == ''){
                inputPassword.classList.add('is-invalid');
    
                const div = document.createElement('div');
                div.classList.add('invalid-feedback');
                div.textContent = 'Ingrese su password';
                if(divInPassword.children.length == 2){
                    divInPassword.appendChild(div);
                };
            }else if(inputPassword.value !== ''){
                if(inputPassword.classList.contains('is-invalid')){
                    inputPassword.classList.remove('is-invalid');
                }
            }; 
        }else if(inputEmail.value !== ''){
            if(inputEmail.classList.contains('is-invalid')){
                inputEmail.classList.remove('is-invalid');
            }

            if(inputPassword.value == ''){
                inputPassword.classList.add('is-invalid');
    
                const div = document.createElement('div');
                div.classList.add('invalid-feedback');
                div.textContent = 'Ingrese su password';
                if(divInPassword.children.length == 2){
                    divInPassword.appendChild(div);
                };
            }else if(inputPassword.value !== ''){
                if(inputPassword.classList.contains('is-invalid')){
                    inputPassword.classList.remove('is-invalid');
                }

                localStorage.setItem('redirect', 1);
                window.location = "index.html";
            };
        };

    });
}

validation();