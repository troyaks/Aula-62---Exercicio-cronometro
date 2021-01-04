const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
let startClick = 0;
let pauseClick = 0;
let refreshIntervalID;
let startTime = 0;
let endTime = 0;
let deltaPause = 0;
const zeroTime = "00:00:00";
relogio.innerHTML = zeroTime;

iniciar.addEventListener('click', function() {
    if (startClick === 0) {
        startTime = getTime();
        startTime = startTime - deltaPause;
        refreshIntervalID = setInterval(counting, 1000, startTime);
        startClick++;
        pauseClick = 0;
    }
});

pausar.addEventListener('click', function() {
    if (pauseClick === 0) {
        clearInterval(refreshIntervalID);
        deltaPause = Math.round(endTime - startTime);  
        pauseClick++;
        startClick = 0;
    }
}); 

zerar.addEventListener('click', function() {
    if (startClick === 1 && pauseClick === 0) {
        clearInterval(refreshIntervalID);
        relogio.innerHTML = zeroTime;
        deltaPause = 0;
        startTime = getTime();
        refreshIntervalID = setInterval(counting, 1000, startTime);
    }

    if (startClick === 0 && pauseClick === 1) {
        clearInterval(refreshIntervalID);
        relogio.innerHTML = zeroTime;
        deltaPause = 0;
    }
});

function counting(startTime) {
    let timeNow = getTime();
    endTime = getTime();
    let tempoDecorrido = timeNow - startTime;
    t = calculaHorario(tempoDecorrido);
    showTime(t);
}

function getTime() {
    let timeNow = Math.round(new Date() / 1000);
    return timeNow;
}

function calculaHorario(t) {
    minuto = Math.trunc(t / 60);
    hora = Math.trunc(t / 3600);

    if (t >= 60) {
        segundo = t % 60;
    }
    else {
        segundo = t;
    }

    if (minuto >= 60) {
        minuto = minuto % 60;
    }

    return [hora,minuto,segundo];
}

function showTime(t) {
    hora = t[0];
    minuto = t[1];
    segundo = t[2];

    if (hora<10 && minuto<10 && segundo<10)
    {
        relogio.innerHTML = `0${hora}:0${minuto}:0${segundo}`;
    }
    if (hora<10 && minuto<10 && segundo>=10) {
        relogio.innerHTML = `0${hora}:0${minuto}:${segundo}`;
    }
    if (hora<10 && minuto>=10 && segundo>=10) {
        relogio.innerHTML = `0${hora}:${minuto}:${segundo}`;
    }
    if (hora>=10 && minuto>=10 && segundo>=10) {
        relogio.innerHTML = `${hora}:${minuto}:${segundo}`;
    }
    if (hora>=10 && minuto>=10 && segundo<10) {
        relogio.innerHTML = `${hora}:${minuto}:0${segundo}`;
    }
    if (hora>=10 && minuto<10 && segundo<10) {
        relogio.innerHTML = `${hora}:0${minuto}:0${segundo}`;
    }
    if (hora<10 && minuto>=10 && segundo<10) {
        relogio.innerHTML = `0${hora}:${minuto}:0${segundo}`;
    }
    if (hora>=10 && minuto<10 && segundo>=10) {
        relogio.innerHTML = `${hora}:0${minuto}:${segundo}`;
    }
}





