const connect = require("../db/connect");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10; // Número de rounds para gerar o hash

module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, nome, senha,} = req.body;

    console.log("Valores recebidos: ", req.body);

    // Validação de campos obrigatórios
    if (!cpf || !nome || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Validações específicas
    if (isNaN(cpf) || cpf.length !== 11) {
      return res
        .status(400)
        .json({ error: "CPF inválido. Deve conter 11 dígitos numéricos" });
    }

    // Criptografar a senha antes de salvar
      const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    // Query de inserção
    const query = `
    INSERT INTO usuario (cpf_usuario, nome_usuario, senha_usuario)
    VALUES (?, ?, ?)
  `;
    const values = [cpf, nome, hashedPassword];

    try {
      connect.query(query, values, (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") { 
            return res
              .status(400)
              .json({ error: "CPF ou email já cadastrado" });
          }
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        return res.status(201).json({ message: "Usuário criado com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async readUsers(req, res) {
    const query = `SELECT * FROM usuario`;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res
          .status(200)
          .json({ message: "Obtendo todos os usuários", users: results });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }// fim readUser

  static async updateUser(req, res) {
    const cpf = req.params.cpf;
    const { nome, email, senha, telefone, data_nascimento } = req.body;

    if (!cpf || !nome || !senha ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Criptografar a senha antes de salvar
      const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    const query = `
    UPDATE usuario 
    SET nome = ?, email = ?, senha = ?, telefone = ?, data_nascimento = ?
    WHERE cpf = ?
  `;
    const values = [cpf, nome, hashedPassword];

    try {
      connect.query(query, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res
          .status(200)
          .json({ message: `Usuário com CPF ${cpf} atualizado com sucesso` });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  } // fim uptade User

  static async deleteUser(req, res) {
    const cpf = req.params.cpf;

    const query = `DELETE FROM usuario WHERE cpf = ?`;
    const values = [cpf];

    try {
      connect.query(query, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res
          .status(200)
          .json({ message: `Usuário com CPF ${cpf} excluído com sucesso` });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  } // Fim do delete User

  static async loginUser(req, res) {
    const { cpf, senha } = req.body;
  
    if (!cpf || !senha) {
      return res.status(400).json({ error: "CPF e senha são obrigatórios" });
    }
  
    const query = `SELECT * FROM usuario WHERE cpf_usuario = ?`;
  
    try {
      connect.query(query, [cpf], async (err, results) => {
        if (err) {
          console.error("Erro ao executar a consulta", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: "Usuário não cadastrado" });
        }
  
        const user = results[0];
  
        // Comparar senha informada com o hash do banco
        const senhaCorreta = await bcrypt.compare(senha, user.senha_usuario);
  
        if (!senhaCorreta) {
          return res.status(401).json({ error: "Senha incorreta" });
        }
  
        return res.status(200).json({ 
          message: "Login bem-sucedido",
          user 
        });
      });
    } catch (error) {
      console.error("Erro ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }// FIm login user

  static async registrarCompra(req, res) {
    const { cpf, id_ingresso, quantidade } = req.body;

    // Validação básica dos campos
    if (!cpf || !id_ingresso || !quantidade) {
      return res.status(400).json({ error: "CPF, ID do ingresso e quantidade são obrigatórios" });
    }

    // Chama a procedure criada no banco: registrar_compra(p_cpf, p_id_ingresso, p_quantidade)
    const query = `CALL registrar_compra(?, ?, ?)`;
    const values = [cpf, id_ingresso, quantidade];

    try {
      connect.query(query, values, (err, results) => {
        if (err) {
          console.error("Erro ao executar a procedure:", err);
          return res.status(500).json({ error: "Erro ao registrar compra no banco de dados" });
        }

        // Como a procedure faz INSERT/UPDATE, retornamos uma mensagem de sucesso
        return res.status(201).json({ message: "Compra registrada com sucesso via Procedure!" });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  } // Fim da registrar Compra


};