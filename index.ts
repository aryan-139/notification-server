import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Notification Service Running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
