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
            if(!divInEmail.hasChild(div)){
                divInEmail.appendChild(div);
            };
        }else if(!inputEmail.value == ''){
            if(inputEmail.classList.hasChild('is-invalid')){
                inputEmail.classList.remove('is-invalid');
            }

            const div = document.createElement('div');
            if(divInEmail.hasChild(div)){
                divInEmail.removeChild(div);
            };
            if(inputPassword.value == ''){
                inputPassword.classList.add('is-invalid');
    
                const div = document.createElement('div');
                div.classList.add('invalid-feedback');
                div.textContent = 'Ingrese su password';
                if(!divInPassword.hasChild(div)){
                    divInPassword.appendChild(div);
                };
            }else if(!inputPassword.value == ''){
                if(inputPassword.classList.hasChild('is-invalid')){
                    inputPassword.classList.remove('is-invalid');
                }
    
                const div = document.createElement('div');
                if(divInPassword.hasChild(div)){
                    divInPassword.removeChild(div);
                };
            };
        };
    });
}

validation();