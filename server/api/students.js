'use strict'
const router = require('express').Router();
const {Student, Campus} = require ('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
    Student.findAll({
        include: [{ all: true }]
    }).
    then(data => res.json(data))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    //console.log(req.params);
    Student.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => res.json(data))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
    Student.findOne({where: {
        id: req.params.id
    }})
    .then (data => {
        res.json(data);
    })
    .catch (next);
});

router.post ('/', (req, res, next) => {
    Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gpa: req.body.gpa,
        campusId: req.body.campusId,
        email: req.body.email
    })
    .then (student => {
        console.log(student);
        res.json(student);
    })
   .catch (err => {
       res.json(err);
       return err;
   })
    .catch (next);
});

router.put('/', (req, res, next) => {
    //console.log(req.body.studentId);
   // console.log(req.body);
    Student.update ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gpa: req.body.gpa,
            campusId: req.body.campusId
    }, {
        where: {
            id: +req.body.studentId
        }
    })
    .then(data => {
       // console.log('IN UPDATE:  ', data);
        res.json(data)
    })
    .catch (err => {
        res.json(err);
        return err;
    })
    .catch(next);
})