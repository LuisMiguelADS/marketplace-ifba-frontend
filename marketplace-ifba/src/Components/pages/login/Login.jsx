import React, { Component } from 'react'
import './Login.css';
import logoIfba from '../../../assets/logo_ifba.png';

export class Login extends Component {
  render() {
    return (
    <>
  <section id="body-section-logi">
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    rel="stylesheet"
  />
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="styles.css" />
  <title>Login</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
  <section id="con">
    <div id="con-01">
      <div id="seta-retorno">
        <a href="/">
          <span className="material-symbols-outlined">arrow_back</span>
        </a>
      </div>
      <div id="con-logo">
        <img id="logo-ifba" src={logoIfba} alt="." />
      </div>
    </div>
    <div id="con-02">
      <h3 id="titulo-login">Login</h3>
      <form id="formulario-login" action="#">
        <label htmlFor="#">Email</label>
        <br />
        <input type="email" placeholder="Digite aqui o seu e-mail" />
        <br />
        <br />
        <label htmlFor="#">Senha</label>
        <br />
        <input type="password" placeholder="No mínimo 08 caracteres" />
        <br />
        <div id="me-lembre-checkbox">
          <input type="checkbox" /> <p>Me lembre</p>
        </div>
        <br />
        <div id="con-botao-entrar">
          <button type="submit">Entrar</button>
        </div>
      </form>
      <div id="rodape">
        <p>Não possui uma conta:</p>
        <a href="#">Cadastre-se</a>
      </div>
    </div>
  </section>

  </section>
</>

 
    )
  }
}

export default Login;