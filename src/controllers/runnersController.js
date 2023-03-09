const mysql = require('serverless-mysql')({
    config: {
        host: process.env.dbHostname,
        database: process.env.dbName,
        user: process.env.dbUsername,
        password: process.env.dbPassword
    },
    library: require('mysql2'),
    multipleStatements: false,
})


exports.getRunnerById = async function(req, res, next) {
    try {
        const rows = await mysql.query('SELECT * FROM runners WHERE id = ?', [
            req.params.id,
        ]);
        await mysql.end();
        if (rows.length === 0) {
            res.status(404).json({ message: 'Runner not found' });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        next(err);
    }
};

exports.createRunner = async function(req, res, next) {
    try {
        const { document_type, document_number, name, surname, email, sex_id } = req.body;
        const result = await mysql.query(
            'INSERT INTO runners (document_type, document_number, name, surname, email, sex_id) VALUES (?, ?, ?, ?, ?, ?)', [document_type, document_number, name, surname, email, sex_id],
        );
        await mysql.end();
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        next(error)
    }
};

exports.updateRunner = async function(req, res, next) {
    try {
        const { document_type, document_number, name, surname, email, sex_id } = req.body;
        const result = await mysql.query(
            'UPDATE runners SET document_type = ?, document_number = ?, name = ?, surname = ?, email = ?, sex_id = ? WHERE id = ?', [document_type, document_number, name, surname, email, sex_id, req.params.id],
        );
        await mysql.end();
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Runner not found' });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        next(err);
    }
};

exports.deleteRunner = async function(req, res) {
    try {
        const result = await mysql.query('DELETE FROM runners WHERE id = ?', [req.params.id]);
        await mysql.end();
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Runner not found' });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        next(err);
    }
};