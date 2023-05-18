const btCopy = document.querySelector("#textcopy");
const txTexto = document.querySelector("#texto");
const tagSmall = document.querySelector("small");

btCopy.addEventListener("click", () => {
  
  navigator.clipboard.writeText(txTexto.value)
    .then( () => {
      tagSmall.innerHTML = "Texto copiado al portapapeles";
    })
    .catch(error => {
      tagSmall.innerHTML = "No se pudo copiar al portapapeles";
    });

});