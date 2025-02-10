
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
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error); // Trata erros
    });

  }