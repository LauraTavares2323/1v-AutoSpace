// padrão
const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const app = express();

app.use(cors());
app.use(express.json());

const port = 2000;

// rota de login do usuário
// TA FUNCIONANDO
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json(
                {
                    success: false,
                    message: 'Erro no servidor.'
                });
        }

        if (results.length > 0) {
            res.json({
                success: true,
                message: 'Login bem-sucedido!'
            });
        } else {
            res.json({
                success: false,
                message: 'Usuário ou senha incorretos!'
            });
        }
    });
});


// rota de cadastro de usuároio
// NÃO FUNCIONA (AINDA)
app.post('/cadastro', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, password], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Não foi possível realizar seu cadastro'
        });
      }
      res.json({
        success: true,  
        message: 'Você foi cadastrado'
      });
    });
  });
  
// rota para cadastrar o seu carro
// MNão consegui nem cadastrar o usuario ainda :(

// rota para apagar o seu carro
// QUASE CERTEZA QUE FUNCIONA
app.delete('/apagar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM car WHERE id = ?';
    connection.query(query, [id], (err) => {
      if (err) {
        return res.status(500).json({
             success: false, 
             message: 'Erro ao deletar carro.' });
      }
      res.json({ 
        success: true, 
        message: 'Carro deletado com sucesso!' });
    });
  });

// rota para editar o seu carro
// QUASE CERTEZA QUE FUNCIONA
app.put('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { brand, color, placa } = req.body;
    const query = 'UPDATE car SET brand = ?, color = ?, placa = ? WHERE id = ?';
    connection.query(query, [brand, color, placa], (err) => {
      if (err) {
        return res.status(500).json({ 
            success: false, 
            message: 'Erro ao atualizar produto.' });
      }
      res.json({ 
        success: true, 
        message: 'Produto atualizado com sucesso!' });
    });
  });

// rota para listar os carros
// NÃO FIZ AINDA

// para ver qual porta roda
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));