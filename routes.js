const express = require('express');
const routes = express.Router();

// Obtener los datos---------------------------
routes.get('/', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.send(err)

        connection.query('SELECT * FROM books', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        });
    })
});

// Crear los datos y enviarlo a la base de datos-------
routes.post('/', (req, res) => {
    req.getConnection((err, connection) => {
        if(err) return res.send(err)

        connection.query('INSERT INTO books set ?', [req.body], (err, rows) => {
            if(err) return res.send(err)

            res.json('Book add!');
        });
    });
});

// Eliminar la un dato de la base de dato-------
routes.delete('/:id', (req, res) => {
    req.getConnection((err, connection) => {
        if(err) return res.send(err)

        connection.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json('Book Deleted!');
        });
    });
});

// Actualizar los datos en DB
routes.put('/:id', (req, res) => {
    req.getConnection((err, connection) => {
        if(err) return res.send(err)

        connection.query('UPDATE books set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json('Book Update!');
        });
    });
});

module.exports = routes;