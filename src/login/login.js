
function handleToken(token) {

    console.log(token);

    fetch('/api/auth/exchange-token', {
      method: 'POST', // Define o método HTTP como POST
      headers: {
          'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
          // Outros cabeçalhos podem ser adicionados aqui, se necessário
      },
      body: JSON.stringify({ token: token.credential })
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        console.log('Resposta do servidor:', data); // Manipula os dados recebidos
        if (data.token) {
            // Armazena o token e redireciona para a página de seleção de van
            localStorage.setItem('token', data.token);
            window.location.href = '/selecaovan/index.html';
        } else {
            // Exibe uma mensagem de erro se o login falhar
            alert('Erro ao fazer login!');
        }
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error); // Trata erros
    });

  }