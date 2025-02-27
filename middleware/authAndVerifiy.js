const jwt = require('jsonwebtoken');
const env = require('dotenv');
const cashFlowService = require('../service/cashFlowService')
const userService = require('../service/UserService')
env.config();

const auth = (req, res, next) => {
    const {authorization} = req.headers;
    let header;
    
    if(!authorization){

        res.status(401).send({message: "unauthorized"})
        throw new Error("unauthorized")
    }else{
        header = authorization.split(" ");//[Bearer Token]
    }

    const [bearer, token] = header;

    if(bearer != "Bearer"){

        res.status(401).send({message: "unauthorized"})
        throw new Error("unauthorized")
    }

    if(header.lenght < 2){

        res.status(401).send({message: "unauthorized"})
    }

    jwt.verify(token, process.env.PRIVATE_KEY_JWT, (err, decoded) =>{

        if(err){
            res.status(401).send({message: err.message});
        }

        console.log('function auth form authAndVerify.js docode.id: ', decoded.id)
        console.log('function auth form authAndVerify.js docode: ', decoded)

        userService.getUserModel(decoded.id).then(() => {
            
            req.userID = decoded.id;
            return next()

        }).catch((e) => {
            res.status(401).send({error: e.message, message: "user not found"})
        })

    })
}

const pagination = async (req, res, next) => {

    try{

        let {skip, limit} = req.query
        skip = !skip ? 0 : Number(skip); 
        limit = !limit ? 5 : Number(limit);

        const total = await cashFlowService.countDocModel(req.userID);     
        const next = skip + limit;
        const previous = skip - limit;

        let baseUrl = req.baseUrl;
        let nextUrl;
        let previousURL;
        
        if(next < total){
            nextUrl = `${baseUrl}?skip=${next}&limit=${limit}`
        }else{
            nextUrl = null;
        }

        if(previous >= 0){
            previousURL = `${baseUrl}?skip=${previous}&limit=${limit}`
        }else{
            previousURL = null;
        }

        req.skip = skip;
        req.limit = limit;
        req.nextUrl = nextUrl;
        req.previousURL = previousURL;

    }catch{
        return res.send({error: "pagination error"})
    }
    
    next()

}

module.exports = {auth, pagination}