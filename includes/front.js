const form = document.querySelector("#lisaa");

async function sendData() {
  const formData = new URLSearchParams();
  const formArvosanat = document.querySelector("#kurssiarvosanat").value;
  formData.append("kurssiarvosanat", formArvosanat)

  try {
    const response = await fetch("http://localhost:3000/lataa", {
      method: "POST",
      body: formData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});