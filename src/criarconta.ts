const formConta = document.querySelector("#criaConta");

const inputUsuario = document.getElementById("username") as HTMLInputElement;
const inputSenha = document.getElementById("password") as HTMLInputElement;
const inputNovaSenha = document.getElementById("newpassword") as HTMLInputElement;

function recuperaConta(){
    const contas = JSON.parse(localStorage.getItem("contas") || "[]") as Array<any>;
    return contas;
}

const testaSenha = (senha: string, senhaConfirma: string) => senha === senhaConfirma

function criarConta(){      
    
    const contas = recuperaConta();

    const usuario = inputUsuario;
    let usuarioJaExiste: boolean = false;

    const userExists = contas.some(conta=> conta.username === usuario)
 
    if(userExists){
        alert("usuário já cadastrado.")
        return
    }

    if (testaSenha(inputSenha, inputNovaSenha) == true){
        salvaConta();
    } else{
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
    location.href = './index.html'
}

function gravarNaStorage(conta: HTMLInputElement){
  const lista = recuperaConta()
  lista.push(conta)
  localStorage.setItem("contas",JSON.stringify(lista));
  
}
