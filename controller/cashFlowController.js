const cashFlowService = require('../service/cashFlowService');

const createCashFlow = (req, res) => {

    const {title, value, date, cashInflow, cashOutflow, tag} = req.body;

    if(!title || !value || !date || cashInflow == undefined || cashOutflow == undefined || !tag){
        res.status(400).send({
            message:"Verifique se todos os campos foram enviados",
        })
    };

    cashFlowService.createCashFlowModel(req.body, req.userID)
    .then((doc)=>{
        res.status(200).send({doc})
    })
    .catch(e => {
        res.status(500).send(e)
    })
}

const getCashflowById = async (req, res) => {
    
    cashFlowService.getCashflowByIdModel(req.userID, req.skip, req.limit).then((docs)=>{

        res.send({nextUrl: req.nextUrl, previousURL: req.previousURL, docs});
    }).catch((e) => {
        res.send({error: e.message})
    })
}

const deleteCashFlow = (req, res) => {    

        cashFlowService.deleteCashFlowModel(req.params.id).then((doc) => {
            res.send(doc);
        }).catch((e) => {
            res.send({error: e.message});
        });

};

const updateCashFlow = (req, res) => {   

    cashFlowService.updateCashFlowModel(req.params.id, req.body).then((doc) => {
        res.send({updateData: req.body, doc});
    }).catch((e) => {
        res.send({error: e.message})
    })

}
    

module.exports = {createCashFlow, getCashflowById, deleteCashFlow, updateCashFlow}