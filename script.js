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
function validarCodigo() {
  const codigo = document
    .getElementById("codigoInput")
    .value.trim()
    .toUpperCase();

  const erro = document.getElementById("erroCodigo");

  if (!codigo) {
    erro.innerText = "Digite um código!";
    return;
  }

  const antigo = document.getElementById("jsonpScript");
  if (antigo) antigo.remove();

  const script = document.createElement("script");
  script.id = "jsonpScript";

  script.onload = () => {
    console.log("Script carregado!");
  };

  script.onerror = () => {
    erro.innerText = "Erro ao conectar com servidor!";
  };

  script.src = `https://script.google.com/macros/s/AKfycbzK3cUdEEl7qrJw53E3bLZ98R5YqUB8e80tykyvteAbMyk523wVjQD6XEWe9XwD4jrd/exec?codigo=${codigo}&callback=callbackValidacao`;

  document.body.appendChild(script);
}

function callbackValidacao(result) {
  const erro = document.getElementById("erroCodigo");

  if (result.status === "ok") {
    sessionStorage.setItem("acessoLiberado", "true");
    document.getElementById("bloqueio").style.display = "none";
    document.body.classList.add("liberado");
  } else if (result.status === "usado") {
    erro.innerText = "Esse convite já foi utilizado!";
  } else {
    erro.innerText = "Código inválido!";
  }
}

window.callbackValidacao = function (result) {
  const erro = document.getElementById("erroCodigo");

  if (result.status === "ok") {
    sessionStorage.setItem("acessoLiberado", "true");
    document.getElementById("bloqueio").style.display = "none";
    document.body.classList.add("liberado");
  } else if (result.status === "usado") {
    erro.innerText = "Esse convite já foi utilizado!";
  } else {
    erro.innerText = "Código inválido!";
  }
};
