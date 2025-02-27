const mongoose = require('mongoose');
require('dotenv').config();

const connectionDatabase = () => {
    console.log("connecting...")

    mongoose.connect(process.env.DATABASE_URL)
        .then(()=>{
            console.log("Database connection established successfully")
        })
        .catch((e) => {
            console.log(e)
        })
};

module.exports = connectionDatabase;