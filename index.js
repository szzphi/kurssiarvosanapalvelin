const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const {port, host} = require('./config.json');

// TODO: Staattinen hakemisto HTML, JS ja CSS-tiedostoille
app.use('/inc', express.static('includes'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'templates/index.html')));

// TODO: Polku joka vastaanottaa CSV-tiedoston

// TODO: Polku joka vastaanottaa ja vastaa hakuun

app.listen(port, host, () => {console.log("Kurssiarvosana palvelin kuuntelee")});
