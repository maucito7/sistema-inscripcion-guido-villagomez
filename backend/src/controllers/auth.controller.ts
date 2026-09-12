import { Request, Response } from 'express';
import { verificarLogin } from '../services/auth.service';

const intentosFallidos: { [key: string]: number } = {};

export async function login(req: Request, res: Response) {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ 
            exito: false, 
            mensaje: "Debe completar usuario y contraseña" 
        });
    }

    if (intentosFallidos[usuario] >= 3) {
        return res.status(403).json({ 
            exito: false, 
            mensaje: "Usuario bloqueado. Contacte al administrador." 
        });
    }

    const resultado = await verificarLogin(usuario, contrasena);

    if (!resultado.exito) {
        intentosFallidos[usuario] = (intentosFallidos[usuario] || 0) + 1;
        const restantes = 3 - intentosFallidos[usuario];
        
        return res.status(401).json({ 
            exito: false, 
            mensaje: `${resultado.mensaje}. Intentos restantes: ${restantes}` 
        });
    }

    intentosFallidos[usuario] = 0;

    return res.json({
        exito: true,
        token: resultado.token,
        usuario: resultado.usuario,
        mensaje: "Login exitoso"
    });
}
