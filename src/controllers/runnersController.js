const Runners = require('../models/runnersModel').Runners;
const mysql = require('serverless-mysql')({
    config: {
        host: process.env.dbHostname,
        database: process.env.dbName,
        user: process.env.dbUsername,
        password: process.env.dbPassword
    },
    library: require('mysql2'),
})


exports.getRunners = async function(req, res) {
    try {
        res.status(200).json({
            saved: true
        });
        //const runners = await Runners.findAll();
        //res.status(200).json(runners);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getRunnerById = async function(req, res) {
    try {
        await mysql.connect()
        const [rows, fields] = await mysql.query('SELECT * FROM runners WHERE id = ?', [
            req.params.id,
        ]);
        await mysql.end();
        if (rows.length === 0) {
            res.status(404).json({ message: 'Runner not found' });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.createRunner = async function(req, res) {
    try {
        const { document_type, document_number, name, surname, email, sex_id } = req.body;
        const result = await mysql.query(
            'INSERT INTO runners (document_type, document_number, name, surname, email, sex_id) VALUES (?, ?, ?, ?, ?, ?)', [document_type, document_number, name, surname, email, sex_id],
        );
        mysql.end();
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.updateRunner = async function(req, res) {
    try {

        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteRunner = async function(req, res) {
    try {
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};