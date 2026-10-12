const express = require('express');
const path = require('path');

const app = express();

// Tudo que estiver na pasta "public" fica disponível no site.
app.use(express.static(path.join(__dirname, 'public')));

// Abrir o endereço raiz já leva ao simulador.
app.get('/', (req, res) => res.redirect('/simulador.html'));

// O Render define a porta na variável PORT.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Simulador rodando na porta ' + PORT));
