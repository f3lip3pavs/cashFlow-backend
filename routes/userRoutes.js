const router = require('express').Router();
const userController = require('../controller/UserController')
const authAndVerify = require('../middleware/authAndVerifiy');

router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/user', authAndVerify.auth, userController.getUserById)

//router.get('/:id', userController.getUserById) backup

//:id
router.delete('/', authAndVerify.auth, userController.deleteUser);

router.patch('/', authAndVerify.auth, userController.updateUser);

module.exports = router;