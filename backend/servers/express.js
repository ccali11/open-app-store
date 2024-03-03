const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


const result = dotenv.config();
console.log(result)
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.get('/api/data', (req, res) => {
    // Your route logic here
    res.json({ message: 'Data from backend' });
});

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
