#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify, render_template
#from flask import request

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time
#--------------------------------------------------------------------


app = Flask(__name__)
cors = CORS(app)  # Esto habilitará CORS para todas las rutas

#--------------------------------------------------------------------
class Catalogo:
    #----------------------------------------------------------------
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        # Primero, establecemos una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
                        # Una vez que la base de datos está establecida, creamos las tablas si no existe
                with open( 'Codo a Codo/Project/Final_project_backend/py/app_db.sql' , 'r') as sql_file:
                    result_iterator = self.cursor.execute(sql_file.read(), multi=True)
                    for res in result_iterator:
                        print("Running query: ", res)  # Will print out a short representation of the query
                        print(f"Affected {res.rowcount} rows" )

                    self.conn.commit()

            else:
                raise err



        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)
        
    #----------------------------------------------------------------
    def agregar_producto(self, nombre , descripcion , imagen , precio , categoria , ingredientes ):
        # Verificamos si ya existe un producto con el mismo código
        #sql_check = "SELECT * FROM productos WHERE nombre like %s"
        #value = ({nombre})
        #self.cursor.execute(sql_check, value )
        #self.cursor.execute(f"SELECT * FROM productos WHERE nombre like {nombre}")

        #producto_existe = self.cursor.fetchone() nombre , descripcion , imagen , precio , categoria , ingredientes
        #if producto_existe:
        #    return False

        # sql = f"INSERT INTO productos (nombre, descripcion, categoria, precio, url_imagen) VALUES ({nombre}, {descripcion}, {categoria}, {precio}, {url_imagen})"
        sql = "INSERT INTO productos ( `nombre` , `descripcion` , imagen , precio , categoria , `ingredientes`) VALUES (%s, %s, %s, %s, %s, %s)"

        valores = (nombre, descripcion, imagen, precio , categoria, ingredientes)
        self.cursor.execute(sql, valores)        
        
        #self.cursor.execute(sql)        
        self.conn.commit()
        return True

    #----------------------------------------------------------------
    #para obtener un dropdown
    def consultar_producto(self, id):
        # Consultamos un producto a partir de su nombre
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        return self.cursor.fetchone()

    #----------------------------------------------------------------
    def modificar_producto(self, id, nuevo_nombre, nueva_descripcion, nueva_imagen, nuevo_precio, nueva_categoria, nuevos_ingredientes):
        try:
            sql = "UPDATE productos SET `nombre` = %s, `descripcion` = %s, imagen = %s, precio = %s, categoria = %s, `ingredientes` = %s WHERE id = %s"
            valores = (nuevo_nombre, nueva_descripcion, nueva_imagen, nuevo_precio, nueva_categoria, nuevos_ingredientes, id)

            # Ejecutar la consulta SQL
            self.cursor.execute(sql, valores)

            # Confirmar la transacción en la base de datos
            self.conn.commit()


            # Imprimir el número de filas afectadas (opcional)
            print("Filas afectadas:", self.cursor.rowcount)

            # Retornar True si al menos una fila fue afectada
            return self.cursor.rowcount > 0
        except Exception as e:
            # Manejo de errores
            print("Error al modificar el producto:", str(e))
            # Puedes elevar la excepción nuevamente si es necesario
            raise e


    #----------------------------------------------------------------
    def listar_productos(self):
        self.cursor.execute("SELECT * FROM productos order by categoria desc,nombre asc")
        productos = self.cursor.fetchall()
        return productos
    #----------------------------------------------------------------
    def eliminar_producto(self, id):
        # Eliminamos un producto de la tabla a partir de su nombre
        self.cursor.execute(f"DELETE FROM productos WHERE id = {id}")
        self.conn.commit()
        print(self.cursor.rowcount)
        return True


#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
#catalogo = Catalogo(host='maritoeg85.mysql.pythonanywhere-services.com', user='maritoeg85', password='codoacodo', database='maritoeg85$udinese')
catalogo = Catalogo(host='localhost', user='maritoeg85', password='C0c0dr1l0', database='udinese')
# Carpeta para guardar las imagenes.
RUTA_DESTINO = './static/imagenes/'

#--------------------------------------------------------------------
@app.route("/productos", methods=["GET"])
def listar_productos():
    productos = catalogo.listar_productos()
    return jsonify(productos)
#--------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["GET"])
def mostrar_producto(id):
    producto = catalogo.consultar_producto(id)
    if producto:
        return jsonify(producto), 201
    else:
        return "Producto no encontrado", 404
#--------------------------------------------------------------------
@app.route("/productos", methods=["POST"])
def agregar_producto():
    #Recojo los datos del form
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    categoria = request.form['categoria']
    precio = request.form['precio']
    imagen = request.form['imagen']
    ingredientes = request.form['ingredientes']  

    if catalogo.agregar_producto( nombre , descripcion , imagen , precio , categoria , ingredientes):
        return jsonify({"mensaje": "Producto agregado"}), 201
    else:
        return jsonify({"mensaje": "Producto ya existe"}), 400
#--------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["PUT"])
def modificar_producto(id):
    #Recojo los datos del form
    nuevo_nombre = request.form.get("nombre")
    nueva_descripcion = request.form.get("descripcion")
    nueva_categoria = request.form.get("categoria")
    nuevo_precio = request.form.get("precio")
    nueva_imagen = request.form.get("imagen")
    nuevos_ingredientes = request.form.get("ingredientes")

    #modificar_producto( id, nuevo_nombre, nueva_descripcion, nueva_imagen, nuevo_precio, nueva_categoria, nuevos_ingredientes)
    if catalogo.modificar_producto( id, nuevo_nombre, nueva_descripcion, nueva_imagen, nuevo_precio, nueva_categoria, nuevos_ingredientes):
        return jsonify({"mensaje": "Producto modificado"}), 200
    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 403


#--------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["DELETE"])
def eliminar_producto(id):

    # Luego, elimina el producto del catálogo
    if catalogo.eliminar_producto(id):
        return jsonify({"mensaje": "Producto eliminado"}), 200
    else:
        return jsonify({"mensaje": "Error al eliminar el producto"}), 500
    

#--------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
