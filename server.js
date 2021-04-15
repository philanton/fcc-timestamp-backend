const app = require('./app');
const express = require('express');
const server = express();

const port = process.env.PORT || 3000;

server.get('/', (req, res) => res.send('Hello World!'));

server.use('/api', app);

server.listen(port, () => console.log('Server started on http://localhost:' + port));
