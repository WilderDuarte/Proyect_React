import { useState } from 'react';
import Swal from 'sweetalert2';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import './LoginPage.css';
import logo from '../../assets/brilla.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const usuarios = [
    { email: "juan@correo.com", password: "Jua123" },
    { email: "maria@correo.com", password: "Mar123" },
    { email: "carlos@correo.com", password: "Car123" },
    { email: "laura@correo.com", password: "Lau123" },
    { email: "andres@correo.com", password: "And123" },
    { email: "camila@correo.com", password: "Cam123" },
    { email: "david@correo.com", password: "Dav123" },
    { email: "paula@correo.com", password: "Pau123" },
    { email: "jose@correo.com", password: "Jos123" },
    { email: "valentina@correo.com", password: "Val123" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Campos vacíos", "Por favor llena todos los campos.", "warning");
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(email)) {
      Swal.fire("Correo inválido", "Por favor escribe un correo válido.", "error");
      return;
    }

    const usuarioValido = usuarios.find(
      u => u.email === email && u.password === password
    );

    if (usuarioValido) {
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "/dashboard";
      });
    } else {
      Swal.fire("Error", "Correo o contraseña incorrectos.", "error");
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: "¡Bienvenido!",
          text: `Sesión iniciada con Google: ${user.email}`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "/dashboard";
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "No se pudo iniciar sesión con Google.", "error");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div className="form-card">
        <img
          src={logo}
          alt="Logo de Brilla"
          className="logo mb-3 d-block mx-auto"
          style={{ width: '250px' }}
        />
        <h3 className="mb-4 text-center">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Entrar</button>
          </div>
        </form>

        <div className="text-center mt-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
          >
            <img
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="Google logo"
              style={{ width: '20px', height: '20px' }}
            />
            Iniciar sesión con Google
          </button>
          <a href="/register">¿No tienes cuenta? Regístrate</a><br />
          <a href="/forgot">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
