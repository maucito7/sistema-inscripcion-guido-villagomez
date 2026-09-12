import { useState } from 'react';
import axios from 'axios';
import './App.css';

interface Usuario {
  id: number;
  nombre: string;
  rol: string;
}

function App() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [logueado, setLogueado] = useState<Usuario | null>(null);
  const [bloqueado, setBloqueado] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setCargando(true);

    try {
      const respuesta = await axios.post('http://localhost:4000/api/auth/login', {
        usuario,
        contrasena
      });

      if (respuesta.data.exito) {
        localStorage.setItem('token', respuesta.data.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario));
        setLogueado(respuesta.data.usuario);
        setMensaje(`¡Bienvenido ${respuesta.data.usuario.nombre}!`);
      }
    } catch (error: any) {
      const msg = error.response?.data?.mensaje || 'Error de conexión con el servidor';
      setMensaje(msg);
      
      if (msg.includes('bloqueado')) {
        setBloqueado(true);
      }
    } finally {
      setCargando(false);
    }
  };

  if (logueado) {
    return (
      <div className="container">
        <div className="card success-card">
          
          <h2>ACCESO CONCEDIDO</h2>
          <p><strong>Nombre:</strong> {logueado.nombre}</p>
          <p><strong>Rol:</strong> <span className="rol-badge">{logueado.rol}</span></p>
          
          <div className="info-text">
            {logueado.rol === 'ADMINISTRADOR' && (
              <div>
                <h3>Panel de Administrador</h3>
                <p>Aquí se mostrarían:</p>
                <ul>
                  <li>Gestión de Usuarios</li>
                  <li>Reportes y Estadísticas</li>
                  <li>Configuración del Sistema</li>
                </ul>
              </div>
            )}
            {logueado.rol === 'SECRETARIA' && (
              <div>
                <h3>Panel de Secretaría</h3>
                <p>Aquí se mostrarían:</p>
                <ul>
                  <li>Registrar Estudiante Nuevo</li>
                  <li>Actualizar Datos</li>
                  <li>Gestionar Cupos</li>
                  <li>Generar Reportes</li>
                </ul>
              </div>
            )}
            {logueado.rol === 'TUTOR' && (
              <div>
                <h3>Portal de Padres/Tutores</h3>
                <p>Aquí se mostrarían:</p>
                <ul>
                  <li>Consultar Notas</li>
                  <li>Ver Avisos</li>
                  <li>Consultar Cupos Disponibles</li>
                  <li>Estado de Inscripción</li>
                </ul>
              </div>
            )}
          </div>

          <button 
            className="btn-principal" 
            onClick={() => { 
              setLogueado(null); 
              setUsuario(''); 
              setContrasena(''); 
              setMensaje(''); 
              localStorage.clear(); 
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header-login">
          <div className="logo-placeholder">🎓</div>
          <h1>SISTEMA DE GESTIÓN</h1>
          <p>U.E. ESPECIAL GUIDO VILLAGÓMEZ ANEXO</p>
          <small>Inicie sesión para acceder al sistema</small>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>USUARIO</label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              disabled={bloqueado || cargando}
            />
          </div>

          <div className="form-group">
            <label>CONTRASEÑA</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              disabled={bloqueado || cargando}
            />
          </div>

          {mensaje && (
            <div className={`mensaje ${mensaje.includes('Bienvenido') ? 'exito' : 'error'}`}>
              {mensaje}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-principal" 
            disabled={cargando || bloqueado}
          >
            {cargando ? 'Verificando...' : 'Iniciar Sesión'}
          </button>

          <button 
            type="button" 
            className="btn-secundario"
            onClick={() => alert('Acceso como invitado - Funcionalidad pendiente')}
            disabled={bloqueado}
          >
            Entrar como invitado
          </button>
        </form>

        <div className="ayuda">
          <small>
            <strong>👤 Usuarios de prueba:</strong><br/>
            <code>admin / admin123</code><br/>
            <code>secretaria / secre123</code><br/>
            <code>tutor / tutor123</code>
          </small>
        </div>
      </div>
    </div>
  );
}

export default App;
