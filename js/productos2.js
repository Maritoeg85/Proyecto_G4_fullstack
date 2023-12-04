const productos_url = 'https://maritoeg85.pythonanywhere.com/productos'
//const productos_url = "http://192.168.0.170:5000/productos"


function leeproductos() {
    fetch(productos_url, {
      method: 'GET'
      }
    )
    .then(response => {
       // Parseamos la respuesta JSON 
      if (response.ok) { return response.json()}
    })
    .then(data => {
      // El código Vue itera este elemento para generar la tabla
      //console.log(data);
      var productos = data;
      productos = productos.slice(0,30);
      console.log(productos)
    // Recupero los datos de localstorage si hay algo
      Object.keys(localStorage).forEach(key => {
        if ( key.slice(0,8) == "Producto" ) {
            let cantidadLocal = localStorage.getItem(key);
            let orden = parseInt(key.slice(8,10));
            console.log(orden)
            cantidadLocal = JSON.parse(cantidadLocal);
            if ( cantidadLocal[0] != "0" ) {
              productos[orden].cantidad = cantidadLocal[0];
              console.log(orden, cantidadLocal[0])
            }
        }
      })
      
      // Actualiza el contenido del elemento HTML con el id "contenedor_grid_pizzas".
      for (var i = 0 ; i<30 ; i++) 
      {
        var ingred =""
          if (productos[i].ingredientes) {
            ingred = `                          <p>Ingredientes: ${productos[i].ingredientes}</p>`
          }
          {
          contenedor_grid_pizzas.innerHTML += `
          <article class="pizza_${i}">
              <div class="fondo_pizzas">
                  <div class="articulo_pizza">
                      <div class="imagen_pizza">
                          <img src="${productos[i].imagen}" alt="${productos[i].nombre}">
                      </div>
                      <div class="nombre_pizza">
                          <h3>${productos[i].nombre}</h3>
                      </div>
                      <div class="texto_pizza">
                          <p>${productos[i].descripcion}</p>
                          ${ingred}
                      </div>
                      <h4 class="precioProducto">Solo por: $ ${productos[i].precio}</h4>
                      <a>Cantidad: <span class="cantArticulo">${productos[i].cantidad}</span></a>
                    <div>
                      <button class="boton_agregar_eliminar" onclick="agregarPizza(${i})">
                          Agregar
                      </button>
                    <button class="boton_agregar_eliminar" onclick="eliminarPizza(${i})">
                              Eliminar
                          </button>
                      </div>
                      </div>
                  </div>
              </article>`
          };
      }
    })
  }
// Falta la funcion que traspasa las cantidades al pedido

// Falta funcion para totalizar el monto del pedido

leeproductos()