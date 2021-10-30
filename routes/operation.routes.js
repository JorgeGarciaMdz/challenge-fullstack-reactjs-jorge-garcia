const express = require('express');
const router = express.Router();

const operationService = require('../service/operation.service');

router.get('/status/', async (req, res) => {
    console.log('get status');
    let status = {
        in: await operationService.sum('amount', 'INGRESO'),
        out: await operationService.sum('amount', 'EGRESO')
    };
    res.json(status);
});

router.get('/', async (req, res) => {
    order = 'DESC';
    limit = 10;
    offset = 0;
    if( req.query.order && req.query.order.toUpperCase() === 'ASC')
        order = req.query.order.toUpperCase()

    if( req.query.limit && parseInt(req.query.limit) > 0 )
        limit = parseInt(req.query.limit);
    
    if( req.query.offset && parseInt(req.query.offset) > 0 )
        offset = parseInt(req.query.offset) * limit;

    res.json(await operationService.findAll( order, limit, offset ));
});

router.get('/:id', async (req, res) => {
    res.json(await operationService.findById(req.params.id));
});

router.post('/', async (req, res) => {
    operation = {
        concept: req.body.concept,
        amount: req.body.amount,
        typeOperation: req.body.typeOperation.toUpperCase(),
        user_id: req.body.user_id,
        date: req.body.date
    }
    let new_operation = await operationService.create(operation);
    if (new_operation instanceof Array) {
        res.status(404);
        res.json(new_operation);
    } else
        res.json(new_operation);
});

router.put('/', async (req, res) => {
    operation = {
        id: req.body.id,
        concept: req.body.concept,
        amount: req.body.amount,
        user_id: req.body.user_id,
        date: req.body.date
    }
    let up_operation = await operationService.update(operation);
    if (up_operation instanceof Array) {
        res.status(404);
        res.json(up_operation);
    } else {
        res.json(up_operation);
    }
});

router.delete('/:id', (req, res) => {
    operationService.delete(req.params.id);
    res.status(202);
    res.send();
});

module.exports = router;