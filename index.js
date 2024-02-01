const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
const {port, host} = require('./config.json');

// Lue kurssiarvosanat.json tiedosto
const kurssiarvosanat = require('./kurssiarvosanat.json');

// Staattinen hakemisto HTML, JS ja CSS-tiedostoille
app.use('/inc', express.static('includes'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'templates/index.html')));

// Polku joka vastaanottaa CSV-tiedoston
app.post('/lataa', (req, res) => {
    const arvosanat = req.body.kurssiarvosanat;

    const uudet = []
    const rivit = arvosanat.split(/\r?\n/);
    // käydään rivit läpi yksi kerrallaan
    for (let rivi of rivit) {
      // ohitetaan otsikkorivi ja tyhjät rivit
      if (rivi == '"kurssi","opiskelija","arvosana"' || rivi == '') {
        continue;
      }

      // jaetaan rivi sarakkeisiin;
      let arvosanaArray = rivi.split(',');

      // luodaan uusi olio ja lisätään se taulukkoon
      let arvosanaOlio = {
        kurssi: arvosanaArray[0],
        opiskelija: arvosanaArray[1],
        arvosana: arvosanaArray[2],
      };
      uudet.push(arvosanaOlio);
    }
    const kurssiarvosanat2 = kurssiarvosanat.concat(uudet);
    console.log(kurssiarvosanat2);
    // TODO: tallenna kurssiarvosanat2
    res.json({"viesti": "ok"});
});

// TODO: Polku joka vastaanottaa ja vastaa hakuun

app.listen(port, host, () => {console.log("Kurssiarvosana palvelin kuuntelee")});
