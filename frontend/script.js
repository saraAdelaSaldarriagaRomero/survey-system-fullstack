// ====== VARIABLES GLOBALES ======
let currentStep = 0;
const steps = document.querySelectorAll(".step");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const submitBtn = document.getElementById("submitBtn");

// Cuotas simuladas
let cuotaTrabajan = 0;
const MAX_CUOTA = 2;

// ====== INICIALIZACIÓN ======
steps[0].classList.add("active");
updateButtons();
updateProgress();

// ====== FUNCIONES PRINCIPALES ======

// Mostrar paso
function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });

  updateButtons();
  updateProgress();
}

// Botones
function updateButtons() {
  prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";

  if (currentStep === steps.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }
}

// Barra de progreso
function updateProgress() {
  const progress = ((currentStep + 1) / steps.length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";
}

// ====== VALIDACIONES ======
function validateStep() {
  const edad = parseInt(document.getElementById("edad").value);
  const trabaja = document.getElementById("trabaja").value;

  if (currentStep === 0) {
    if (!edad || edad < 10) {
      alert("Ingresa una edad válida");
      return false;
    }

    // Skip logic (bloqueo)
    if (edad < 15) {
      alert("No puedes continuar la encuesta");
      return false;
    }
  }

  if (currentStep === 1) {
    if (!trabaja) {
      alert("Selecciona si trabajas");
      return false;
    }

    // Cuotas
    if (trabaja === "si" && cuotaTrabajan >= MAX_CUOTA) {
      alert("La cuota para personas que trabajan está llena");
      return false;
    }
  }

  if (currentStep === 2) {
    if (trabaja === "si") {
      const salario = document.getElementById("salario").value;
      if (!salario) {
        alert("Debes ingresar salario");
        return false;
      }
    }
  }

  return true;
}

// ====== LÓGICA CONDICIONAL ======
function handleLogic() {
  const edad = parseInt(document.getElementById("edad").value);
  const trabaja = document.getElementById("trabaja").value;

  const salario = document.getElementById("salarioContainer");
  const estudio = document.getElementById("estudioContainer");
  const hobbies = document.getElementById("hobbiesContainer");

  // Reset
  salario.classList.add("hidden");
  estudio.classList.add("hidden");
  hobbies.classList.add("hidden");

  // Mostrar salario si trabaja
  if (trabaja === "si") {
    salario.classList.remove("hidden");
  }

  // Mostrar estudio si es joven
  if (edad < 25) {
    estudio.classList.remove("hidden");
  }

  // Condición múltiple
  if (edad > 18 && trabaja === "no") {
    hobbies.classList.remove("hidden");
  }
}

// ====== RANDOMIZACIÓN ======
function randomizeOptions(selectId) {
  const select = document.getElementById(selectId);
  let options = Array.from(select.options);

  const first = options.shift(); // mantener "Selecciona"
  options.sort(() => Math.random() - 0.5);

  select.innerHTML = "";
  select.appendChild(first);
  options.forEach(opt => select.appendChild(opt));
}

// Ejecutar randomización
randomizeOptions("gusta");

// ====== EVENTOS ======

// Siguiente
nextBtn.addEventListener("click", () => {
  if (!validateStep()) return;

  currentStep++;

  if (currentStep === 2) {
    handleLogic();
  }

  showStep(currentStep);
});

// Anterior
prevBtn.addEventListener("click", () => {
  currentStep--;
  showStep(currentStep);
});

// Envío
document.getElementById("surveyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const edad = parseInt(document.getElementById("edad").value);
  const trabaja = document.getElementById("trabaja").value;
  const salario = document.getElementById("salario").value;
  const estudio = document.getElementById("estudio").value;
  const gusta = document.getElementById("gusta").value;

  // Incrementar cuota
  if (trabaja === "si") {
    cuotaTrabajan++;
  }

  // Variable derivada
  let perfil = "";

  if (trabaja === "si" && salario > 2000) {
    perfil = "Profesional alto ingreso";
  } else if (trabaja === "si") {
    perfil = "Trabajador";
  } else if (edad < 25) {
    perfil = "Estudiante";
  } else {
    perfil = "General";
  }

  // Mensaje dinámico
  let mensaje = `Perfil: ${perfil}`;

  if (gusta === "si") {
    mensaje += " | Le gustan las encuestas 👍";
  } else {
    mensaje += " | No le gustan las encuestas 👎";
  }

  document.getElementById("mensaje").textContent = mensaje;

  // Simulación guardado
  const data = {
    edad,
    trabaja,
    salario,
    estudio,
    gusta,
    perfil
  };

  console.log("Datos guardados:", data);

  // Guardar en localStorage (simulación BD)
  localStorage.setItem("encuesta", JSON.stringify(data));
});