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

// Você precisará adicionar um observador para lidar com o retorno do redirecionamento
auth.onAuthStateChanged((user) => {
    if (user) {
        // O usuário está logado, você pode obter o token e enviar para o seu servidor
        user.getIdToken().then(token => {
            fetch('http://localhost:8081/api/auth/exchange-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(JSON.stringify(data));
                    localStorage.setItem('token', data.token);
                    window.location.href = '/selecaovan/';
                })
                .catch(error => {
                    console.error('Erro ao trocar token:', error);
                });
        }).catch(error => {
            console.error('Erro ao obter token:', error);
        });
    } else {
        // O usuário não está logado
        console.error('Não foi possível fazer a autenticação!');
    }
});