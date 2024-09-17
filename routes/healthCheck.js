const express = require('express');
const db = require('../connection/db');
const router = express.Router();

router.get('/', async(req, res) => {
    db.query('SELECT 1', (err, result) => {
        if(err) {
            res.status(503).json({message: err.message});
        }
        res.send().json({status: 'healthy'})
    })
})

module.exports = router;