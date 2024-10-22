const {Router} = require('express');
const userRouter = require('./user');
const accountRouter = require('./account');

const apiRouter = Router()

apiRouter.use('/user' , userRouter)
apiRouter.use('/account' , accountRouter)

module.exports = apiRouter