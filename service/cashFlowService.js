const cashFlowModel = require('../model/cashFlowSchema');

const createCashFlowModel = (body, token) => {

    const model = {
        title: body.title,
        description: body.description,
        value: body.value,
        date: body.date,
        cashInflow: body.cashInflow,
        cashOutflow: body.cashOutflow,
        tag: body.tag,
        user: token
    }

    return cashFlowModel.create(model);
};

const getCashflowByIdModel = (id, skip, limit) => {

    if(skip === undefined || limit === undefined){
        return cashFlowModel.find({user: id})
    }

    return cashFlowModel.find({$or: [{user: id}, {_id: id}]}).sort({date: -1}).skip(skip).limit(limit)// sort ordena pelo campo date de forma decrescente //o paremetro {user: 0, _id: 0} exclui esses campos do retorno da requisição
}

const getCardModel = (id) => {

    return cashFlowModel.find({_id: id})
}

const deleteCashFlowModel = (id) => {

    return cashFlowModel.findByIdAndDelete(id);
}

const updateCashFlowModel = (id, obj) => {
    return cashFlowModel.findByIdAndUpdate(id, obj)
}

const countDocModel = (id) => {
    return cashFlowModel.countDocuments({user: id})
}


module.exports = {createCashFlowModel, getCashflowByIdModel, deleteCashFlowModel, updateCashFlowModel, countDocModel, getCardModel};