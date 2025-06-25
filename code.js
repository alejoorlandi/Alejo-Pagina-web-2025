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

  if (errores.length > 0) {
    alert("Errores en el formulario:\n\n" + errores.join("\n"));
  } else {
    alert("Formulario enviado con éxito:\n\n" + JSON.stringify(datos, null, 2));
    this.reset();
  }
});
