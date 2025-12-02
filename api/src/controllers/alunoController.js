const pool = require('../db/connect');

module.exports = class AlunoController {

    static async createAluno(req, res) {
        const { nome_alunos, data_nascimento, email_alunos, genero_alunos, id_turma } = req.body;

        if (!nome_alunos || !data_nascimento || !email_alunos || !genero_alunos || !id_turma) {
            return res.status(400).json({ message: "Preencha todos os campos obrigatórios!" });
        }

        const sql = `INSERT INTO alunos 
            (nome_alunos, data_nascimento, email_alunos, genero_alunos, id_turma)
            VALUES (?, ?, ?, ?, ?)`;

        pool.query(sql, [nome_alunos, data_nascimento, email_alunos, genero_alunos, id_turma], (err, result) => {
            if (err) {
                console.error("Erro ao inserir aluno:", err);
                return res.status(500).json({ message: "Erro no servidor ao criar aluno." });
            }
            res.status(201).json({ message: "Aluno criado com sucesso!", id: result.insertId });
        });
    } //fim do creat Aluno

    static async loginUser(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
          return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }
    
        const query = `SELECT * FROM usuario WHERE email = ?`;
    
        try {
          connect.query(query, [email], async (err, results) => {
            if (err) {
              console.error("Erro ao executar a consulta", err);
              return res.status(500).json({ error: "Erro interno do servidor" });
            }
            if (results.length === 0) {
              return res.status(401).json({ error: "Usuário não cadastrado" });
            }
            const user = results[0];
    
            // Compara a senha informada no Login com o hash do banco
            const senhaCorreta = await bcrypt.compare(senha, user.senha);
    
            if (!senhaCorreta) {
              return res.status(401).json({ error: "Senha incorreta" });
            }
    
            return res.status(200).json({ message: "Login bem-sucedido", user });
          });
        } catch (error) {
          console.error("Erro ao executar consulta", error);
          return res.status(500).json({ error: " Erro interno do servidor " });
        }
      } // FIm login User   


    static async readAlunos(req, res) {
        const sql = `
            SELECT a.*, t.curso, t.ano 
            FROM alunos a
            INNER JOIN turma t ON a.id_turma = t.id_turma`;

        pool.query(sql, (err, results) => {
            if (err) {
                console.error("Erro ao buscar alunos:", err);
                return res.status(500).json({ message: "Erro ao listar alunos." });
            }
            res.status(200).json(results);
        });
    }

    static async updateAluno(req, res) {
        const { id_alunos } = req.params;
        const { nome_alunos, data_nascimento, email_alunos, genero_alunos, id_turma } = req.body;

        const sql = `UPDATE alunos SET nome_alunos=?, data_nascimento=?, email_alunos=?, 
                         genero_alunos=?, id_turma=? WHERE id_alunos=?`;

        pool.query(sql, [nome_alunos, data_nascimento, email_alunos, genero_alunos, id_turma, id_alunos], (err, result) => {
            if (err) {
                console.error("Erro ao atualizar aluno:", err);
                return res.status(500).json({ message: "Erro ao atualizar aluno." });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Aluno com este ID não encontrado." });
            }
            res.status(200).json({ message: "Aluno atualizado com sucesso!" });
        });
    }

    static async deleteAluno(req, res) {
        const { id_alunos } = req.params;
        const sql = "DELETE FROM alunos WHERE id_alunos=?";

        pool.query(sql, [id_alunos], (err, result) => {
            if (err) {
                console.error("Erro ao deletar aluno:", err);
                return res.status(500).json({ message: "Erro ao deletar aluno." });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Aluno com este ID não encontrado." });
            }
            res.status(200).json({ message: "Aluno deletado com sucesso!" });
        });
    }
};