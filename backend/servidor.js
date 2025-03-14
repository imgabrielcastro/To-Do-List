const express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors()); 


const client = new Client({
  connectionString: process.env.DB_CONNECTION_STRING
});

client.connect()
  .then(() => console.log("Conectado ao banco de dados!"))
  .catch(err => console.error("Erro ao conectar:", err.stack));

app.use(express.json());

app.post('/atividade', (req, res) => {
  const { malhou, leu, trabalhou, bebeu_agua, data_registro } = req.body; 

  if (malhou === undefined || leu === undefined || trabalhou === undefined || bebeu_agua === undefined || !data_registro) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  const query = `
    INSERT INTO habitos_diarios (malhou, leu, trabalhou, bebeu_agua, data_registro)
    VALUES ($1, $2, $3, $4, $5)
  `;

  client.query(query, [malhou, leu, trabalhou, bebeu_agua, data_registro])
    .then(() => {
      res.status(201).json({ message: 'Atividade registrada com sucesso!' });
    })
    .catch(err => {
      console.error('Erro ao inserir dados:', err);
      res.status(500).json({ error: 'Erro ao registrar a atividade no banco de dados' });
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
