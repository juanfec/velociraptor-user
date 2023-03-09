require('dotenv').config()
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const PORT = 3000

const app = express();
// Set up middleware
app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Set up routes
const userRoutes = require('./src/routes/userRouter');
app.use('/', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.errno === 1062) {
        console.log(err);
        res.status(400).json({ message: 'Already exists' });
    } else if (err.errno === 1452) {
        console.log(err);
        res.status(409).json({ message: 'Foreign key constraint fails' });
    } else {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

// Export the app
if (process.env.ENVIROMENT === 'lambda') {
    module.exports.handler = serverless(app);
} else {
    app.listen(PORT, () => {
        console.log(`server linstening on port ${PORT}`)
        console.log(process.env.dbName);
    })
}