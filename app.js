const express = require('express')
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./db');
const taskUpdated = require('./component/update')
const taskDeleted = require('./component/delete')

const app = express();
app.use(express.json());

app.use(cors());

// Get all Task
app.get('/', (req, res) => {
    db.query('SELECT * FROM todo', (err, result) => {
        if (err) {
            console.log('there is error in getting data :', err);
            return res.status(500).json({message: err.message});
        } else {
            res.json(result);
        }
    })
})


// Add a new Task
app.post('/', (req, res) => {
    const {name, completed} = req.body;
    db.query('INSERT INTO todo (name, completed) VALUES (?, ? )', [name, completed], (err, result) => {
        if (err) {
            console.log('there is error while adding new task', err);
            return res.status(201).json({message: message});
        } else {
            res.status(201).json({id: result.insertId, name, completed});
        }
    } )

})
// Update a task
app.use('/update', taskUpdated);
// Delete a task
app.use('/delete', taskDeleted);


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
