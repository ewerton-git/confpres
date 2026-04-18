function abrirModal() {
  document.getElementById("modalForm").style.display = "block";
}

function fecharModal() {
  document.getElementById("modalForm").style.display = "none";
}

// fechar clicando fora
window.onclick = function (event) {
  const modal = document.getElementById("modalForm");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function mostrarFormulario() {
  const form = document.getElementById("formulario");
  form.style.display = "block";
  setTimeout(() => {
    form.style.opacity = "1";
  }, 50);
}

window.onload = function () {
  const liberado = sessionStorage.getItem("acessoLiberado");

  if (liberado === "true") {
    document.getElementById("bloqueio").style.display = "none";
  }
};

// lista de códigos (exemplo)
async function validarCodigo() {
  const codigo = document
    .getElementById("codigoInput")
    .value.trim()
    .toUpperCase();
  const erro = document.getElementById("erroCodigo");

  if (!codigo) {
    erro.innerText = "Digite um código!";
    return;
  }

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxO6VKwWOiB5y3FKMX0QAOW9l6uI-xKTVM113tXMQwHpvK-R0TaMxTG_IFP6-D4mZk0/exec",
      {
        method: "POST",
        body: JSON.stringify({ codigo: codigo }),
      },
    );

    const result = await response.json();

    if (result.status === "ok") {
      sessionStorage.setItem("acessoLiberado", "true");

      // opcional: salvar acompanhantes
      localStorage.setItem("acompanhantes", result.acompanhantes);

      document.getElementById("bloqueio").style.display = "none";
    } else if (result.status === "usado") {
      erro.innerText = "Esse convite já foi utilizado!";
    } else {
      erro.innerText = "Código inválido!";
    }
  } catch (err) {
    erro.innerText = "Erro ao validar. Tente novamente.";
  }
}
