    -- ==========================================================
    -- BANCO DE DADOS: CIE_CAROMETRO
    -- Sprint 3 - Implementação completa com CRUD via Procedures
    -- ==========================================================

    DROP DATABASE IF EXISTS cie_carometro;
    CREATE DATABASE cie_carometro;
    USE cie_carometro;

    -- ==========================================================
    -- TABELA: TURMA
    -- ==========================================================
    CREATE TABLE turma (
        id_turma INT PRIMARY KEY AUTO_INCREMENT,
        curso VARCHAR(30) NOT NULL,
        ano CHAR(4) NOT NULL
    );

    -- ==========================================================
    -- TABELA: ALUNOS
    -- ==========================================================
    CREATE TABLE alunos (
        id_alunos INT PRIMARY KEY AUTO_INCREMENT,
        nome_alunos VARCHAR(100) NOT NULL,
        data_nascimento DATE NOT NULL,
        email_alunos VARCHAR(100) NOT NULL,
        genero_alunos VARCHAR(10) NOT NULL,
        id_turma INT NOT NULL,
        FOREIGN KEY (id_turma) REFERENCES turma(id_turma)
    );

    -- ==========================================================
    -- TABELA: USUARIO
    -- ==========================================================
    CREATE TABLE usuario (
        cpf_usuario CHAR(11) NOT NULL PRIMARY KEY,
        nome_usuario VARCHAR(100) NOT NULL,
        senha_usuario CHAR(255) NOT NULL
    );

    -- ==========================================================
    -- TABELA: OCORRÊNCIA
    -- ==========================================================
    CREATE TABLE ocorrencia (
        id_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
        observacao VARCHAR(255) NOT NULL,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        categoria_ocorrencia VARCHAR(50) NOT NULL,
        cpf_usuario CHAR(11) NOT NULL,
        id_alunos INT NOT NULL,
        FOREIGN KEY (cpf_usuario) REFERENCES usuario(cpf_usuario),
        FOREIGN KEY (id_alunos) REFERENCES alunos(id_alunos)
    );

    -- ==========================================================
    -- POPULAÇÃO INICIAL DE DADOS
    -- ==========================================================

    INSERT INTO turma (curso, ano) VALUES
    ('DESENVOLVIMENTO DE SISTEMAS', '2025');

    INSERT INTO alunos (nome_alunos, data_nascimento, email_alunos, genero_alunos, id_turma) VALUES
    ('Aluanan Angel de Sousa', '2008-01-15', 'aluanan.sousa@aluno.senai.br', 'masculino', 1),
    ('Ana Carolina de Oliveira Monteiro', '2008-03-22', 'ana.monteiro@aluno.senai.br', 'feminino', 1),
    ('Anna Vitória Martins Ramos', '2009-06-11', 'anna.ramos@aluno.senai.br', 'feminino', 1),
    ('Arthur Cintra de Lacerda', '2008-09-05', 'arthur.lacerda@aluno.senai.br', 'masculino', 1),
    ('Arthur Cintra Faleiros', '2009-11-18', 'arthur.faleiros@aluno.senai.br', 'masculino', 1),
    ('Arthur Marques Santos', '2008-05-28', 'arthur.santos@aluno.senai.br', 'masculino', 1),
    ('Bryan Miguel Moreira', '2009-01-10', 'bryan.moreira@aluno.senai.br', 'masculino', 1),
    ('Davi Azevedo Gonçalves', '2009-04-17', 'davi.goncalves@aluno.senai.br', 'masculino', 1),
    ('Eduardo Augusto Tognati', '2008-12-03', 'eduardo.tognati@aluno.senai.br', 'masculino', 1),
    ('Flávio Henrique de Souza Filho', '2008-07-14', 'flavio.souza@aluno.senai.br', 'masculino', 1),
    ('Gabriel Braz Menezes', '2009-08-12', 'gabriel.menezes@aluno.senai.br', 'masculino', 1),
    ('Gabriel Rossi Ventura', '2009-10-29', 'gabriel.ventura@aluno.senai.br', 'masculino', 1),
    ('Guilherme Bason Garcia Neves', '2009-02-26', 'guilherme.neves@aluno.senai.br', 'masculino', 1),
    ('João Victor Oliveira Silva', '2008-04-06', 'joao.silva@aluno.senai.br', 'masculino', 1),
    ('José Victor Faccirolli', '2009-07-23', 'jose.faccirolli@aluno.senai.br', 'masculino', 1),
    ('Kauan Borges Plaza', '2008-11-09', 'kauan.plaza@aluno.senai.br', 'masculino', 1),
    ('Kauan Henrique Melo Silva', '2009-03-12', 'kauan.silva@aluno.senai.br', 'masculino', 1),
    ('Keliyah Cristine de Oliveira Martins', '2008-08-19', 'keliyah.martins@aluno.senai.br', 'feminino', 1),
    ('Leonardo Alves da Silva', '2009-05-03', 'leonardo.silva@aluno.senai.br', 'masculino', 1),
    ('Luís Pedro França Paulino', '2008-06-27', 'luis.paulino@aluno.senai.br', 'masculino', 1),
    ('Luiz Felipe Campos Margato', '2009-12-15', 'luiz.margato@aluno.senai.br', 'masculino', 1),
    ('Maria Vitória Sampaio Souza', '2008-02-08', 'maria.souza@aluno.senai.br', 'feminino', 1),
    ('Pedro Galindo Tavares', '2009-08-04', 'pedro.tavares@aluno.senai.br', 'masculino', 1),
    ('Rafael Caíres dos Santos', '2008-10-20', 'rafael.santos@aluno.senai.br', 'masculino', 1),
    ('Rafael Mendes Neves', '2009-09-01', 'rafael.neves@aluno.senai.br', 'masculino', 1),
    ('Renan Vieira Mobrise', '2008-03-29', 'renan.mobrise@aluno.senai.br', 'masculino', 1),
    ('Sofia Siqueira Belchior', '2009-06-08', 'sofia.belchior@aluno.senai.br', 'feminino', 1),
    ('Sophia de Oliveira Ferreira', '2008-01-27', 'sophia.ferreira@aluno.senai.br', 'feminino', 1),
    ('Ulisses Santini Gomes', '2009-11-30', 'ulisses.gomes@aluno.senai.br', 'masculino', 1),
    ('Vinicius Soares Peroni', '2008-05-17', 'vinicius.peroni@aluno.senai.br', 'masculino', 1);

    -- ==========================================================
    -- PROCEDURES E FUNCTION PARA OCORRÊNCIAS (SPRINT 3)
    -- ==========================================================

    DELIMITER //

    -- CREATE
    CREATE PROCEDURE sp_criar_ocorrencia (
        IN p_observacao VARCHAR(255),
        IN p_categoria VARCHAR(50),
        IN p_cpf_usuario CHAR(11),
        IN p_id_alunos INT
    )
    BEGIN
        INSERT INTO ocorrencia (observacao, categoria_ocorrencia, cpf_usuario, id_alunos)
        VALUES (p_observacao, p_categoria, p_cpf_usuario, p_id_alunos);
    END //

    -- READ (única)
    CREATE FUNCTION fn_buscar_ocorrencia(p_id INT)
    RETURNS VARCHAR(500)
    DETERMINISTIC
    BEGIN
        DECLARE v_resultado VARCHAR(500);

        SELECT CONCAT(
            'Ocorrência #', id_ocorrencia, ' - ',
            categoria_ocorrencia, ' | ',
            'Aluno ID: ', id_alunos, ' | ',
            'Usuário: ', cpf_usuario, ' | ',
            'Obs: ', observacao
        )
        INTO v_resultado
        FROM ocorrencia
        WHERE id_ocorrencia = p_id;

        RETURN v_resultado;
    END //

    -- READ (todas)
    CREATE PROCEDURE sp_listar_ocorrencias()
    BEGIN
        SELECT 
            o.id_ocorrencia,
            o.observacao,
            o.data,
            o.categoria_ocorrencia,
            u.nome_usuario AS registrado_por,
            a.nome_alunos AS aluno_envoldido
        FROM ocorrencia o
        INNER JOIN usuario u ON o.cpf_usuario = u.cpf_usuario
        INNER JOIN alunos a ON o.id_alunos = a.id_alunos
        ORDER BY o.data DESC;
    END //

    -- UPDATE
    CREATE PROCEDURE sp_atualizar_ocorrencia (
        IN p_id INT,
        IN p_nova_observacao VARCHAR(255),
        IN p_nova_categoria VARCHAR(50)
    )
    BEGIN
        UPDATE ocorrencia
        SET observacao = p_nova_observacao,
            categoria_ocorrencia = p_nova_categoria
        WHERE id_ocorrencia = p_id;
    END //

    -- DELETE
    CREATE PROCEDURE sp_excluir_ocorrencia (IN p_id INT)
    BEGIN
        DELETE FROM ocorrencia
        WHERE id_ocorrencia = p_id;
    END //
    DELIMITER ;
