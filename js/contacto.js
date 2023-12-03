/************************************************************************************/
/* Limpiar Campos Contacto */
/************************************************************************************/
function limpiarCampos(){
    var nombre = document.getElementById("nombre-contacto");
    var email = document.getElementById("email-contacto");
    var comentario = document.getElementById("comentario-contacto");
    const mensaje = document.querySelectorAll("#mensaje-rojo");
    const mensaje2 = document.getElementById("mensaje-rojo2");

    /*Limpio los campos del formulario*/
    nombre.value = "";
    email.value = "";
    comentario.value = "";
    
    /*Limpio cada mensaje en rojo de cada campo del formulario Contacto*/
    for(i=0; i<mensaje.length; i++){    
        mensaje[i].textContent = "";
    }

    mensaje2.textContent = "";/*Limpio mensaje rojo2 de cada campo del formulario Contacto*/
        
    document.formularioContacto.nombreContacto.focus();
}

/************************************************************************************/
/* Validar Formulario Contacto */
/************************************************************************************/
function validarformularioContacto(){
    
    const mensaje = document.querySelectorAll("#mensaje-rojo");

    /*Validación del campo nombre del formulario Contacto. */
    if(document.formularioContacto.nombreContacto.value.length <=2){
        document.formularioContacto.nombreContacto.focus();
        mensaje[0].textContent = "* Debes completar con un NOMBRE";
        return;
    }else{
        mensaje[0].textContent = "";        
    }    

    /* Validación del campo email del formulario Contacto. */
    if(document.formularioContacto.emailContacto.value.length <=2){        
        document.formularioContacto.emailContacto.focus();
        mensaje[1].textContent = "* Debes completar con un EMAIL";
        return;
    }else{
        mensaje[1].textContent = "";        
    }

    /* Validación del campo comentario del formulario Contacto */
    if(document.formularioContacto.comentarioContacto.value.length <=2){        
        document.formularioContacto.comentarioContacto.focus();
        mensaje[2].textContent = "* Debes completar el COMENTARIO";
        return;
    }else{
        mensaje[2].textContent = "";        
    }

    /* Si los campos están completos se envían los datos del formulario. */
    alert("Se ha registrado su Comentario. MUCHAS GRACIAS!!!");
    document.formularioContacto.submit();
}


/************************************************************************************/
/* Validar tipeo en campo Nombre */
/************************************************************************************/
function validarNombre(event) {
    const inputNombre = document.getElementById("nombre-contacto");
    const mensaje = document.getElementById("mensaje");

    const valorNombre = inputNombre.value; // se obtiene el valor actual del campo Nombre        
    const nombreValido = valorNombre.replace(/[^a-zA-Z ]/g, ""); // Uso de expresión regular solo p/digitos alfabeticos/espacio en blanco

    inputNombre.value = nombreValido;// Se actualiza el campo Nombre con el nombreValido
    
    // Muestra un mensaje si se eliminaron caracteres no válidos
    /*if (valorNombre !== nombreValido) {
        mensaje.textContent = "Solo se permiten letras alfabéticas.";
    } else {
        mensaje.textContent = "";
    }*/
}
/************************************************************************************/
/* Validar tipeo en campo Email */
/************************************************************************************/
function validarEmail(event) {
    const inputEmail = document.getElementById("email-contacto");
    const mensaje = document.getElementById("mensaje-rojo2");
    const mensajep1 = document.querySelectorAll("#mensaje-rojo");
    
    const valorEmail = inputEmail.value;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; //Expresion regular para validar el formato de email

    if (regexEmail.test(valorEmail)) {
        mensaje.textContent = ""; // Correo electrónico válido
        mensajep1[1].textContent = ""; // Limpio el mensaje 1 de completar.    
    } else {
        mensaje.textContent = "Correo electrónico no válido"; // Correo electrónico no válido        
    }
}