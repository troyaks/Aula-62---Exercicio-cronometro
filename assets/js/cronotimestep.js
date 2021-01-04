const timer = document.querySelector('.timer');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const stopIt = document.querySelector('.stopIt');
let startClick = 0;
let pauseClick = 0;
let refreshIntervalID;
let startTime = 0;
let endTime = 0;
let deltaPause = 0;
let timeNow = 0;
let hour = 0;
let minute = 0;
let second = 0;
let milisec = 0;
let zeroTime = "00:00:00:000";
const pauseColor = "rgb(219, 0, 0)";
const defaultColor = "rgb(0, 0, 0)";
const runColor = "rgb(0, 219, 0)"
let timeStep = 10; //You can choose (10,100 or 1000).
// It seems like the browser can not keep running the code while minized if timeStep < 1000.
// The timer does not work correctly if timeStep is 1 (less than 10).
timer.innerHTML = zeroTime;

if (timeStep != 10 && timeStep != 100 && timeStep != 1000) {
    throw new RangeError ("timeStep out of range");
}

start.addEventListener('click', function() {
    if (startClick === 0) {
        startTime = deltaPause;
        refreshIntervalID = setInterval(mainCounting, timeStep);
        startClick++;
        pauseClick = 0;
        timer.style.color = runColor;
    }
});

pause.addEventListener('click', function() {
    if (pauseClick === 0) {
        clearInterval(refreshIntervalID);
        deltaPause = timeNow;
        pauseClick++;
        startClick = 0;
        timer.style.color = pauseColor;
    }
}); 

stopIt.addEventListener('click', function() {
    if (startClick === 1 && pauseClick === 0) {
        clearInterval(refreshIntervalID);
        timer.innerHTML = zeroTime;
        timeNow = 0;
        startTime = 0;
        deltaPause = 0;
        refreshIntervalID = setInterval(mainCounting, timeStep);
    }

    if (startClick === 0 && pauseClick === 1) {
        clearInterval(refreshIntervalID);
        timer.innerHTML = zeroTime;
        timeNow = 0;
        deltaPause = 0;
    }
    timer.style.color = "rgb(0, 0, 0)";
});

function mainCounting() {
    getCurrentTime();
    calcTime();
    organizeToPrint();
    printTime();
}

function getCurrentTime () {
    if (startTime != 0) {
        timeNow = startTime;
        startTime = 0;
    }
    timeNow = timeStep + timeNow;
}

function calcTime() {
    milisec = timeNow;
    second = Math.trunc(timeNow / 1000);
    minute = Math.trunc(timeNow / (60 * 1000));
    hour = Math.trunc(timeNow / (60 * 60 * 1000));

    (second >= 60) ? second = second % 60 : null;
    (minute >= 60) ? minute = minute % 60 : null;
    (milisec >= 1000) ? milisec = timeNow % 1000 : null;
}

function organizeToPrint() {
    (hour<10) ? hour = `0${hour}` : null;
    (minute<10) ? minute = `0${minute}` : null;
    (second<10) ? second = `0${second}` : null;
    (milisec<10) ? milisec = `00${milisec}` : null;
    (milisec>=10 && milisec<100) ? milisec = `0${milisec}` : null;
}

function printTime() {
    if (timeStep === 1000) {
        timer.innerHTML = `${hour}:${minute}:${second}`;
    }

    timer.innerHTML = `${hour}:${minute}:${second}:${milisec}`;
}




