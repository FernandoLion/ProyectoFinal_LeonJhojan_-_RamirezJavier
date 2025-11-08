import { useState } from 'react';
//importamos el auth de nuestra configuracion
import { auth } from '../../firebase/config'; 
//importamos el login de nuesrea confi
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
 //variables para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //no habia colocado esto y daba error xd

  //la funcion que maneja todo el login
  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      //se intenta iniciar sesion con firevase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      //por ahora manejamso todo desde consola y con alerts
      console.log("¡Inicio de sesión exitoso!", user.uid);
      alert("¡Bienvenido de vuelta!");
      navigate("/admin");
      
      //aca luego va la logica de redireccion, admin o reportero

    } catch (error) {
      // manejo de errores de firebase
      console.error("Error al iniciar sesión:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          
          {/*conectamos el boton con la funcion */}
          <form onSubmit={handleLogin}>
            
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="tu@correo.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="d-grid"> 
              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <span>¿No tienes cuenta? </span>
            <a href="/registro">Regístrate</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;