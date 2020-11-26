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

    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)',
            [req.body.id_produto, req.body.quantidade], 
            (error, resultado, field) => {
                conn.release();
    
                if(error){
                    res.status(500).send({
                        error: error, 
                    });
                }
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso'
                });
            }
        )
    })
});

//RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({error: error});
        }

        conn.query(
            'SELECT * FROM pedidos WHERE id_pedido = ?;',
            (req.params.id_pedido),
            (error, resultado, field) => {
                conn.release(); 
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(201).send({
                    response: resultado
                });
            }
        )
    })
}); 


//CANCELAR UM PEDIDO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            'DELETE FROM pedidos WHERE id_pedido = ?',
            [req.body.id_pedido],
            (error, resultado, field) => {
                conn.release();
                if(error){ return res.status(500).send({error: error})}

                res.status(202).send({
                    mensagem: 'Pedido cancelado com sucesso'
                })
            }
        )
    })
});

module.exports = router; 