const express = require('express');
const router = express.Router();

const operationService = require('../service/operation.service');

router.get('/', (req, res) => {
    res.send("find all")
});

router.get('/:id', (req, res ) => {
    res.send("params id: " + req.params.id);
})

router.post('/', (req, res) => {
    res.send("post " + JSON.stringify(req.body));
});

router.put('/', (req, res) => {
    res.send("put " + req.body);
});

router.delete('/:id', (req, res) => {
    res.send("delete id: " + req.params.id);
});

module.exports = router;