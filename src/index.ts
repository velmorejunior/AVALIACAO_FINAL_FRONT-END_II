const formLogin = document.getElementById('login');

function entrarNoSistema(){
    const contas = JSON.parse(localStorage.getItem("contas") || "[]") as Array<any>;  
    const inputUsuario = document.getElementById('username') as HTMLInputElement;
    const inputSenha = document.getElementById('password') as HTMLInputElement;  
    const usuarioDB = contas.find((usuario) => usuario.username === inputUsuario && usuario.password === inputSenha)       
    
    if(!usuarioDB){
        alert("Usuário nao cadastrado ou senha inválida")
        
        return    
    }

    sessionStorage.setItem("usuarioAtual", JSON.stringify(usuarioDB.username))
   
   location.href='home.html'
   
}