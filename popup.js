//Botones
const btcambio = document.querySelector("#cambio");
const btCopiar = document.querySelector("#copiar");
const btGenerar = document.querySelector("#generar");

//Radio
const opHombre = document.querySelector("#hombre");
const opMujer = document.querySelector("#mujer");

//Select
const slTipoActividad = document.querySelector("#tipo-actividad");
const slApreciacion = document.querySelector("#apreciacion");
const slPuntualidad = document.querySelector("#puntualidad");

const txMensaje = document.querySelector("#mensaje");
const tagSmall = document.querySelector("small");

//Verificando el localStorage
localStorage.clear();
localStorage.getItem("genero") == 'M' ? setMujer() : setHombre();

//Tipo de actividad
localStorage.getItem("tipo-actividad") == null ? setValueSelect("F", slTipoActividad) : setValueSelect(localStorage.getItem("tipo-actividad"), slTipoActividad);

//Configuraciones
function setHombre(){
  opMujer.removeAttribute("checked");
  opHombre.setAttribute("checked", true);
  localStorage.setItem("genero", "H");
}

function setMujer(){
  opHombre.removeAttribute("checked");
  opMujer.setAttribute("checked", true);
  localStorage.setItem("genero", "M");
}

function setValueSelect(valorActivo = ``, objSelect){
  objSelect.value = valorActivo;
}

//Fin de configuraciones

//Eventos
opHombre.addEventListener("click", setHombre);
opMujer.addEventListener("click", setMujer);

slTipoActividad.addEventListener("change", () => {
  localStorage.setItem("tipo-actividad", slTipoActividad.value);
});

btCopiar.addEventListener("click", () => {
  navigator.clipboard.writeText(txMensaje.value)
    .then( () => {
      tagSmall.innerHTML = "Texto copiado al portapapeles";
    })
    .catch(error => {
      tagSmall.innerHTML = "No se pudo copiar al portapapeles";
    });
});

btcambio.addEventListener("click", () => {

});

btGenerar.addEventListener("click", () => {
  
});