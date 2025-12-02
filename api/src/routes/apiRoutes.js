const router = require('express').Router();
const AlunoController = require('../controllers/alunoController');
const userController = require("../controllers/userController");
const OcorrenciaController = require('../controllers/ocorrenciaController');

// ALUNOS
router.get("/aluno", AlunoController.readAlunos);
router.post("/aluno", AlunoController.createAluno);
router.put("/aluno/:id_alunos", AlunoController.updateAluno);
router.delete("/aluno/:id_alunos", AlunoController.deleteAluno);

// USUÁRIOS
router.get("/usuario", userController.readUsers);
router.post("/usuario", userController.createUser);
router.put("/usuario/:cpf", userController.updateUser);       // corrigido
router.delete("/usuario/:cpf", userController.deleteUser);    // corrigido

// LOGIN
router.post("/login", userController.loginUser);

// OCORRÊNCIAS
router.get("/ocorrencia", OcorrenciaController.readOcorrencias);
router.post("/ocorrencia", OcorrenciaController.createOcorrencia);
router.put("/ocorrencia/:id_ocorrencia", OcorrenciaController.updateOcorrencia);
router.delete("/ocorrencia/:id_ocorrencia", OcorrenciaController.deleteOcorrencia);

module.exports = router;
