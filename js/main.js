
let numbers = []

for (let i = 1; i <= 8; i++) {
    numbers.push(i)
    numbers.push(i)
}

numbers = numbers.sort(()=>{return Math.random()-0.5})
console.log(numbers)


let tarjetasAbiertas = 0
let card1 = null
let card2 = null
let primerResultado = null
let segundoResultado = null
let movimientos = 0
let aciertos = 0
let temporizador = false
let timer = 40
let tiempoRegresivo = null
let timerInicial = 40


//apuntando a HTML

let mostrarMovimientos = document.querySelector('#movimientos')
let mostrarAciertos = document.querySelector('#aciertos')
let mostrarTiempo = document.querySelector('#temporizador')

function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        timer--
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`
        if (timer == 0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas()
        }
    },1000)

}

function bloquearTarjetas(){
    for (let i; 0<=15; i++){
        let tarjetaBloqueada = document.querySelector(i)
        tarjetaBloqueada.innerHTML = numbers[i]
        tarjetaBloqueada.disabled = true
    }
}
//funcion principal
function abrir(id){

    if(temporizador == false){
        contarTiempo()
        temporizador = true
    }
    
    tarjetasAbiertas++
    console.log(tarjetasAbiertas)

    if(tarjetasAbiertas == 1){
        card1 = document.getElementById(id)
        primerResultado = numbers[id]
        card1.innerHTML = primerResultado

            //deshabilitar primer boron
        card1.disabled = true

    }else if(tarjetasAbiertas == 2){
        card2 = document.getElementById(id)
        segundoResultado = numbers[id]
        card2.innerHTML = segundoResultado

        card2.disabled = true

        //incrementar movimientos
        movimientos++
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`

        if(primerResultado == segundoResultado){

            tarjetasAbiertas = 0

            aciertos++
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`

            if(aciertos==8){
                clearInterval(tiempoRegresivo)
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🎉`
                mostrarTiempo.innerHTML = `¡Felicidades! solo tardaste ${timerInicial-timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🥵`

            }
        }else {
            //mostrar las cards momentaneamente
            setTimeout(()=>{
                card1.innerHTML = ' '
                card2.innerHTML = ' '
                card1.disabled = false
                card2.disabled = false
                tarjetasAbiertas = 0
            },800)
        }
            
        
    }




}
