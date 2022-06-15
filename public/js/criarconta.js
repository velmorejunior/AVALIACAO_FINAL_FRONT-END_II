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
    if (testaSenha(inputSenha, inputNovaSenha) == true) {
        salvaConta();
    }
    else {
        alert("As senhas não conferem");
    }
}
function salvaConta() {
    const username = inputUsuario;
    const password = inputSenha;
    const newpassword = inputNovaSenha;
    const novaConta = {
        username: username,
        password: password,
        newpassword: newpassword,
    };
    gravarNaStorage(novaConta);
    location.href = './index.html';
}
function gravarNaStorage(conta) {
    const lista = recuperaConta();
    lista.push(conta);
    localStorage.setItem("contas", JSON.stringify(lista));
}
