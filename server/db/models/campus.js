'use strict';
const db = require ('../index');
const Sequelize = require ('sequelize');

module.exports = db.define ('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true
            }
        }
    },

    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: '/img/building.gif'
    },

    description: {
        type: Sequelize.TEXT,
    }
});