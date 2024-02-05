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
    console.log(await response.json());
  } catch (e) {
    // TODO: kirjoita vastaus html:ään
    console.error(e);
  }
}

async function search() {
  const formData = new URLSearchParams();
  const formKurssi = document.querySelector("#kurssi").value;
  const formOpiskelija = document.querySelector("#opiskelija").value;
  formData.append("kurssi", formKurssi);
  formData.append("opiskelija", formOpiskelija);

  try {
    const response = await fetch("http://localhost:3000/hae", {
      method: "POST",
      body: formData,
    });
    // TODO: laita vastaus hakutulos-elementtiin
    console.log(await response.json());
  } catch (e) {
    // TODO: laita virheilmoitus html:ään
    console.error(e);
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