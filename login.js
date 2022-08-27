// CREACIÓN DE FORMULARIO DE REGISTRO

const mainContentForm = document.getElementById('mainContentForm');
const btnRegister = document.getElementById('btnRegister');

btnRegister.onclick = () => {
    mainContentForm.innerHTML = ""

    mainContentForm.innerHTML = `
        <div class="form__write">
            <div class="form-floating">
                <input type="text" class="form-control contact__box" id="floatingInput" placeholder="Juan Carlos" required>
                <label for="floatingInput">Nombre</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control contact__box" id="floatingInput" placeholder="Gonzalez" required>
                <label for="floatingInput">Apellido</label>
            </div>
            <div class="form-floating">
                <input type="date" class="form-control contact__box" id="floatingInput" placeholder="05/01/1992" required>
                <label for="floatingInput">Fecha de nacimiento</label>
            </div>
            <div class="form-floating">
                <input type="email" class="form-control contact__box" id="floatingInput" placeholder="name@example.com" required>
                <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control contact__box" id="floatingPassword" placeholder="Contraseña" required>
                <label for="floatingPassword">Contraseña</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control contact__box" id="floatingPassword" placeholder="Contraseña" required>
                <label for="floatingPassword">Confirmar contraseña</label>
            </div>
        </div>
        <div class="form-check">
            <input id="checkbox" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label form__textcheckbox" for="flexCheckDefault">
                Acepto las <a href="./404.html"><strong>políticas de privacidad</strong></a> y los <a href="./404.html"><strong>términos y condiciones</strong></a>.
            </label>
        </div>
        <input id="btnRegisterFinal" class="form__btn btn btn-primary form-reg-dis" type="" value="Registrarme" readonly="readonly">
    `

    // VALIDACIÓN DEL CHECKBOX PARA PODER REGISTRARSE
    const btnRegisterFinal = document.getElementById('btnRegisterFinal');
    const checkbox = document.getElementById('checkbox');

    checkbox.addEventListener("change", validaCheckbox, false);
    function validaCheckbox(){
        let checked = checkbox.checked;
        if(checked){
            btnRegisterFinal.classList.add('form-reg-act')
            btnRegisterFinal.type = 'submit';
        } else {
            btnRegisterFinal.classList.remove('form-reg-act')
            btnRegisterFinal.type = '';
    }
}}
