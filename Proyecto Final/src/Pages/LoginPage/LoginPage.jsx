import { useState } from 'react';

const LoginPage = () => {


  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <form>
            
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
                placeholder="Tu contraseña"
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