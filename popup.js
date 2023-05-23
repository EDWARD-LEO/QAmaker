//Botones
//const btcambio = document.querySelector("#cambio");
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
const totalPalabras = document.querySelector("#totalpalabras");
const tagSmall = document.querySelector("small");

//Verificando el localStorage 
//localStorage.clear();
localStorage.getItem("genero") == 'M' ? setMujer() : setHombre();

//Tipo de actividad
localStorage.getItem("tipo-actividad") == null ? setValueSelect("forotematico", slTipoActividad) : setValueSelect(localStorage.getItem("tipo-actividad"), slTipoActividad);

//Fin de configuración localstorage
localStorage.getItem("apreciacion") == null ? setValueSelect("bueno", slApreciacion) : setValueSelect(localStorage.getItem("apreciacion"), slApreciacion);

//Configuraciones
function setHombre(){
  opMujer.removeAttribute("checked");
  opHombre.setAttribute("checked", true);
  localStorage.setItem("genero", "H");
  cargaComentario();
}

function setMujer(){
  opHombre.removeAttribute("checked");
  opMujer.setAttribute("checked", true);
  localStorage.setItem("genero", "M");
  cargaComentario();
}

function setValueSelect(valorActivo = ``, objSelect){
  objSelect.value = valorActivo;
}

function generarAleatorio(max){
  return Math.floor(Math.random() * (max - 0 + 1)) + 0;
}

function cargaComentario(){
  let saludo = `Estimado estudiante.`;
  let descripPuntualidad = ``;
  let rndPuntualidad = 0;
  let rndLista = 0;
  let comentarioGenerado = ``;

  txMensaje.textContent = ``;
  tagSmall.textContent = ``;

  fetch(`./data.json`)
    .then(respuesta => respuesta.json())
    .then(datos => {

      const lista = datos["tipoactividad"][slTipoActividad.value][slApreciacion.value];

      if (localStorage.getItem("genero") == 'M'){
        saludo = `Estimada estudiante.`
      }

      if (slPuntualidad.value == "A") {
        rndPuntualidad = generarAleatorio(datos["puntualidad"]["atrasado"].length - 1);
        descripPuntualidad = datos["puntualidad"]["atrasado"][rndPuntualidad]
      }

      rndLista = generarAleatorio(lista.length - 1);
      comentarioGenerado = `${saludo} ${lista[rndLista]} ${descripPuntualidad}` 
      txMensaje.textContent = comentarioGenerado;
      totalPalabras.textContent = comentarioGenerado.split(` `).length;
    })
}

//Fin de configuraciones

//Eventos
opHombre.addEventListener("click", setHombre);
opMujer.addEventListener("click", setMujer);

//Lista para [Tipo de actividad]
slTipoActividad.addEventListener("change", () => {
  //Asignando valor por defecto
  localStorage.setItem("tipo-actividad", slTipoActividad.value);

  if (slTipoActividad.value === "participacion"){
    slPuntualidad.value = "N";  //No aplica
    slPuntualidad.setAttribute("disabled", true);
  }else{
    slPuntualidad.value = "T";
    slPuntualidad.removeAttribute("disabled");
  }
  
  cargaComentario();
});

//Lista para la [Apreciación]
slApreciacion.addEventListener("change", () => {
  localStorage.setItem("apreciacion", slApreciacion.value);
  cargaComentario();
});

//Lista para [Puntualidad]
slPuntualidad.addEventListener("change", () => {
  cargaComentario();
});

//Copiar contenido al portapapeles
btCopiar.addEventListener("click", () => {
  navigator.clipboard.writeText(txMensaje.value)
    .then( () => {
      tagSmall.innerHTML = "Texto copiado al portapapeles";
    })
    .catch(error => {
      tagSmall.innerHTML = "No se pudo copiar al portapapeles";
    });
});

//Generar nuevos comentarios
btGenerar.addEventListener("click", cargaComentario);