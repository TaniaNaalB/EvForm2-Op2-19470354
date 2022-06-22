let baraja = [];
let carta;
let totalPuntosJugador = 0;
let totalPuntosComputadora = 0;
//declarar cuando se realice crearbaraja()
const letrasss = ['J','Q','K','A'];

//limpio
function crearbaraja(){
    baraja=[];
    const numeros = [2, 3, 4, 5, 6, 7 ,8, 9 ,10];
    const letras = ['J','Q','K','A'];
    const palo = ['C', 'D', 'H', 'S'];

    for (const n of numeros) {
        for(const p of palo){
            baraja.push(n + p);
        }
    }

    letras.forEach((l)=> {
        palo.forEach((p)=> {
            baraja.push(l + p);
        })
    })

    baraja = _.shuffle(baraja);
    console.log(baraja);
}

//poner la propiedad cuando se pónga la primera linea
function valor(carta){
    let valorCarta = carta.substring(0, carta.length - 1);

    if(letrasss.includes(valorCarta)){
              return valorCarta === 'A' ? 11 : 10;
    }else {
        return parseInt (valorCarta);
    }
}
//poner el turnocomputadora hasta el final
function turnoJugador(){
    carta = baraja.shift();
    $('#cartasJugador').html($('#cartasJugador').html() + `<img src='./cartas/${carta}.png'>`); 
    totalPuntosJugador += valor(carta);
    $('#puntosJugador').text(totalPuntosJugador);
    if( totalPuntosJugador > 21){
        $('#btn-card').attr('disabled', 'true');
        $('#btn-stop').attr('disabled', 'true');
        turnoComputadora();
    }
}
//limpio
$('#btn-card').click(function(){
    turnoJugador();
});

//checar si el id esta correcto
function mensajeJugador(mensajeJugador){
    $('#mensajeGanador').text(mensajeJugador)
    $('#mensajeGanador').removeClass('hidden');
}


//asegurarse si ya se declaro la funcion del mensaje
function turnoComputadora(){
    let ganaJugador = true;
    $('#mensajeGanador').addClass('lose');
    do{
        carta = baraja.shift();
        $('#cartasComputadora').html($('#cartasComputadora').html() + `<img src='./cartas/${carta}.png'>`); 
        totalPuntosComputadora += valor(carta);
        $('#puntosComputadora').text(totalPuntosComputadora);
        if(totalPuntosJugador > 21){
            ganaJugador = false;
            mensajeJugador(ganaJugador ? 'El jugador gano' : 'La computadora gana');
            console.log(ganaJugador);
            break;
        }
        
    }while(totalPuntosComputadora <= 21 && totalPuntosComputadora < totalPuntosJugador);
    
    if(totalPuntosComputadora <= 21 && totalPuntosComputadora >= totalPuntosComputadora){
        
        ganaJugador = false;
        mensajeJugador(ganaJugador ? 'El jugador gano' : 'La computadora gana');
        
    }
    mensajeJugador(ganaJugador ? 'El jugador gano' : 'La computadora gana');
    
    if(ganaJugador){
        $('#mensajeGanador').removeClass('lose');
        $('#mensajeGanador').addClass('win');
    }
}

$('#btn-stop').click(function(){
    $('#btn-card').attr('disabled', 'true');
    $('#btn-stop').attr('disabled', 'true');
    turnoComputadora();
    
});

//limpio
function nuevoJuego(){
    $('#cartasJugador').html('');
    $('#cartasComputadora').html('');
    console.clear();   
    crearbaraja();
    totalPuntosJugador = 0;
    totalPuntosComputadora = 0;
    $('#puntosJugador').text(totalPuntosJugador);
    $('#puntosComputadora').text(totalPuntosComputadora);
    $('#btn-card').removeAttr('disabled');
    $('#btn-stop').removeAttr('disabled');
    $('#mensajeGanador').addClass('hidden');
}

$('#btn-new').click(function(){
    nuevoJuego();
});
//ultima linea
crearbaraja();
