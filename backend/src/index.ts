import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config({ path: '../../'});

const PORT = 3000;
console.log('process.env.PORT :>> ', process.env.PORT);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/openai', (req, res) => {
  const data = 'Keywords: Health, Productivity, Business, Utilities'
  res.json(data);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});