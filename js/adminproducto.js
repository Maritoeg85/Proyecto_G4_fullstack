// obtenemos los datos de los productos
const URL = "https://maritoeg85.pythonanywhere.com/"
//const URL = "http://192.168.0.170:5000/"

const app = Vue.createApp(
    {

    data() {
        return {
            id: '',
            nombre: '',
            descripcion: '',
            cantidad: '',
            categoria: '',
            precio: '',
            imagen: '',
            ingredientes:'',
            productos: [],
            modificarproducto: false,
            listarproductos: false ,
            crearproducto: false,
            mostrardatosproducto: false,
        };
    },
    methods: {
        
        ListarProductos() {
            if (this.listarproductos){
                this.listarproductos = false;
                this.modificarproducto = false;
                this.crearproducto = false;
                this.mostrardatosproducto = false;
            }else{
                this.listarproductos = true;
                this.modificarproducto = false;
                this.crearproducto = false;
                this.mostrardatosproducto = false;
                // Obtenemos el contenido del inventario
                    fetch(URL + 'productos')
                        .then(response => {
                            // Parseamos la respuesta JSON 
                            if (response.ok) { return response.json();}
                        })
                        .then(data => {
                            // El código Vue itera este elemento para generar la tabla
                            console.log("traje la data");
                            this.productos = data;
                        })
                        .catch(error => {
                            console.log('Error:', error);
                            alert('Error al obtener los productos.');
                        });
            }
        },
        ListarModProducto(){
            if (this.modificarproducto){
                this.listarproductos = false;
                this.modificarproducto = false;
                this.crearproducto = false;
                this.mostrardatosproducto = false;
            } else{
                this.ListarProductos();
                this.listarproductos = false;
                this.modificarproducto = true;
                this.crearproducto = false;
                this.mostrardatosproducto = false;
            }
            
        },
        MostrarProducto(id) {
            fetch(URL + `productos/${id}`)
                .then(response => response.json())
                .then(data => {
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.descripcion = data.descripcion;
                    this.cantidad = data.cantidad;
                    this.categoria = data.categoria;
                    this.precio = data.precio;
                    this.imagen =  data.imagen;
                    this.ingredientes = data.ingredientes;
                    this.modificarproducto = false;
                    this.listarproductos = false;
                    this.crearproducto = false;
                    this.mostrardatosproducto = true;
                })
                .catch(error => console.error('Error:', error));
        },
        CrearProducto() {
            if (this.crearproducto){
                this.modificarproducto = false;
                this.listarproductos = false;
                this.mostrardatosproducto = false;
                this.crearproducto = false;
            } else {
                this.modificarproducto = false;
                this.listarproductos = false;
                this.mostrardatosproducto = false;
                this.crearproducto = true;
            }
        },
        seleccionarImagen(event) {
            //const file = event.target.files[0];
            //this.imagenSeleccionada = file;
            //this.imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa
        },
        limpiarFormulario() {
            this.nombre = '';
            this.descripcion = '';
            this.precio = '';
            this.url_imagen = '';
        //    this.imagen_url = '';
        //    this.imagenSeleccionada = null;
        //    this.imagenUrlTemp = null;
        //    this.modificarproducto = false;
        },
        AgregarProducto() {
            const formData = new FormData();
            formData.append('nombre', this.nombre);
            formData.append('descripcion', this.descripcion);
            formData.append('imagen', this.imagen);
            formData.append('precio', this.precio);
            formData.append('categoria', this.categoria);
            formData.append('ingredientes', this.ingredientes);
        
            fetch(URL + `productos`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    alert('Producto agregado correctamente');
                    window.open("./adminproducto.html", "_self");
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al agregar el producto');
                })
            
        },
        async ModificarProducto(id) {
            try {
                const formData = new FormData();
                formData.append('id', this.id);
                formData.append('nombre', this.nombre);
                formData.append('descripcion', this.descripcion);
                formData.append('imagen', this.imagen);
                formData.append('precio', this.precio);
                formData.append('categoria', this.categoria);
                formData.append('ingredientes', this.ingredientes);
        
                const response = await fetch(URL + `productos/${id}`, {
                    method: 'PUT',
                    body: formData,
                });
        
                console.log('Respuesta del servidor:', response);
        
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
        
                const data = await response.json();
        
                alert('Producto actualizado correctamente');
                setTimeout(() => {
                    window.open('./adminproducto.html', '_self');
                }, 1000);
        
                return data; // Puedes devolver datos adicionales si es necesario
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                alert('Error al actualizar el producto. Detalles: ' + error.message);
                throw error; // Propaga el error para que pueda ser manejado por el código que llama a esta función
            }
        },
        
        EliminarProducto(id) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                fetch(URL + `productos/${id}`, { 
                method: 'DELETE' , headers: { accept: 'application/json' }, })
                .then(response => {
                if (response.ok) {
                    alert('Producto eliminado correctamente.');
                };
                })
                
            .catch(error => {
                alert(error.message);
                console.log(error)
            })
            setTimeout(function(){window.open("./adminproducto.html", "_self")},100)
            }
        },
        CancelarCambio(){
            window.open("./adminproducto.html", "_self");
        }
    },
    mounted() {
        //this.ListarProductos();
    }
})






