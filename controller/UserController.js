const UserService = require("../service/UserService")
const cashFlowService = require('../service/cashFlowService')

const createUser = (req, res) =>{
    const {name, username, password} = req.body;

    if(!name || !username || !password){
        res.status(400).send({message: "Verifique se todos os campos foram enviados"})
    };

    UserService.createUserModel(req.body)
    .then((doc)=>{
        res.status(200).send({
            "ID": doc._id,
            "Name": name,
            "User Name": username
        })
    })
    .catch(e => {
        res.status(500).send(e)
    })
   
}


const deleteUser = async (req, res) =>{

    await cashFlowService.getCashflowByIdModel(req.userID).then(cards => {
        
        cards.map((card) => {
            console.log(card._id.toString())
            cashFlowService.deleteCashFlowModel(card._id.toString())
            .then(result => result)
        })
    })
    
    UserService.deleteUserModel(req.userID).then((user)=>{
        res.send({user});
    }).catch((e)=>{
        res.send({error: e.message});
    })
}

const updateUser = (req, res) =>{
    
    console.log("controller: " + req.body, req.userID);
    
    UserService.updateUserModel(req.userID, req.body).then((user) => {
        res.send({updatedData: req.body, user});
    }).catch((e) => {
        res.send({error: e.message});
    });
}

const getUserById = (req, res) =>{  
    
    UserService.getUserModel(req.userID).then((user)=>{// req.params.id

        if(!user){
            res.status(404).send({error: 'this user does not exist'})
        }else{
            return res.send(user)
        }

    }).catch((e) => {
        res.status(400).send({error: e.message});
    })
    
}

const getAllUsers = (req, res) =>{

    UserService.getAllUsersModel().then((users) =>{

        res.send(users);

    }).catch((e) => {

        res.send({error: e.message});

    });
}


module.exports = {createUser, getUserById, getAllUsers, deleteUser, updateUser}