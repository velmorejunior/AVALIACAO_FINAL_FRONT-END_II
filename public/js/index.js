"use strict";
const formLogin = document.getElementById('login');
function entrarNoSistema() {
    const contas = JSON.parse(localStorage.getItem("contas") || "[]");
    const inputUsuario = document.getElementById('username');
    const inputSenha = document.getElementById('password');
    const usuarioDB = contas.find((usuario) => usuario.username === inputUsuario && usuario.password === inputSenha);
    if (!usuarioDB) {
        alert("Usuário nao cadastrado ou senha inválida");
        return;
    }
    sessionStorage.setItem("usuarioAtual", JSON.stringify(usuarioDB.username));
    location.href = 'home.html';
}
