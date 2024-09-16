const express = require('express');
const db = require('../db');
const router = express.Router();

//delete task
router.delete(':/id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FORM todo WHERE id = ?', [id], (err, result) => {
        if(err) {
            console.log('Error deleting task', err);
            return res.status(500).json({message: err.message});
        }
        if(result.affectedRows === 0) {
            return res.status(404). json({message:'Task not found'})
        }

        res.json({message: 'Task deleted Successfully.'});
    });
});

module.exports = router;