//
//
//const app2 = Vue.createApp(
//    {
//
//    data() {
//        return {
//            id: '',
//            nombre: '',
//            descripcion: '',
//            cantidad: '',
//            categoria: '',
//            precio: '',
//            imagen_url: '',
//            productos: [],
//            modificarproducto: false,
//            listarprductos: true,
//        };
//    },
//    methods: {
//        
//        ListarProductos2() {
//                // Obtenemos el contenido del inventario
//                fetch(URL + 'productos')
//                    .then(response => {
//                         // Parseamos la respuesta JSON 
//                        if (response.ok) { return response.json();}
//                    })
//                    .then(data => {
//                        // El código Vue itera este elemento para generar la tabla
//                        this.productos = data;
//                        console.log(data);
//                    })
//                    .catch(error => {
//                        console.log('Error:', error);
//                        alert('Error al obtener los productos.');
//                    });
//        },
//        obtenerProducto2(id) {
//            fetch(URL + `productos/${id}`)
//                .then(response => response.json())
//                .then(data => {
//                    this.id = data.id;
//                    this.nombre = data.nombre;
//                    this.descripcion = data.descripcion;
//                    this.imagen =  data.imagen;
//                    this.precio = data.precio;
//                    this.categoria = data.categoria;
//                    this.ingredientes = data.ingredientes;
//                    this.modificarproducto = true;
//                    this.listarprductos = false;
//                    console.log(data)
//                })
//                .catch(error => console.error('Error:', error));
//        },
//        seleccionarImagen2(event) {
//            //const file = event.target.files[0];
//            //this.imagenSeleccionada = file;
//            //this.imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa
//        },
//        limpiarFormulario2() {
//            this.nombre = '';
//            this.descripcion = '';
//            this.precio = '';
//            this.url_imagen = '';
//        //    this.imagen_url = '';
//        //    this.imagenSeleccionada = null;
//        //    this.imagenUrlTemp = null;
//        //    this.modificarproducto = false;
//        },
//        ModificarProducto2(id) {
//            const formData = new FormData();
//            formData.append('id', this.id);
//            formData.append('nombre', this.nombre);
//            formData.append('descripcion', this.descripcion);
//            formData.append('imagen', this.url_imagen);
//            formData.append('precio', this.precio);
//            formData.append('categoria', this.categoria);
//            formData.append('ingredientes', this.ingredientes.split(',').map(item => item.trim()));
//            console.lo(formData)
//
//
//            fetch(URL + `productos/${id}`, {
//                method: 'PUT',
//                body: formData,
//            })
//                .then(response => response.json())
//                .then(data => {
//                    alert('Producto actualizado correctamente');
//                    window.open("./prod_vue.html", "_self");
//                })
//                .catch(error => {
//                    console.error('Error:', error);
//                    alert('Error al actualizar el producto');
//                })
//            
//        },
//        EliminarProducto2(id) {
//            fetch(URL + `productos/${id}`, { 
//                method: 'DELETE' })
//            .then(response => {
//                if (response.ok) {
//                    alert('Producto eliminado correctamente.');
//                }
//            })
//            .catch(error => {
//                alert(error.message);
//            })
//            window.open("./prod_vue.html", "_self");
//        },
//        CancelarCambio(){
//            this.modificarproducto = false
//        }
//    },
//    mounted() {
//        this.ListarProductos2();
//    }
//})


app.mount('#app')
