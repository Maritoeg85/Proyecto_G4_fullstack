// Agregar aca las funciones - Se llama desde Index.html

function testLlamada() {
    console.log("La función testLlamada se realizó con éxito")
}

function agregarPizza(numero) {
    let cantidadID = document.getElementsByClassName("cantArticulo")
    let nombreID = document.getElementsByClassName("nombre_pizza")
    let precioID = document.getElementsByClassName("precioProducto")
    let arregloDatos = []     
    let total = parseInt(cantidadID[numero].innerText)
    if (total < 10) {
        cantidadID[numero].innerText = parseInt(cantidadID[numero].innerText) + 1
    }
    arregloDatos.push(parseInt(cantidadID[numero].innerText), nombreID[numero].innerText, parseInt(precioID[numero].innerText.slice(12,)))
    localStorage.setItem("Producto"+numero, JSON.stringify(arregloDatos))
}

function eliminarPizza(numero) {
    let cantidadID = document.getElementsByClassName("cantArticulo")
    let nombreID = document.getElementsByClassName("nombre_pizza")
    let precioID = document.getElementsByClassName("precioProducto")
    let arregloDatos = []     
    if (parseInt(cantidadID[numero].innerText) > 0) {
        cantidadID[numero].innerText = parseInt(cantidadID[numero].innerText) - 1
    }
    arregloDatos.push(parseInt(cantidadID[numero].innerText), nombreID[numero].innerText, parseInt(precioID[numero].innerText.slice(12,)))
    localStorage.setItem("Producto"+numero, JSON.stringify(arregloDatos))  
}

function mostrarPedido() {
    let listaPedidoCompleta = document.getElementById("listaPedido")
    var total = 0;
    Object.keys(localStorage).forEach(key => {
        if ( key.slice(0,8) == "Producto" ) {
            let producto = localStorage.getItem(key)
            producto = JSON.parse(producto)
            if ( producto[0] != "0" ) {
                let ingreso = document.createElement("li")
                console.log(producto[1])
                ingreso.innerText = producto[0] + " " + producto[1] + " por un total de $ " + producto[0]*producto[2]
                listaPedidoCompleta.appendChild(ingreso)
                total = total + (producto[0]*producto[2])
            }
        }
    }
    )
    listaPedidoCompleta.innerHTML += `<br>`
    let final = document.createElement("b")
    final.innerText = "Total del pedido: $ " + total
    listaPedidoCompleta.appendChild(final)
    if ( total != 0 ) {
        listaPedidoCompleta.innerHTML += `<br><a>Este monto deberá ser abonado contra entrega</a>`    
    }
}

function enviar() {
    document.formPedido.submit()
}

function validarForm() {
    let nombre = document.formPedido.nombre.value
    let alertNombre = document.getElementById("alertNombre")
    if (nombre == "") { alertNombre.innerText = "Escriba un nombre válido"; return  }
    else { alertNombre.innerText = "" }

    let direccion = document.formPedido.direccion.value
    let alertDireccion = document.getElementById("alertDireccion")
    if (direccion == "") { alertDireccion.innerText = "Escriba una dirección válida"; return  }
    else { alertDireccion.innerText = "" }

    let telefono = document.formPedido.tel.value
    let alertTel = document.getElementById("alertTel")
    if (telefono.length != 10) { alertTel.innerText = "Escriba un número de teléfono válido"; return  }
    else { alertTel.innerText = "" }

    let correo = document.formPedido.correo.value
    let alertCorreo = document.getElementById("alertCorreo")
    let contador = 0
    for (i = 0; i < correo.length; i++) {
        if (correo.charAt(i) == "@" || correo.charAt(i) == ".") {
            contador = contador + 1
        }
    }
    if (contador < 2) { alertCorreo.innerText = "Escriba una dirección de correo válida"; return  }
    else { alertCorreo.innerText = "" }
    
    let alertHora = document.getElementById("alertHora")
    if (
        document.formPedido.hora[0].checked == false &&
        document.formPedido.hora[1].checked == false &&
        document.formPedido.hora[2].checked == false
    ) { alertHora.innerText = "Seleccione un horario de entrega"; return }
    else { alertHora.innerText = "" }

    let alertCaptcha = document.getElementById("alertCaptcha")
    if (grecaptcha.getResponse().length == 0) {
        alertCaptcha.innerText = "Complete la validación del CAPTCHA"; return }
    else { alertCaptcha.innerText = "" }

    let envioForm = document.getElementById("envioForm")
    envioForm.innerText = "Su formulario fue enviado con éxito"
 
    Object.keys(localStorage).forEach(key => {
        if ( key.slice(0,8) == "Producto" ) {
            localStorage.removeItem(key)
        }
    })

    setTimeout(() => {
        document.formPedido.submit()
    }, 2000);
}


function vaciarCarrito() {
    Object.keys(localStorage).forEach(key => {
        if ( key.slice(0,8) == "Producto" ) {
            localStorage.removeItem(key)
        }
    })
}