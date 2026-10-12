const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir ler dados JSON enviados via POST (útil para o e-mail)
app.use(express.json());

// Servir os ficheiros estáticos da pasta atual (HTML, scripts, etc.)
app.use(express.static(__dirname));

// Rota principal que abre o teu simulador automaticamente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Windows11_Simulator-6.html'));
});

// Exemplo de uma rota de API para receber o e-mail caso queiras processá-lo no servidor
app.post('/api/salvar-email', (req, res) => {
    const { email } = req.body;
    console.log('E-mail recebido no servidor:', email);
    
    // Aqui podias guardar numa base de dados ou enviar um e-mail de teste
    res.json({ sucesso: true, mensagem: 'E-mail guardado com sucesso no servidor!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});
