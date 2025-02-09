 // Inicialize o Firebase
 const firebaseConfig = {
    // Cole as informações de configuração do seu projeto Firebase aqui
    apiKey: "AIzaSyCx0lNu-Z9Q7KEkLtYOk7v4pLnTTdlS6wM",
    authDomain: "van-ceic.firebaseapp.com",
    projectId: "van-ceic",
    storageBucket: "van-ceic.firebasestorage.app",
    messagingSenderId: "239110003764",
    appId: "1:239110003764:web:5668e5871612b338873e61"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
    console.log("clicouuuu")
    auth.signInWithRedirect(provider);
});

// Captura o resultado do redirecionamento
auth.getRedirectResult()
    .then(result => {
        console.log("Resultado do redirecionamento:", result);
        if (result.user) {
            console.log("Login bem-sucedido via redirecionamento!");
            const user = result.user;

            // Obtém o token do usuário
            return user.getIdToken();
        } 
        throw new Error("Não foi possível autenticar: result.user é falso ou nulo.");
    })
    .then((token) => {
        if (token) {
            // Envia o token para o servidor
            return fetch('http://localhost:8081/api/auth/exchange-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            });
        }

        throw new Error("Não foi possível autenticar: {token is false}");
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Token recebido do servidor:", data);
        localStorage.setItem('token', data.token); // Armazena o token no localStorage
        window.location.href = '/selecaovan/'; // Redireciona para a página desejada
    })
    .catch(error => {
        console.error('Erro ao processar o redirecionamento:', error);
    });

// Observador de estado de autenticação
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("Usuário logado:", user.email);
    } else {
        console.log("Nenhum usuário logado.");
    }
});