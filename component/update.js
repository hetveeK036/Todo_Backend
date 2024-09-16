const express = require('express');
const router = express.Router();
const db = require('../db');

// Update a task
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name, completed} = req.body;

    db.query('UPDATE todo SET name = ?, completed = ? WHERE id = ?', [name, completed,id], (err, result) => {
        if (err) {
            console.log("Error updating Task : ", err);
            return res.status(500).json({message: err.message});
        } if(result.affectedRows === 0) {
            return res.status(404).json({message: 'Task not found :'});
        }
        res.json({id, name, completed})

    });
});

module.exports = router;