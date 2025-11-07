import { useState } from 'react';
// importampos auth y db de firebase
import { auth, db } from '../../firebase/config'; 
//son funciones de firbease para crear usuarios
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

const RegisterPage = () => {
  //ahora agregamos las variables para el manejo del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // es la funcion que se ejecuta al enviar el formulario
  const handleRegister = async (e) => {
    e.preventDefault(); 

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      //creamos el usuario en firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Usuario creado en Auth:", user.uid);

      // guardamos datos extra, rol y nombre
      //creamos un doc "usuarios" con el id
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre,
        email: email,
        rol: "Reportero" // por ahora todos son registrados como reporteros
      });

      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      

    } catch (error) {
      // manejo de errores otorgado por firebase
      console.error("Error al registrar:", error.message);
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Crear Cuenta</h2>
          
          {/*llama a la funcion*/}
          <form onSubmit={handleRegister}>
            
            <div className="mb-3">
              <label htmlFor="nombreInput" className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="nombreInput"
                placeholder="Tu nombre"
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}
                required 
              />
            </div>

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
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPasswordInput" className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="confirmPasswordInput"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <span>¿Ya tienes cuenta? </span>
            <a href="/login">Inicia Sesión</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;