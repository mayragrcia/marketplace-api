const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) =>{

        if(error){
            return res.status(500).send({error: error});
        }

        conn.query(
            'SELECT * FROM pedidos;',
            (error, resultado, field) => {
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(200).send({
                    response: resultado
                });
            }
        )
    })
});

//INSERE UM PEDIDO
router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto, 
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem: 'O pedido foi criado',
        pedidoCriado: pedido
    });
});

//RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido; 
    res.status(200).send({
        mensagem: "Detalhes do Pedido",
        id: id
    });
}); 

// //ALTERA UM PEDIDO
// router.patch('/', (req, res, next) => {
//     res.status(201).send({
//         mensagem: 'usando o patch dentro da rota de PEDIDOS'
//     });
// });

//EXCLUI UM PEDIDO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido excluido'
    });
});

module.exports = router; 