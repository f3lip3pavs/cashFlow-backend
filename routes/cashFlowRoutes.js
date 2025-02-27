const routes = require('express').Router();
const cashFlowController = require('../controller/cashFlowController');
const authAndVerify = require('../middleware/authAndVerifiy');

routes.post('/', authAndVerify.auth, cashFlowController.createCashFlow);

routes.get('/', authAndVerify.auth, authAndVerify.pagination, cashFlowController.getCashflowById);

routes.delete('/:id', authAndVerify.auth, authAndVerify.isUserAuthorized, cashFlowController.deleteCashFlow);

routes.patch('/:id', authAndVerify.auth, authAndVerify.isUserAuthorized, cashFlowController.updateCashFlow);

module.exports = routes
