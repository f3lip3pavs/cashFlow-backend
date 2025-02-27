const allowedOrigins = [
    "http://localhost:5173",
    "https://cash-flow-frontend.vercel.app"
];

const cors = (req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
       
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if(req.method == 'OPTIONS'){
        return res.sendStatus(204)
    };

    next()
}

module.exports = cors;