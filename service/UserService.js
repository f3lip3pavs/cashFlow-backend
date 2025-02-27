const userModel = require('../model/UserSchema');

const createUserModel = (body) => {
    return userModel.create(body);
};

const getUserModel = async (id) => {

    return userModel.findById(id);

};

const getAllUsersModel = () => {

    return userModel.find();
};

const deleteUserModel = (id) => {
    return userModel.findByIdAndDelete(id)
};

const updateUserModel = (id, obj) => {

    return userModel.findByIdAndUpdate(id, obj)
}

module.exports = {createUserModel, getUserModel, getAllUsersModel, deleteUserModel, updateUserModel};