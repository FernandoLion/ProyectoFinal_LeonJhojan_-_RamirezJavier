import { useState } from 'react';

const RegisterPage = () => {


  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Crear Cuenta</h2>
          <form >
            
            <div className="mb-3">
              <label htmlFor="nombreInput" className="form-label">
                Nombre Completo
              </label>
              <input
                type="text"
                className="form-control"
                id="nombreInput"
                placeholder="Tu nombre"
                
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="tu@correo.com"
                required 
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPasswordInput" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPasswordInput"
                placeholder="Repite tu contraseña"
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