const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./server/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));