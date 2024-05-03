async function sendData() {
  const formData = new URLSearchParams();
  const formArvosanat = document.querySelector("#kurssiarvosanat").value;
  formData.append("kurssiarvosanat", formArvosanat)

  try {
    const response = await fetch("http://localhost:3000/lataa", {
      method: "POST",
      body: formData,
    });
    // TODO: kirjoita vastaus html:ään ja tyhjennä lomake
    const data = await response.json();
    const lataustulos = document.querySelector("#lataustulos");
    if (data.viesti === "ok") {
      lataustulos.innerHTML = "<p>Kurssiarvosanat lisätty onnistuneesti.</p>";
      document.querySelector("#lisaa").reset(); // Tyhjennetään lomake
    } else {
      lataustulos.innerHTML = "<p>Virhe lisättäessä kurssiarvosanoja.</p>";
    }
    console.log(await response.json());
  } catch (e) {
    // TODO: kirjoita vastaus html:ään
    const lataustulos = document.querySelector("#lataustulos");
    lataustulos.innerHTML = "<p>valmis</p>";
  }
}

async function search() {
  const formData = new URLSearchParams();
  const formKurssi = document.querySelector("#kurssi").value;
  const formOpiskelija = document.querySelector("#opiskelija").value;
  formData.append("kurssi", formKurssi);
  formData.append("opiskelija", formOpiskelija);
  console.log(formOpiskelija)
  console.log(formKurssi)
  try {
    const response = await fetch("http://localhost:3000/hae", {
      method: "POST",
      body: formData,
    });
    // TODO: laita vastaus hakutulos-elementtiin
    // TODO: huomaa tyhjä vastaus
    const data = await response.json();
    const hakutulos = document.querySelector("#hakutulos");
    const kurs = document.querySelector("#kurssi")
    const ops = document.querySelector("#opiskelija")
    if(kurs && ops === 0) {

      hakutulos.innerHTML = "<p>Ei hakutuloksia.</p>";
    }
    if (data.length === 0) {
      hakutulos.innerHTML = "<p>Ei hakutuloksia.</p>";

    } else {
      let html = "<ul>";
      data.forEach(item => {
        html += `<li>${item.kurssi} - ${item.opiskelija}: ${item.arvosana}</li>`;
      });
      html += "</ul>";
      hakutulos.innerHTML = html;

    }
    //console.log(await response.json());
  } catch (e) {
    // TODO: laita virheilmoitus html:ään
    console.error(e);
    const hakutulos = document.querySelector("#hakutulos");
    hakutulos.innerHTML = "<p>Virhe haettaessa kurssiarvosanoja.</p>";
  }
}

// Take over form submissions
document.querySelector("#lisaa").addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

document.querySelector('#haku').addEventListener('submit', (event) => {
  event.preventDefault();
  search();
});