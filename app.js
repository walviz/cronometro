const cronometro = document.getElementById('cronometro');
const btnInicioPausa = document.getElementById('boton-inicio-pausa');
const btnReiniciar = document.getElementById('boton-reiniciar');


let [ horas , minutos , segundos ]=[ 0 , 0 , 0 ];
let intervaloDeTiempo;
let estadoCronometro=false;//false es pausado

function actualizarCronometro(){
  segundos++;
  if(segundos/60 === 1){
    segundos = 0;
    minutos++;
    if(minutos / 60 === 1){
      minutos=0;
      horas++;
    }
  }

  const segundosConFormato = asignarFormato(segundos);
  const minutosConFormato =asignarFormato(minutos);
  const horasConFormato =asignarFormato(horas);

  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;

}


function asignarFormato(unidadDetiempo){
  //si unidad de tiempo es menor que dies retornar 0, else devuelve solo la unidad de tiempo, es para asignar el cero al comienzo
  return unidadDetiempo < 10 ? '0'+ unidadDetiempo : unidadDetiempo;
}

//inicio y pausa
btnInicioPausa.addEventListener('click',()=>{
  //se verifica estado del cronometro
  if(!estadoCronometro){
    //window.setInterval== es para llamar a la funcion actualizarCronometro cada segundo
    intervaloDeTiempo = window.setInterval(actualizarCronometro,1000);
    //se cambia el icono del btn
    btnInicioPausa.innerHTML='<i class="bi bi-pause"></i>';
    //se remueve la clase iniciar
    btnInicioPausa.classList.remove('iniciar');
    //asignar clase pausar
    btnInicioPausa.classList.add('pausar');
    //se cambia estado para que no llame a la funcion window.setInterval cada vez que se unde pause
    estadoCronometro=true;// true es andando
  }else{
    //pausa el cronometro cambia icono a play y estado a false del cronometro
    window.clearInterval(intervaloDeTiempo);
    btnInicioPausa.innerHTML='<i class="bi bi-play-fill">';
    btnInicioPausa.classList.remove('pausar');
    btnInicioPausa.classList.add('iniciar');
    estadoCronometro=false;
  }
})


btnReiniciar.addEventListener('click',()=>{
  //se detiene la funcion con el intervalo
  window.clearInterval(intervaloDeTiempo);
  segundos=0;
  minutos=0;
  horas=0;
  cronometro.innerText=`00:00:00`;
  estadoCronometro=false;
  btnInicioPausa.innerHTML='<i class="bi bi-play-fill">';
  btnInicioPausa.classList.remove('pausar');
  btnInicioPausa.classList.add('iniciar');
});