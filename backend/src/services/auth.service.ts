import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { buscarUsuario } from './usuarios.service';

const JWT_SECRET = "clave_secreta_del_proyecto_guido_villagomez";

export async function verificarLogin(usuario: string, contrasena: string) {
    const usuarioEncontrado = buscarUsuario(usuario);
    
    if (!usuarioEncontrado) {
        return { exito: false, mensaje: "Usuario o contraseña incorrectos" };
    }

    const coincide = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

    if (!coincide) {
        return { exito: false, mensaje: "Usuario o contraseña incorrectos" };
    }

    const token = jwt.sign(
        { id: usuarioEncontrado.id, rol: usuarioEncontrado.rol, nombre: usuarioEncontrado.nombre },
        JWT_SECRET,
        { expiresIn: '2h' }
    );

    return {
        exito: true,
        token,
        usuario: {
            id: usuarioEncontrado.id,
            nombre: usuarioEncontrado.nombre,
            rol: usuarioEncontrado.rol
        }
    };
}
