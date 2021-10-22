const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');

router.get('/:id', async (req, res) => {
    res.json(await userService.findById(req.params.id));
});

router.get('/', async (req, res) => {
    res.json(await userService.findAll());
});

router.post('/', async (req, res) => {
    let user = {
        name: req.body.name,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        dni: req.body.dni,
        email: req.body.email,
        password: req.body.password,
    }
    let new_user = await userService.create(user);
    if (new_user instanceof Array) {
        res.status(404);
        res.json(new_user);
    } else
        res.json(new_user);
});

router.put('/', async (req, res) => {
    let user = {
        id: req.body.id,
        name: req.body.name,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        dni: req.body.dni,
        email: req.body.email,
        password: req.body.password,
    }
    let new_user = await userService.update(user);
    if (new_user instanceof Array) {
        res.status(404);
        res.json(new_user);
    } else {
        res.json(new_user);
    }
});

router.delete('/:id', (req, res) => {
    userService.delete(req.params.id);
    res.status(202);
    res.send();
});


module.exports = router;