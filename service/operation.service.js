const Operation = require('../models/index').Operation;
const _typeOperation = ['EGRESO', 'INGRESO'];

module.exports = {
    async create(operation) {
        if (operation.typeOperation === _typeOperation[0] ||
            operation.typeOperation === _typeOperation[1]) {
            try {
                return await Operation.create(operation);
            } catch (err) {
                console.error("ocurred an error: " + JSON.stringify(err));
                let errors = [];
                if (err.name === "SequelizeForeignKeyConstraintError") {
                    errors.push({
                        attribute: 'user_id',
                        message: err.parent.sqlMessage.split('(')[0].split(':')[1]
                    });
                }
                if (err.errors) {
                    err.errors.forEach(e => {
                        errors.push({ attribute: e.path, message: e.message });
                    });
                }
                return errors;
            }
        } else {
            return {
                attribute: 'typeOperation',
                message: "must by in 'EGRESO' or 'INGRESO'"
            };
        }
    },
    async update(operation) {
        try {
            await Operation.update(operation,
                {
                    where: {
                        id: operation.id,
                        deletedAt: null
                    }
                });
            return operation;
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
        return await Operation.update(
            {deletedAt: new Date()},
            {
                where: {
                    id: id
                }
            }
        )
    },

    async findAll( order='ASC', limit=10, offset = 0){
        return await Operation.findAll({
            where: {
                deletedAt: null
            },
            order: [['createdAt', order]],
            limit: limit,
            offset: offset,
            attributes: ['id', 'concept', 'amount', 'typeOperation']
        });
    },

    async findById(id) {
        return await Operation.findAll({
            where: {
                id: id,
                deletedAt: null
            },
            attributes: ['id', 'concept', 'amount', 'typeOperation', 'createdAt']
        });
    }
}