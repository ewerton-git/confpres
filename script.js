
function abrirModal() {
document.getElementById("modalForm").style.display = "block";
}

function fecharModal() {
 document.getElementById("modalForm").style.display = "none";
} 

// fechar clicando fora
window.onclick = function(event) {
const modal = document.getElementById("modalForm");
if (event.target === modal) {
 modal.style.display = "none";
    }
}

function mostrarFormulario() {
      const form = document.getElementById("formulario");
      form.style.display = "block";
      setTimeout(() => {
        form.style.opacity = "1";
       }, 50); 
    }