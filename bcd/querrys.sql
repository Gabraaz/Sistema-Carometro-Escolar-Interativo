insert into usuario (nome_usuario, data_nascimento, email_usuario, genero_usuario, cpf_usuario, senha_usuario)
values ('Euller da Silva Ferreira', '1998-09-21', 'euller.ferreira@gmail.com', 'masculino', '12345678901', 'senha123');

insert into usuario (nome_usuario, data_nascimento, email_usuario, genero_usuario, cpf_usuario, senha_usuario)
values ('Adriano Donisete Cassiano', '1989-07-09', 'adriano.donisete@gmail.com', 'masculino', '98765432100', 'senha123');

update usuario
set email_usuario = 'euller.ferreira@gmail.com',
    senha_usuario = 'novaSenha123'
where cpf_usuario = '12345678901';

update usuario
set email_usuario = 'adriano.donisete@gmail.com',
    senha_usuario = 'senhaNova123'
where cpf_usuario = '98765432100';

delete from usuario
where cpf_usuario = '12345678901';


insert into alunos (nome_alunos, data_nascimento, email_alunos, genero_alunos, id_turma)
values ('Felipe Andrade Souza', '2009-03-10', 'felipe.souza@aluno.senai.br', 'masculino', 1);

update alunos
set email_alunos = 'felipe.andrade@aluno.senai.br'
where id_alunos = 31;

delete from alunos
where id_alunos = 31;


insert into ocorrencia (observacao, categoria_ocorrencia, cpf_usuario, id_alunos)
VALUES ('Aluno foi flagrado mexendo no celular durante a aula do professor Adriano Donisete Cassiano.','Advertência escrita','98765432100',1);


delete from ocorrencia
where id_ocorrencia = 1;

CREATE OR REPLACE VIEW vw_carometro_completo AS
SELECT 
    a.id_alunos,
    a.nome_alunos,
    a.data_nascimento,
    a.email_alunos,
    a.genero_alunos,

    t.id_turma,
    t.curso,
    t.ano,

    o.id_ocorrencia,
    o.observacao,
    o.data AS data_ocorrencia,
    o.categoria_ocorrencia,

    u.cpf_usuario,
    u.nome_usuario AS usuario_registrou
FROM alunos a
INNER JOIN turma t 
    ON a.id_turma = t.id_turma
LEFT JOIN ocorrencia o 
    ON a.id_alunos = o.id_alunos
LEFT JOIN usuario u
    ON o.cpf_usuario = u.cpf_usuario
ORDER BY a.nome_alunos, o.data DESC;
