const mongoose = require('mongoose');

const cashFlowSchema = new mongoose.Schema({
    title:{type: String, required: true},
    description:{type: String},
    value:{type: Number, required: true},
    date:{type: Date, required: true},
    cashInflow:{type:Boolean, required: true},
    cashOutflow:{type:Boolean, required: true},
    tag:{type: String, required:true},
    user:{type: mongoose.Schema.Types.ObjectId, ref: "userModel", required: true}
})

const cashFlowModel = mongoose.model("cashFlowModel", cashFlowSchema);

module.exports = cashFlowModel;