import express, { Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//establish connection to the postgres database
const pool=new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'content',
    password: '2022',
    port: 5432
});

//create a table in the database
pool.query(
    `CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        status BOOLEAN DEFAULT false
    )`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Table created successfully');
        }
    }
);

// //create a notification
// pool.query(
//     `INSERT INTO notifications (message) VALUES ('Hello, welcome to the notification service')`, (err, res) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Notification created successfully');
//         }
//     }
// );

// //get all notifications
// pool.query(
//     `SELECT * FROM notifications`, (err, res) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(res.rows);
//         }
//     }
// );


app.get('/', (req, res) => {
    res.send('Notification Service Running...');
});

app.get('/notifications', async (req, res) => {
    try {
        const allNotifications = await pool.query(`SELECT * FROM notifications`);
        res.json(allNotifications.rows);
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

