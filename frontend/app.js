// Define o endereço da API
const apiUrl = "http://localhost:5000/cie_carometro";

// Pega o formulário de login da tela
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        // Não deixa a página recarregar sozinha
        e.preventDefault();
        
        const mensagem = document.getElementById("mensagemLogin");
        // Pega o que foi digitado nos campos
        const dados = Object.fromEntries(new FormData(loginForm));

        mensagem.textContent = "Verificando credenciais...";
        mensagem.style.color = "orange";

        try {
            // Manda o CPF e Senha para o servidor conferir
            const resposta = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            });

            const resultado = await resposta.json();

            // Se o login deu certo
            if (resposta.ok) {
                mensagem.textContent = "Sucesso! Entrando...";
                mensagem.style.color = "green";

                // Salva os dados do usuário no navegador
                if (resultado.user) {
                    localStorage.setItem("usuarioLogado", JSON.stringify(resultado.user));
                }

                // Espera 1 segundo e muda para a tela principal
                setTimeout(() => {
                    window.location.href = "carometro.html";
                }, 1000);

            } else {
                // Se a senha estiver errada
                mensagem.textContent = resultado.error || "Acesso negado.";
                mensagem.style.color = "red";
            }
        } catch (error) {
            // Se o servidor estiver desligado
            console.error(error);
            mensagem.textContent = "Erro de conexão com o servidor.";
            mensagem.style.color = "red";
        }
    });
}

// Pega o formulário de cadastro da tela
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        // Não deixa a página recarregar
        e.preventDefault();
        const msg = document.getElementById("mensagem");
        // Pega os dados digitados
        const dados = Object.fromEntries(new FormData(registerForm));

        try {
            // Envia os dados para criar o usuário no banco
            const resposta = await fetch(`${apiUrl}/usuario`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            });
            
            const resultado = await resposta.json();

            // Se cadastrou com sucesso
            if (resposta.ok) {
                msg.textContent = "Usuário cadastrado!";
                msg.style.color = "green";
                registerForm.reset();
                // Manda para a tela de login
                setTimeout(() => { window.location.href = "login.html"; }, 1500);
            } else {
                // Mostra o erro na tela
                msg.textContent = resultado.error;
                msg.style.color = "red";
            }
        } catch (erro) {
            // Erro de conexão
            msg.textContent = "Erro no servidor.";
        }
    });
}