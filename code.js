const campos = {
  nombre: {
    validar: (val) => val.length > 6 && val.includes(" "),
    error: "Debe tener más de 6 letras y un espacio.",
  },
  email: {
    validar: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    error: "Formato de email inválido.",
  },
  password: {
    validar: (val) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val),
    error: "Mínimo 8 caracteres con letras y números.",
  },
  repetirPassword: {
    validar: (val) => val === document.getElementById("password").value,
    error: "Las contraseñas no coinciden.",
  },
  edad: {
    validar: (val) => Number.isInteger(+val) && +val >= 18,
    error: "Debe ser un número mayor o igual a 18.",
  },
  telefono: {
    validar: (val) => /^\d{7,}$/.test(val),
    error: "Mínimo 7 dígitos, sin espacios ni símbolos.",
  },
  direccion: {
    validar: (val) =>
      val.length >= 5 && /\d/.test(val) && /\D/.test(val) && val.includes(" "),
    error: "Debe tener al menos 5 caracteres, letras, números y un espacio.",
  },
  ciudad: {
    validar: (val) => val.length >= 3,
    error: "Debe tener al menos 3 caracteres.",
  },
  cp: {
    validar: (val) => val.length >= 3,
    error: "Debe tener al menos 3 caracteres.",
  },
  dni: {
    validar: (val) => /^\d{7,8}$/.test(val),
    error: "Debe ser un número de 7 u 8 dígitos.",
  },
};

Object.keys(campos).forEach((campo) => {
  const input = document.getElementById(campo);
  const errorDiv = input.nextElementSibling;

  input.addEventListener("blur", () => {
    if (!campos[campo].validar(input.value)) {
      errorDiv.textContent = campos[campo].error;
    }
  });

  input.addEventListener("focus", () => {
    errorDiv.textContent = "";
  });
});

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  let errores = [];
  let datos = {};

  Object.keys(campos).forEach((campo) => {
    const input = document.getElementById(campo);
    const errorDiv = input.nextElementSibling;
    const valor = input.value.trim();

    if (!campos[campo].validar(valor)) {
      errorDiv.textContent = campos[campo].error;
      errores.push(`${campo}: ${campos[campo].error}`);
    } else {
      errorDiv.textContent = "";
      datos[campo] = valor;
    }
  });

// Modal básico
const modal = document.createElement("div");
modal.id = "modal";
modal.style.display = "none";
modal.innerHTML = `
  <div class="modal-content">
    <span id="cerrar-modal">&times;</span>
    <div id="modal-mensaje"></div>
  </div>
`;
document.body.appendChild(modal);

const mostrarModal = (html) => {
  document.getElementById("modal-mensaje").innerHTML = html;
  modal.style.display = "block";
};

document.getElementById("cerrar-modal").onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Submit y envío al servidor
document.getElementById("formulario").addEventListener("submit", async function (e) {
  e.preventDefault();
  let errores = [];
  let datos = {};

  Object.keys(campos).forEach((campo) => {
    const input = document.getElementById(campo);
    const errorDiv = input.nextElementSibling;
    const valor = input.value.trim();

    if (!campos[campo].validar(valor)) {
      errorDiv.textContent = campos[campo].error;
      errores.push(`${campo}: ${campos[campo].error}`);
    } else {
      errorDiv.textContent = "";
      datos[campo] = valor;
    }
  });

  if (errores.length > 0) {
    mostrarModal(`<h3>Errores en el formulario</h3><ul>${errores.map(err => `<li>${err}</li>`).join('')}</ul>`);
    return;
  }

  try {
    const response = await fetch("http://curso-dev-2021.herokuapp.com/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    const result = await response.json();

    if (response.ok) {
      mostrarModal(`<h3>¡Suscripción exitosa!</h3><pre>${JSON.stringify(result, null, 2)}</pre>`);
      localStorage.setItem("newsletterData", JSON.stringify(result));
      this.reset();
    } else {
      mostrarModal(`<h3>Error al suscribirse</h3><p>${result.message || "Ocurrió un error desconocido."}</p>`);
    }
  } catch (error) {
    mostrarModal(`<h3>Error de red</h3><p>${error.message}</p>`);
  }
});

// Al cargar la página: mostrar datos guardados
window.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("newsletterData");
  if (guardado) {
    const datos = JSON.parse(guardado);
    mostrarModal(`<h3>Ya estás suscrito</h3><pre>${JSON.stringify(datos, null, 2)}</pre>`);
  }});