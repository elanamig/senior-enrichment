'use strict';
const db = require ('../index');
const Sequelize = require ('sequelize');

const Student = db.define ('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true
            }
        }
    },

    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true
            }
        }
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true
            },
            isEmail: true
        }
    },
    gpa: {
        type: Sequelize.DOUBLE,
        validate: {
            min: 0,
            max: 4
        }
    },
    name: {
        type: Sequelize.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        }
    }

});



module.exports = Student;