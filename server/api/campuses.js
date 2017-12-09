'use strict'
const router = require('express').Router();
const {Student, Campus} = require ('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
    //console.log('Hit campus get');
    Campus.findAll().
    then(data => {
        //console.log('retrieved all campuses', data);
        res.json(data);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Campus.destroy({where: {
        id: req.params.id
    }})
    .then (data => {
        Student.update({
            campusId: null
        }, {
            where: {
                campusId: req.params.id
            }
        })
       // console.log('after delete campuses', data);
        res.json(data);
    })
    .catch (next);
});

router.get('/:id', (req, res, next) => {
    Campus.findOne({where: {
        id: req.params.id
    }})
    .then (data => {
        res.json(data);
    })
    .catch (next);
});

router.post ('/', (req, res, next) => {
    Campus.create({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    })
    .then (campus => res.json(campus))
    .catch (err => {
        res.json(err);
        return err;
    })
    .catch (next);
});

router.put('/', (req, res, next) => {
    //console.log(req.body.studentId);
    //console.log(req.body);
    Campus.update ({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
    }, {
        where: {
            id: +req.body.campusId
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