// Boilerplate typescript express server
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';


config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});