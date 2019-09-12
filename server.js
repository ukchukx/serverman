const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(13000, () => console.log('Example app listening on port 13000'));