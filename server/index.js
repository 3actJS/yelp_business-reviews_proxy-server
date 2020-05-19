const express = require('express');
const app = express();
const path = require('path');

const port = 8000;


const publicFolder = path.join(__dirname, '../', 'dist');
const publicHTML = path.join(__dirname, '../', 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(publicFolder));

app.listen(port, () => {
  console.log(`Main proxy running on port ${port}`)
});

app.get('/', (req, res) => {
  res.send(publicHTML);
});

