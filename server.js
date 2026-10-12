const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Arquivos da pasta "public" ficam disponíveis no site.
app.use(express.static(path.join(__dirname, 'public')));

// Procura o simulador em vários lugares, para não depender da pasta.
const LUGARES = [
  'public/simulador.html',
  'public/Windows11_Simulator.html',
  'simulador.html',
  'Windows11_Simulator.html'
];
function acharSimulador() {
  for (const l of LUGARES) {
    const p = path.join(__dirname, l);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

app.get(['/', '/simulador.html'], (req, res) => {
  const f = acharSimulador();
  if (f) return res.sendFile(f);
  // Se não achar, mostra o que existe no repositório para ajudar a corrigir.
  const ls = d => { try { return fs.readdirSync(d).join(', '); } catch (e) { return '(não existe)'; } };
  res.status(404).type('text').send(
    'Não encontrei o simulador.\n' +
    'Procurei em: ' + LUGARES.join(' | ') + '\n\n' +
    'Arquivos na raiz: ' + ls(__dirname) + '\n' +
    'Arquivos em public: ' + ls(path.join(__dirname, 'public'))
  );
});

// O Render define a porta na variável PORT.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Simulador rodando na porta ' + PORT));
