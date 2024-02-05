const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
const {port, host} = require('./config.json');

// Staattinen hakemisto HTML, JS ja CSS-tiedostoille
app.use('/inc', express.static('includes'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'templates/index.html')));

// Lue kurssiarvosanat.json tiedosto
let kurssiarvosanat = require('./kurssiarvosanat.json');

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
        kurssi: arvosanaArray[0].replaceAll('"',''),
        opiskelija: arvosanaArray[1].replaceAll('"',''),
        arvosana: parseInt(arvosanaArray[2].replaceAll('"','')),
      };
      uudet.push(arvosanaOlio);
    }
    kurssiarvosanat = kurssiarvosanat.concat(uudet);

    fs.writeFile(
      'kurssiarvosanat.json',
      JSON.stringify(kurssiarvosanat),
      { encoding: 'utf8' },
      function(err) {
        if (err) {
          console.log('Virhe tiedostoon kirjoittamisessa.');
          res.status(500).json({"viesti": "virhe"});
        }
        else {
          console.log('Kurssiarvosanat kirjoitettu tiedostoon.');
          res.json({"viesti": "ok"});
        }
      }
    );
});

// Polku joka vastaanottaa ja vastaa hakuun
app.post('/hae', (req, res) => {
  const opiskelija = req.body.opiskelija;
  const kurssi = req.body.kurssi;

  const vastaus = [];
  // Looppi kaikkien kurssiarvosanojen yli
  for (kurssiarvosana of kurssiarvosanat) {
    // Vertailee arvosanoja ja lisää osumat vastaukseen...
    if ((opiskelija == undefined && kurssiarvosana.kurssi.includes(kurssi))
      || (kurssi == undefined && kurssiarvosana.opiskelija.includes(opiskelija))
      || (kurssiarvosana.opiskelija.includes(opiskelija) && kurssiarvosana.kurssi.includes(kurssi))
    ) {
      vastaus.push(kurssiarvosana);
    }
  }
  // Lähetetään vastaus
  res.json(vastaus);
});

app.listen(port, host, () => {console.log("Kurssiarvosana palvelin kuuntelee")});
