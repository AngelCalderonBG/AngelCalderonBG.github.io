document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú móvil hamburguesa
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Cerrar menú al hacer click en cualquier link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // 2. Envío Asíncrono de Web3Forms sin recargar la página
  const form = document.getElementById("contact-form");
  const result = document.getElementById("form-result");
  const submitBtn = document.getElementById("submit-btn");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      
      submitBtn.disabled = true;
      submitBtn.innerText = "Enviando...";
      result.style.color = "#94a3b8";
      result.innerHTML = "Procesando su solicitud...";

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          let jsonResponse = await response.json();
          if (response.status === 200) {
            result.style.color = "#00e5ff";
            result.innerHTML = "Requerimiento enviado con éxito. Le contactaremos en breve.";
            form.reset();
          } else {
            result.style.color = "#ef4444";
            result.innerHTML = jsonResponse.message || "Hubo un error al enviar.";
          }
        })
        .catch((error) => {
          result.style.color = "#ef4444";
          result.innerHTML = "Error de conexión. Inténtelo más tarde.";
        })
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.innerText = "Enviar Requerimiento";
          setTimeout(() => {
            result.innerHTML = "";
          }, 6000);
        });
    });
  }
});