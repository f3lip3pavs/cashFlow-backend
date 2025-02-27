const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cashFlowRoutes = require('./routes/cashFlowRoutes');
const authRoutes = require('./routes/authRoutes');
const connectionDatabase = require('./config/database');
const cors = require('./middleware/corsPolicy')
const app = express();
const PORT = 8080;

connectionDatabase();

app.use(cors)
app.use(express.json());
app.use('/users', userRoutes); // alterei de user para users
app.use('/cashFlow', cashFlowRoutes);
app.use('/login', authRoutes);

app.listen(PORT, () => {
    console.log(`server runnig on port ${PORT}`)
});
