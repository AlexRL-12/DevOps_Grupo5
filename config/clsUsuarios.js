const Conexion = require('./clsConexion');

class Usuarios {
    constructor(conexion) {
        this.conexion = conexion; // Usa la conexión que se pasa desde el servidor
    }

    // Método para agregar un nuevo usuario
    async agregarUsuario(usuario) {
        try {
            const sql = `
                INSERT INTO tblusuario
                (bigintIdentificacionUs, strNombreUs, strApellidoUs, strEmailUs, strContrasenaUs, strTelefonoUs, strDireccionUs, intIdCiudad)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const params = [
                usuario.identificacion,
                usuario.nombre,
                usuario.apellido,
                usuario.email,
                usuario.contrasena,
                usuario.telefono,
                usuario.direccion,
                usuario.idCiudad,
            ];
            const resultado = await this.conexion.query(sql, params);

            // Verifica si se ha insertado un nuevo registro
            return resultado.affectedRows > 0; // Retorna true si se insertó correctamente
        } catch (error) {
            console.error('Error al agregar usuario:', error.message);
            return false; // Retorna false si hubo un error
        }
    }

    // Método para verificar credenciales de ingreso
    async ingresarUsuario(credenciales) {
        try {
            await this.conexion.open(); // Abre la conexión
            const sql = `
                SELECT bigintIdentificacionUs FROM tblusuario WHERE strEmailUs=? AND strContrasenaUs=?`;
            const params = [
                credenciales.email,
                credenciales.contrasena,
            ];
            const resultado = await this.conexion.query(sql, params);
            
            if(resultado.length){
                const idUsuario = resultado[0].bigintIdentificacionUs;
                return idUsuario;
            }
            else {
                console.log('Error al iniciar sesion')
            }
            return resultado[0].bigintIdentificacionUs;
        } catch (error) {
            return false;
        }
    }
    
}

module.exports = Usuarios;
