const btCopiar = document.querySelector("#copiar");
const btGenerar = document.querySelector("#generar");
const txMensaje = document.querySelector("#mensaje");
const tagSmall = document.querySelector("small");

btCopiar.addEventListener("click", () => {
  
  navigator.clipboard.writeText(txMensaje.value)
    .then( () => {
      tagSmall.innerHTML = "Texto copiado al portapapeles";
    })
    .catch(error => {
      tagSmall.innerHTML = "No se pudo copiar al portapapeles";
    });

});