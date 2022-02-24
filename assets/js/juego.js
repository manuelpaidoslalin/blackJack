

let deck =[];

const tipos =['C','H','D','S'];
const espec =['A','J','Q','K']

let puntosJugador = 0,
    puntosComputadora = 0;



// referencias HtML

const btnPedir           = document.querySelector('#btnPedir');
const btnNuevoJuego      = document.querySelector('#btnNuevo');    
const btnDetener         = document.querySelector('#btnDetener');        // crea referencia del boton Detener
const puntosHTML         = document.querySelectorAll('small');           // crea el array de referencia para el marcador
const divCartaJugador    = document.querySelector("#jugador-cartas");    // crea la referencia de la carta
const divCartaComputadora= document.querySelector("#computadora-cartas");    // crea la referencia de la carta


// Esta función crea una nueva baraja

const crearDeck =() => {

    for(let i=2;i<=10;i++){
        for (let tipo of tipos) {
            
            deck.push(i+tipo);
        }

    }


    for(let tipo of tipos){

        for (let esp of espec) {
            
            deck.push(esp+tipo);
        }

    }


    // console.log(deck);

    deck = _.shuffle(deck);

    console.log(deck);

    return deck;

}



crearDeck();

// Esta funcion toma una carta de la baraja


const pedirCarta = () => {

    if (deck.length === 0){
        throw 'no hay cartas';
    }

    const carta =deck.pop();
    

    return carta

}

// pedirCarta();

const valorCarta=(carta) =>{

    const valor=carta.substring(0,carta.length-1);
   
   
    return (isNaN(valor))?(valor==='A')?11:10:+valor;


}


const turnoComputadora=(puntosMinimos) => {

    do{

        const carta = pedirCarta();
    
        puntosComputadora= puntosComputadora + valorCarta ( carta );    // incrementa el valor del contador
    
       puntosHTML[1].innerText = puntosComputadora                  // actualiza el marcador del jugador
    
       const imgCarta = document.createElement('img');          // creamos elemento contenedor de la carta
    
       imgCarta.src=`assets/cartas/${carta}.png`;               // Y ahora le designamos la ruta del valor de la carta en este momento
    
        imgCarta.classList.add('carta');                        // añade la classe para que aparezca bonito
    
        divCartaComputadora.append(imgCarta);                   // añadimos el contenedor con la imagen de la carta

        if (puntosMinimos > 21 ) {
            break;
        }

    }while(puntosComputadora<puntosMinimos && puntosMinimos <=21)

    setTimeout(() => {
        
    if (puntosComputadora===puntosMinimos ){alert('has empatado');
    }
    else if (puntosMinimos>21 ){ alert('has perdido');
    }
    else if (puntosComputadora>21) { alert ('has ganado') ;
    }
    else ('computadora gana');

}, 200);
}


// eventos


btnPedir.addEventListener('click',() => {

    const carta = pedirCarta();

    puntosJugador= puntosJugador + valorCarta ( carta );    // incrementa el valor del contador

   puntosHTML[0].innerText = puntosJugador                  // actualiza el marcador del jugador

   const imgCarta = document.createElement('img');          // creamos elemento contenedor de la carta

   imgCarta.src=`assets/cartas/${carta}.png`;               // Y ahora le designamos la ruta del valor de la carta en este momento

    imgCarta.classList.add('carta');                        // añade la classe para que aparezca bonito

    divCartaJugador.append(imgCarta);                       // añadimos el contenedor con la imagen de la carta

    if (puntosJugador>21){
        console.warn('te has pasado');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    else if (puntosJugador===21){
        console.warn('21, genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    }

});


btnDetener.addEventListener('click',() => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

});


btnNuevoJuego.addEventListener('click',() => {

    deck =[];

    console.clear();

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosJugador = 0,
    puntosComputadora = 0;
    crearDeck();

    puntosHTML[0].innerText=0;
    puntosHTML[1].innerText=0;

    divCartaComputadora.innerHTML = '';
    divCartaJugador.innerHTML ='';

});


