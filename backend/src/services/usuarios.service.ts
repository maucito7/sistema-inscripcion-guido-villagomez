import bcrypt from 'bcrypt';

export const usuariosDB: any[] = [];

export async function crearUsuarioPrueba() {
    const salt = await bcrypt.genSalt(10);
    const hashAdmin = await bcrypt.hash("admin123", salt);
    const hashSecretaria = await bcrypt.hash("secre123", salt);
    const hashTutor = await bcrypt.hash("tutor123", salt);

    usuariosDB.push(
        { id: 1, usuario: "admin", contrasena: hashAdmin, rol: "ADMINISTRADOR", nombre: "Denzel Yugar" },
        { id: 2, usuario: "secretaria", contrasena: hashSecretaria, rol: "SECRETARIA", nombre: "Diana Muñoz" },
        { id: 3, usuario: "tutor", contrasena: hashTutor, rol: "TUTOR", nombre: "Hugo Martinez" }
    );
    
    console.log("✅ Usuarios de prueba creados en memoria");
}

export function buscarUsuario(usuario: string) {
    return usuariosDB.find(u => u.usuario === usuario);
}
