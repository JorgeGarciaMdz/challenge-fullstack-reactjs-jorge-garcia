const express = require('express');
const router = express.Router();

const operationService = require('../service/operation.service');

router.get('/', async (req, res) => {
    res.json(await operationService.findAll());
});

router.get('/:id', async (req, res) => {
    res.json(await operationService.findById(req.params.id));
})

router.post('/', async (req, res) => {
    operation = {
        concept: req.body.concept,
        amount: req.body.amount,
        typeOperation: req.body.typeOperation.toUpperCase(),
        user_id: req.body.user_id
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
        amount: req.body.amount
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