const trabaja = document.getElementById("trabaja");
const salarioContainer = document.getElementById("salarioContainer");
const form = document.getElementById("surveyForm");
const mensaje = document.getElementById("mensaje");

trabaja.addEventListener("change", function () {
  if (this.value === "si") {
    salarioContainer.classList.remove("hidden");
  } else {
    salarioContainer.classList.add("hidden");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (trabaja.value === "") {
    alert("Por favor responde si trabajas");
    return;
  }

  if (trabaja.value === "si") {
    const salario = document.getElementById("salario").value;
    if (salario === "") {
      alert("Por favor ingresa tu salario");
      return;
    }
  }

  mensaje.textContent = "Gracias por participar 🎉";
});