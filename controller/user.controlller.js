const Sequelize = require('sequelize');
const {User} = require('../models/index');



module.exports = {
    async list(_, res){
        let users = await User.findAll();
        res.json(users);
    }
}