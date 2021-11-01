const User = require('../models/index').User;

module.exports = {
    async findAll() {
        return await User.findAll({
            where: {
                deletedAt: null
            },
            attributes: ['id', 'name', 'lastname', 'dni', 'birthday', 'email']
        });
    },

    async findById(id) {
        return await User.findAll({
            where: {
                id: id,
                deletedAt: null
            },
            attributes: ['id', 'name', 'lastname', 'dni', 'birthday', 'email', 'password']
        });
    },

    async create(user) {
        try {
            return await User.create(user);
        } catch (err) {
            console.error("ocurred an error: " + err);
            let errors = [];
            err.errors.forEach(e => {
                errors.push({ attribute: e.path, message: e.message.split('.')[1] });
            });
            return errors;
        }
    },

    async update(user) {
        try {
            await User.update(user,
                {
                    where: {
                        id: user.id,
                        deletedAt: null
                    }
                });
            return user;
        } catch (err) {
            console.error("ocurred an error: " + err);
            let errors = [];
            err.errors.forEach(e => {
                errors.push({ attribute: e.path, message: e.message });
            });
            return errors;
        }
    },

    async delete(id){
        return await User.update(
            {deletedAt: new Date()},
            {
                where: {
                    id: id
                }
            }
        )
    }
}