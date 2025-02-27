const userModel = require('../model/UserSchema');
const jwt = require('jsonwebtoken')


const authUser = async (username) => {
    const user = await userModel.findOne({username: username});

    
    if(user == null){
        console.log(user)
        return null
    }else{
        return user;
    }

};

const tokenGenerator = (id) => {
    return jwt.sign({ id: id }, process.env.PRIVATE_KEY_JWT, { expiresIn: 3600 }); //86400
}

module.exports = {authUser, tokenGenerator}