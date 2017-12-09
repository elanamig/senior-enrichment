'use strict'
const apiRouter = require('express').Router()
module.exports = apiRouter;

apiRouter.use('/campuses', require('./campuses'));
apiRouter.use('/students', require('./students'));

apiRouter.use((req, res, next) => {
	res.status(404).send('Not found!');
});