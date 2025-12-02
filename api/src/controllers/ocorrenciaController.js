const pool = require('../db/connect');

module.exports = class OcorrenciaController {

    // CREATE - chama a procedure sp_criar_ocorrencia
    static async createOcorrencia(req, res) {
        const { observacao, categoria_ocorrencia, cpf_usuario, id_alunos } = req.body;

        if (!observacao || !categoria_ocorrencia || !cpf_usuario || !id_alunos) {
            return res.status(400).json({ message: "Preencha todos os campos obrigatórios!" });
        }

        const sql = `CALL sp_criar_ocorrencia(?, ?, ?, ?)`;

        pool.query(sql, [observacao, categoria_ocorrencia, cpf_usuario, id_alunos], (err, result) => {
            if (err) {
                console.error("Erro ao criar ocorrência:", err);
                return res.status(500).json({ message: "Erro no servidor ao criar ocorrência." });
            }
            res.status(201).json({ message: "Ocorrência criada com sucesso!" });
        });
    }

    // READ - chama a procedure sp_listar_ocorrencias
    static async readOcorrencias(req, res) {
        const sql = `CALL sp_listar_ocorrencias()`;

        pool.query(sql, (err, results) => {
            if (err) {
                console.error("Erro ao buscar ocorrências:", err);
                return res.status(500).json({ message: "Erro ao listar ocorrências." });
            }

            // o MySQL retorna [ [dados], [info meta] ]
            const ocorrencias = results[0];
            res.status(200).json(ocorrencias);
        });
    }

    // UPDATE - chama a procedure sp_atualizar_ocorrencia
    static async updateOcorrencia(req, res) {
        const { id_ocorrencia } = req.params;
        const { observacao, categoria_ocorrencia } = req.body;

        if (!observacao || !categoria_ocorrencia) {
            return res.status(400).json({ message: "Preencha os campos obrigatórios!" });
        }

        const sql = `CALL sp_atualizar_ocorrencia(?, ?, ?)`;

        pool.query(sql, [id_ocorrencia, observacao, categoria_ocorrencia], (err, result) => {
            if (err) {
                console.error("Erro ao atualizar ocorrência:", err);
                return res.status(500).json({ message: "Erro no servidor ao atualizar ocorrência." });
            }

            res.status(200).json({ message: "Ocorrência atualizada com sucesso!" });
        });
    }

    // DELETE - chama a procedure sp_excluir_ocorrencia
    static async deleteOcorrencia(req, res) {
        const { id_ocorrencia } = req.params;

        const sql = `CALL sp_excluir_ocorrencia(?)`;

        pool.query(sql, [id_ocorrencia], (err, result) => {
            if (err) {
                console.error("Erro ao excluir ocorrência:", err);
                return res.status(500).json({ message: "Erro no servidor ao excluir ocorrência." });
            }

            res.status(200).json({ message: "Ocorrência excluída com sucesso!" });
        });
    }
};
