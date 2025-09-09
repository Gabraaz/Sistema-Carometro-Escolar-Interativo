const express = require('express');// Importa o módulo Express 

class appcontroler {
    constructor(){
        this.express = express(); // Cria uma instância do Express dentro da classe
        this.middlewares();//Chama o método middlewares para configurar os middlewares
        this.routes();

    }
    middlewares(){
        // Permite a aplicação a aceitar dados no formato JSON nas requisições.
        this.express.use(express.json());
    }   
    // Definindo as Rotas
    routes(){
        const apiRoutes = require('./routes/apiRoutes')
        this.express.use('/carometro',apiRoutes)
            
      }// Final Routes
}
// Disponibiliza a instância do Express já configurada, permitindo seu uso em outros arquivos
module.exports = new appcontroler().express;