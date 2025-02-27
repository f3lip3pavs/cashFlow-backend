const authService = require('../service/authService');

const auth = (req, res) => {
    const {username, password} = req.body;

    authService.authUser(username).then((user)=>{
    
        if(user == null){
            return res.status(404).send({message: 'invalid username or password'}); 
        }

        if(password != user.password){
            return res.status(404).send({message: 'invalid username or password'});   
        }
        
        const token = authService.tokenGenerator(user._id)
        
        res.status(200).send({message: "login successfully", token: JSON.stringify(token)})

    }).catch(e => {

        res.status(404).send({error: e})

    })

}

module.exports = {auth}