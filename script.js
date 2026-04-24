console.log("SCRIPT CARREGOU");

function abrirModal() {
  const codigo = sessionStorage.getItem("codigoUsuario");

  if (!codigo) {
    alert("Digite seu código primeiro!");
    return;
  }

  const iframe = document.getElementById("formFrame");

  if (!iframe) {
    alert("Erro: iframe não encontrado");
    return;
  }

  iframe.src = `https://docs.google.com/forms/d/e/1FAIpQLSfiRWNlOwYRm4AuqKZOtq2G86j2ey-VVPlBOb8VC8QVZfPlrA/viewform?usp=pp_url&entry.335578477=${codigo}`;

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
  const acesso = sessionStorage.getItem("acessoLiberado");
  const codigo = sessionStorage.getItem("codigoUsuario");

  if (acesso === "true" && codigo) {
    document.getElementById("bloqueio").style.display = "none";
  } else {
    sessionStorage.clear(); // limpa qualquer acesso anterior para evitar problemas
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

  script.src = `https://script.google.com/macros/s/AKfycbz_3GKu6TX-qc96UnkyZe7n8pGml_snO6vvD1yas0o4inCV27HqWPew5cZsp0W67xYQ/exec?codigo=${codigo}&callback=callbackValidacao`;

  document.body.appendChild(script);
}

window.callbackValidacao = function (result) {
  const erro = document.getElementById("erroCodigo");
  const codigoDigitado = document.getElementById("codigoInput").value;

  if (result.status === "ok") {
    sessionStorage.setItem("acessoLiberado", "true");
    sessionStorage.setItem("codigoUsuario", codigoDigitado); // salva o código do usuário para uso futuro

    document.getElementById("bloqueio").style.display = "none";
    document.body.classList.add("liberado");
  } else if (result.status === "usado") {
    erro.innerText = "Convite já utilizado!";
  } else {
    erro.innerText = "Código inválido!";
  }
};
