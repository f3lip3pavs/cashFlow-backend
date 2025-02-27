const cors = (req, res, next) => {
       
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if(req.method == 'OPTIONS'){
        return res.sendStatus(204)
    };

    next()
}

module.exports = cors;