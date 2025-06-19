const form = document.getElementById("registroForm");

const campos = {
  name: {
    validar: (valor) => valor.length > 6 && valor.includes(" "),
    error: "Debe tener más de 6 letras y al menos un espacio.",
  },
  email: {
    validar: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
    error: "Formato de email inválido.",
  },
  password: {
    validar: (valor) => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(valor),
    error: "Debe tener al menos 8 caracteres con letras y números.",
  },
  repetirContrasena: {
    validar: (valor) => valor === document.getElementById("password").value,
    error: "Las contraseñas no coinciden.",
  },
  edad: {
    validar: (valor) => Number.isInteger(Number(valor)) && Number(valor) >= 18,
    error: "Debe ser un número entero mayor o igual a 18.",
  },
  telefono: {
    validar: (valor) => /^\d{7,}$/.test(valor),
    error: "Debe contener al menos 7 dígitos sin espacios ni símbolos.",
  },
  direccion: {
    validar: (valor) =>
      /^.{5,}$/.test(valor) &&
      /\d/.test(valor) &&
      /[a-zA-Z]/.test(valor) &&
      valor.includes(" "),
    error: "Debe tener al menos 5 caracteres con letras, números y un espacio.",
  },
  ciudad: {
    validar: (valor) => valor.length >= 3,
    error: "Debe tener al menos 3 caracteres.",
  },
  codigoPostal: {
    validar: (valor) => valor.length >= 3,
    error: "Debe tener al menos 3 caracteres.",
  },
  dni: {
    validar: (valor) => /^\d{7,8}$/.test(valor),
    error: "Debe tener 7 u 8 dígitos numéricos.",
  },
};

for (let campo in campos) {
  const input = document.getElementById(campo);
  const errorDiv = document.getElementById(`error-${campo}`);

  input.addEventListener("blur", () => {
    if (!campos[campo].validar(input.value)) {
      errorDiv.textContent = campos[campo].error;
    }
  });

  input.addEventListener("focus", () => {
    errorDiv.textContent = "";
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let errores = [];
  let mensajeFinal = "";

  for (let campo in campos) {
    const input = document.getElementById(campo);
    const errorDiv = document.getElementById(`error-${campo}`);

    if (!campos[campo].validar(input.value)) {
      errores.push(`${campo}: ${campos[campo].error}`);
      errorDiv.textContent = campos[campo].error;
    } else {
      mensajeFinal += `${campo}: ${input.value}\n`;
    }
  }

  if (errores.length > 0) {
    alert("Errores en el formulario:\n\n" + errores.join("\n"));
  } else {
    alert("Formulario enviado con éxito:\n\n" + mensajeFinal);
  }
});
