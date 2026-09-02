/*
====================================================
    YOKAI TAILS - JAVASCRIPT

    Este arquivo controla:
    - Cadastro de usuários
    - Login
    - Verificação de senha
    - Redirecionamento

    Os usuários são armazenados no localStorage.

    IMPORTANTE:
    localStorage serve apenas para demonstração.
    Em um sistema real, senhas não devem ser
    armazenadas dessa forma.
====================================================
*/


/*
    PEGANDO O FORMULÁRIO DE CADASTRO

    O "getElementById" procura no HTML um elemento
    que tenha o ID informado.
*/

const formCadastro = document.getElementById("formCadastro");


/*
    Verificamos se o formulário existe.

    Isso é necessário porque o mesmo JavaScript
    é utilizado tanto na página de login quanto
    na página de cadastro.
*/

if (formCadastro) {

    /*
        Quando o usuário clicar em "Criar conta",
        essa função será executada.
    */

    formCadastro.addEventListener("submit", function(event) {

        /*
            Impede o navegador de recarregar a página.
        */

        event.preventDefault();


        // Pegando os valores digitados pelo usuário

        const usuario = document.getElementById("novoUsuario").value;

        const email = document.getElementById("novoEmail").value;

        const senha = document.getElementById("novaSenha").value;

        const confirmaSenha = document.getElementById("confirmaSenha").value;


        // Elemento onde vamos mostrar as mensagens

        const mensagem = document.getElementById("mensagemCadastro");


        /*
            Verifica se as duas senhas são iguais.
        */

        if (senha !== confirmaSenha) {

            mensagem.innerText = "As senhas não são iguais.";

            mensagem.style.color = "#ff5c6c";

            return;
        }


        /*
            Procuramos no localStorage se já existe
            algum usuário cadastrado.

            Se não existir, usamos um array vazio.
        */

        let usuarios = JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];


        /*
            Verifica se o usuário já está cadastrado.
        */

        const usuarioExiste = usuarios.some(function(item) {

            return item.usuario === usuario;

        });


        if (usuarioExiste) {

            mensagem.innerText = "Esse usuário já existe.";

            mensagem.style.color = "#ff5c6c";

            return;
        }


        /*
            Criamos um objeto contendo os dados
            do novo usuário.
        */

        const novoUsuario = {

            usuario: usuario,

            email: email,

            senha: senha

        };


        /*
            Adicionamos o novo usuário ao array.
        */

        usuarios.push(novoUsuario);


        /*
            Transformamos o array em texto JSON
            e salvamos no navegador.

            O localStorage só consegue guardar
            informações no formato de texto.
        */

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );


        /*
            Mostra uma mensagem informando que
            o cadastro foi realizado.
        */

        mensagem.innerText = "Cadastro realizado com sucesso!";

        mensagem.style.color = "#72e6a5";


        /*
            Depois de 1 segundo, o usuário é enviado
            para a página de login.
        */

        setTimeout(function() {

            window.location.href = "login.html";

        }, 1000);

    });
}


/*
====================================================
                LOGIN
====================================================
*/


const formLogin = document.getElementById("formLogin");


/*
    Verificamos se estamos na página de login.
*/

if (formLogin) {

    formLogin.addEventListener("submit", function(event) {

        /*
            Impede o formulário de atualizar a página.
        */

        event.preventDefault();


        // Pegando os valores digitados

        const usuario = document.getElementById("usuario").value;

        const senha = document.getElementById("senha").value;


        // Local onde a mensagem será mostrada

        const mensagem = document.getElementById("mensagemLogin");


        /*
            Pegamos os usuários que estão salvos
            no navegador.

            Caso não exista nenhum usuário,
            usamos um array vazio.
        */

        const usuarios = JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];


        /*
            Procuramos um usuário que tenha
            o mesmo nome E a mesma senha.
        */

        const usuarioEncontrado = usuarios.find(function(item) {

            return item.usuario === usuario &&
                   item.senha === senha;

        });


        /*
            Se encontrou o usuário, o login está correto.
        */

        if (usuarioEncontrado) {

            mensagem.innerText =
                "Login realizado com sucesso!";

            mensagem.style.color = "#72e6a5";


            /*
                Guardamos apenas o nome do usuário
                que está conectado.

                Isso permite saber quem está logado
                durante a demonstração.
            */

            localStorage.setItem(
                "usuarioLogado",
                usuarioEncontrado.usuario
            );


            /*
                Depois do login, vai para a tela
                de download do jogo.
            */

            setTimeout(function() {

                window.location.href = "download.html";

            }, 1000);

        } else {

            /*
                Caso o usuário ou senha estejam errados.
            */

            mensagem.innerText =
                "Usuário ou senha incorretos.";

            mensagem.style.color = "#ff5c6c";

        }

    });
}
