console.log("SCRIPT CARREGOU");

function abrirModal() {
  document.getElementById("modalForm").style.display = "block";
}

function fecharModal() {
  document.getElementById("modalForm").style.display = "none";
}

// fechar clicando fora
window.onclick = function (event) {
  const modal = document.getElementById("modalForm");
  if (modal.style.display === "block" && event.target === modal) {
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
      `https://script.google.com/macros/s/AKfycbxbQgnZpt7sNevVN1A-bLfkQ9x1NTucemgq_2B_OQ6ijWEFvGtKLRahpK99TKg2GZWq/exec?codigo=${codigo}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const text = await response.text();
    const result = JSON.parse(text);

    if (result.status === "ok") {
      sessionStorage.setItem("acessoLiberado", "true");
      document.getElementById("bloqueio").style.display = "none";
    } else if (result.status === "usado") {
      erro.innerText = "Esse convite já foi utilizado!";
    } else {
      erro.innerText = "Código inválido!";
    }
  } catch (err) {
    console.error(err);
    erro.innerText = "Erro ao validar. Verifique conexão ou script.";
  }
}
