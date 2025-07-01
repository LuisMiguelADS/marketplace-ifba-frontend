import React, { Component } from 'react'
import './Register.css';

export class Register extends Component {
  render() {
    return (
      <>
  <section id='body-section-regi'>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    rel="stylesheet"
  />
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="styles.css" />
  <title>Cadastro</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
  <section id="regi-con">
    <div id="regi-con-01">
      <div id="regi-seta-realize-seu-cadastro">
        <a href="/">
          <span className="material-symbols-outlined">arrow_back</span>
        </a>
        <h3>Realize seu cadastro</h3>
      </div>
      <form id="regi-formulario" action="#">
        <label htmlFor="#">Nome completo</label>
        <br />
        <input type="email" placeholder="Seu nome completo" />
        <br />
        <br />
        <label htmlFor="#">Senha</label>
        <br />
        <input type="password" placeholder="No mínimo 08 caracteres" />
        <br />
        <br />
        <label htmlFor="#">Confirmar Senha</label>
        <br />
        <input type="password" placeholder="Digite sua senha novamente" />
        <br />
        <br />
        <label htmlFor="#">Data de nascimento</label>
        <br />
        <input type="date" placeholder="" />
        <br />
        <br />
        <label htmlFor="#">Nivel de experiência</label>
        <br />
        <select />
      </form>
    </div>
    <div id="regi-con-02">
      <form id="regi-formulario" action="#">
        <label htmlFor="#">Email</label>
        <br />
        <input type="email" placeholder="Digite seu email" />
        <br />
        <br />
        <label htmlFor="#">Telefone</label>
        <br />
        <input type="text" placeholder="75 90000-0000" />
        <br />
        <br />
        <label htmlFor="#">CPF</label>
        <br />
        <input type="text" placeholder="000.000.000-00" />
        <br />
        <br />
        <label htmlFor="#">Biográfia</label>
        <br />
        <input id="regi-campo-biografia" type="text" placeholder="Digite aqui..." />
        <br />
        <br />
        <div id="regi-botao-submit">
          <button type="submit">Cadastrar</button>
        </div>
        <div id="regi-rodape">
          <p>Já possui uma conta?:</p>
          <a href="#">Entre aqui</a>
        </div>
      </form>
    </div>
  </section>

  </section>
</>

    )
  }
}

export default Register;