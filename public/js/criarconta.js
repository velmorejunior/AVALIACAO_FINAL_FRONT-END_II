"use strict";
const formConta = document.querySelector("#criaConta");
const inputUsuario = document.getElementById("username");
const inputSenha = document.getElementById("password");
const inputNovaSenha = document.getElementById("newpassword");
function recuperaConta() {
    const contas = JSON.parse(localStorage.getItem("contas") || "[]");
    return contas;
}
const testaSenha = (senha, senhaConfirma) => senha === senhaConfirma;
function criarConta() {
    const contas = recuperaConta();
    const usuario = inputUsuario;
    let usuarioJaExiste = false;
    const userExists = contas.some(conta => conta.username === usuario);
    if (userExists) {
        alert("usuário já cadastrado.");
        return;
    }
    if (inputSenha.value === inputNovaSenha.value) {
        salvaConta();
    }
    else {
        alert("As senhas não conferem");
    }
}
function salvaConta() {
    const username = inputUsuario.value;
    const password = inputSenha.value;
    const newpassword = inputNovaSenha.value;
    const novaConta = {
        username: username,
        password: password,
        newpassword: newpassword,
    };
    gravarContaStorage(novaConta);
    location.href = './index.html';
}
function gravarContaStorage(conta) {
    const lista = recuperaConta();
    lista.push(conta);
    localStorage.setItem("contas", JSON.stringify(lista));
}
