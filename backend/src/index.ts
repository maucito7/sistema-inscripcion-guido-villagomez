import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { crearUsuarioPrueba } from './services/usuarios.service';

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: "Servidor funcionando correctamente" });
});

// Iniciar servidor
app.listen(PORT, async () => {
    await crearUsuarioPrueba(); // Crear usuarios de prueba
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
    console.log(` Usuarios disponibles:`);
    console.log(`   - admin / admin123 (ADMINISTRADOR)`);
    console.log(`   - secretaria / secre123 (SECRETARIA)`);
    console.log(`   - tutor / tutor123 (TUTOR)`);
});
