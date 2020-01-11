"use strict"
let main = document.getElementsByClassName("main"); /*Definition globale Variablen*/

let countwindow = 0;
let IntervalID;

let aktuelleVerbrauchswerte = document.createElement("cardata"); //muss global definiert werden, da aus verschiedenen Funtkionen darauf zugegriffen wird!
let currentspeed = document.createElement("currentspeed");
let consumption = document.createElement("consumption");
let temperature = document.createElement("temperature");
let pressure = document.createElement("pressure");
let humidity = document.createElement("humidity");

function startingroutine() {  //bodyonload im html hinterlegt
    startTime();
    home();
}

function startTime() {
    let today = new Date();

    let h = today.getHours();
    let m = today.getMinutes();
    if (m < 10) { m = "0" + m }; //führende Nullen anfügen
    let s = today.getSeconds();
    let month = today.getMonth() + 1;
    if (month < 10) { month = "0" + month };
    let date = today.getDate();
    if (date < 10) { date = "0" + date };
    let year = today.getFullYear();


    document.getElementById('clock').innerHTML =
        date + "." + month + "." + year + " - " + h + ":" + m;
    let t = setTimeout(startTime, 500);
}


function home() {
    clearInterval(IntervalID);
    main[0].style.gridTemplateRows = "auto";
    main[0].style.gridTemplateColumns = "auto";
    main[0].innerHTML = "";

    let welcometext = document.createElement("Div");
    welcometext.id = "welcometext";
    welcometext.innerHTML = "Welcome to your TESLA multimedia controll center";
    main[0].appendChild(welcometext);

    let background = new Image();
    background.src = "https://i.pinimg.com/originals/43/e9/69/43e969979dfd8ae4b364f517571aee58.png";
    main[0].appendChild(background);

    document.getElementById("statustext").innerHTML = "No problems found."
}

function displaycar() {
    
    fetchfordisplaycar();
    IntervalID = setInterval(fetchfordisplaycar, 1500);

    main[0].innerHTML = "";
    main[0].appendChild(aktuelleVerbrauchswerte);
    main[0].appendChild(currentspeed);
    main[0].appendChild(consumption);
    main[0].appendChild(temperature);
    main[0].appendChild(pressure);
    main[0].appendChild(humidity);

    document.getElementById("statustext").innerHTML = "No problems found.";    
}

function fetchfordisplaycar() {

    fetch("http://192.168.0.64:5000/status").then(function (response) {
        response.text().then(function (text) {

            let array = JSON.parse(text);

            aktuelleVerbrauchswerte.innerHTML = "aktuelle Verbrauchswerte";
            currentspeed.innerHTML = "current speed: " + array.speed + " km/h";
            consumption.innerHTML = "consumption: " + Math.round(array.consumption * 100) / 100 + " l/100km";
            temperature.innerHTML = "temperature: " + Math.round(array.temp * 100) / 100 + " °C";
            pressure.innerHTML = "barometric pressure: " + Math.round(array.pressure * 100) / 100 + " mbar";
            humidity.innerHTML = "humidity: " + Math.round(array.humidity * 100) / 100 + " g/m3";

            main[0].style.gridTemplateRows = "repeat(5, 1fr)";
            main[0].style.gridTemplateColumns = "repeat(5, 1fr)";
        })
    })
}

function navigation() {
    clearInterval(IntervalID);
    document.getElementById("statustext").innerHTML = "Where do you want to go next?";
    main[0].style.gridTemplateRows = "auto";
    main[0].style.gridTemplateColumns = "auto";
    main[0].innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d658.3668032436588!2d9.656431814721984!3d48.69655026774794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sde!4v1575901748299!5m2!1sde!2sde" width="100%" height="100%" frameborder="auto" style="border:0;" allowfullscreen=""></iframe>';
}

function music() {
    clearInterval(IntervalID);
    main[0].innerHTML = "";
    main[0].style.gridTemplateRows = "repeat(4, 1fr)";
    main[0].style.gridTemplateColumns = "repeat(5, 1fr)";
    
    let track = 0;

    var currentlyplaying = document.createElement("currentlyplaying"); //Textbaustein
    currentlyplaying.innerHTML = "currently playing:";
    main[0].appendChild(currentlyplaying);

    var playlist = document.createElement("playlist"); //Textbaustein
    playlist.innerHTML = "playlist: ";
    main[0].appendChild(playlist);

    let select = document.createElement("select"); //Dropdown-Liste
    select.id = "mySelect";
    main[0].appendChild(select);

    let currentplay = document.createElement("currentplay"); //Anzeige aktuelle Wiedergabe
    currentplay.id = "currentplay";
    main[0].appendChild(currentplay);

    let play = document.createElement("play");
    play.className = "musicbuttons";
    play.id = "play";
    main[0].appendChild(play);
    play.addEventListener("click", Play);

    let pause = document.createElement("pause");
    pause.className = "musicbuttons";
    pause.id = "pause";
    main[0].appendChild(pause);
    pause.style.display = "none";
    pause.addEventListener("click", Pause);

    let skip = document.createElement("skip");
    skip.className = "musicbuttons";
    main[0].appendChild(skip);

    let previous = document.createElement("previous");
    previous.className = "musicbuttons";
    main[0].appendChild(previous);

    document.getElementById("statustext").innerHTML = "What music do you want to listen to today?."

    fetch('http://192.168.0.64:5000/music').then(function (response) {
        response.text().then(function (musiclist) {

            let musictitle = JSON.parse(musiclist);
            currentplay.innerHTML = musictitle[track].artist + " - " + musictitle[track].title; //Ausgabe zu Programmstart


            for (var i = 0; i < musictitle.length; i++) { //Schleife hinzufügen Optionen zu Select aus array des fetch
                var option = document.createElement("option");
                option.value = musictitle[i].title;
                option.text = musictitle[i].title;
                select.appendChild(option);
            }

            select.addEventListener("change", function () { //Funktion wenn selectfeld geändert wird
                track = this.selectedIndex;
                currentplay.innerHTML = musictitle[track].artist + " - " + musictitle[track].title;
            })

            skip.addEventListener("click", function () { //Funktion zu skip

                if (track < select.length - 1) { //if-Bedingung um Springen über array hinaus zu vermeiden
                    track = track + 1;
                    select.selectedIndex = select.selectedIndex + 1;
                    document.getElementById("currentplay").innerHTML = musictitle[track].artist + " - " + musictitle[track].title;
                }
            })

            previous.addEventListener("click", function () {
                if (track > 0) {
                    track = track - 1;
                    select.selectedIndex = select.selectedIndex - 1;
                    document.getElementById("currentplay").innerHTML = musictitle[track].artist + " - " + musictitle[track].title;

                }
            })
        })
    });    
}

function Play() {
    document.getElementById("play").style.display = "none";
    document.getElementById("pause").style.display = "block";
    document.getElementById("statustext").innerHTML = "The music is playing, my Lord";
}

function Pause() {
    document.getElementById("pause").style.display = "none";
    document.getElementById("play").style.display = "block";
    document.getElementById("statustext").innerHTML = "The music is paused, my Lord";
}

function settings() {
    clearInterval(IntervalID);
    main[0].innerHTML = "";
    document.getElementById("statustext").innerHTML = "No problems found.";
    main[0].style.gridTemplateRows = "repeat(5, 1fr)";
    main[0].style.gridTemplateColumns = "repeat(7, 1fr)";
    main[0].innerHTML = "Settings"

    /* Anlegen aller Buttons im DOM*/
    let lockbutton = document.createElement("button");
    lockbutton.id = 'lock';
    lockbutton.className = "actionbuttons";
    lockbutton.innerHTML = "lock";
    main[0].appendChild(lockbutton);
    lockbutton.addEventListener("click", lock);
    lockbutton.style.display = "block";

    let unlockbutton = document.createElement("button");
    unlockbutton.id = 'unlock';
    unlockbutton.className = "actionbuttons";
    unlockbutton.innerHTML = "unlock";
    main[0].appendChild(unlockbutton);
    unlockbutton.addEventListener("click", unlock);
    unlockbutton.style.display = "none";

    let openleft = document.createElement("button");
    openleft.innerHTML = "open left window";
    openleft.id = "openleft";
    openleft.className = "actionbuttons";
    main[0].appendChild(openleft);
    openleft.addEventListener("click", openLeft);

    let closeleft = document.createElement("button");
    closeleft.innerHTML = "close left window";
    closeleft.id = "closeleft";
    closeleft.className = "actionbuttons";
    closeleft.style.display = "none";
    main[0].appendChild(closeleft);
    closeleft.addEventListener("click", closeLeft);

    let openright = document.createElement("button");
    openright.innerHTML = "open right window";
    openright.id = "openright";
    openright.className = "actionbuttons";
    main[0].appendChild(openright);
    openright.addEventListener("click", openRight);

    let closeright = document.createElement("button");
    closeright.innerHTML = "close right window";
    closeright.id = "closeright";
    closeright.className = "actionbuttons";
    closeright.style.display = "none";
    main[0].appendChild(closeright);
    closeright.addEventListener("click", closeRight);

    let openall = document.createElement("button");
    openall.innerHTML = "open all windows";
    openall.id = "openall";
    openall.className = "actionbuttons";
    main[0].appendChild(openall);
    openall.addEventListener("click", openAll);

    let closeall = document.createElement("button");
    closeall.innerHTML = "close all windows";
    closeall.id = "closeall"
    closeall.className = "actionbuttons"
    closeall.style.display = "none";
    main[0].appendChild(closeall);
    closeall.addEventListener("click", closeAll);
}

function lock() {
    document.getElementById("unlock").style.display = "block";
    document.getElementById("lock").style.display = "none";
    fetch('http://192.168.0.64:5000/action/lock');
    document.getElementById("statustext").innerHTML = "The car is locked, my Lord";
}

function unlock() {
    document.getElementById("lock").style.display = "block";
    document.getElementById("unlock").style.display = "none";
    fetch('http://192.168.0.64:5000/action/unlock');
    document.getElementById("statustext").innerHTML = "The car is unlocked, my Lord";
}

function openLeft() {
    document.getElementById("openleft").style.display = "none";
    document.getElementById("closeleft").style.display = "block";
    fetch('http://192.168.0.64:5000/action/windowdown');
    document.getElementById("statustext").innerHTML = "I opened the left window, my Lord"
    countwindow = countwindow + 1
    checkcountwindow();
}

function closeLeft() {
    document.getElementById("openleft").style.display = "block";
    document.getElementById("closeleft").style.display = "none";
    fetch('http://192.168.0.64:5000/action/windowup');
    document.getElementById("statustext").innerHTML = "I closed the left window, my Lord";
    countwindow = countwindow - 1;
    checkcountwindow();
}

function openRight() {
    document.getElementById("openright").style.display = "none";
    document.getElementById("closeright").style.display = "block";
    fetch('http://192.168.0.64:5000/action/windowdown');
    document.getElementById("statustext").innerHTML = "I opened the right window, my Lord";
    countwindow = countwindow + 1;
    checkcountwindow();
}

function closeRight() {
    document.getElementById("openright").style.display = "block";
    document.getElementById("closeright").style.display = "none";
    fetch('http://192.168.0.64:5000/action/windowup');
    document.getElementById("statustext").innerHTML = "I closed the right window, my Lord";
    countwindow = countwindow - 1;
    checkcountwindow();
}

function openAll() {
    document.getElementById("openright").style.display = "none";
    document.getElementById("openleft").style.display = "none";
    document.getElementById("openall").style.display = "none";
    document.getElementById("closeright").style.display = "block";
    document.getElementById("closeleft").style.display = "block";
    document.getElementById("closeall").style.display = "block";
    fetch('http://192.168.0.64:5000/action/windowdown');
    document.getElementById("statustext").innerHTML = "I opened all windows, my Lord";
    countwindow = countwindow + 2;
}

function closeAll() {
    document.getElementById("openright").style.display = "block";
    document.getElementById("openleft").style.display = "block";
    document.getElementById("openall").style.display = "block";
    document.getElementById("closeright").style.display = "none";
    document.getElementById("closeleft").style.display = "none";
    document.getElementById("closeall").style.display = "none";
    fetch('http://192.168.0.64:5000/action/windowup');
    document.getElementById("statustext").innerHTML = "I closed all windows, my Lord";
    countwindow = countwindow - 2;

}

function checkcountwindow() { //Funktion zählt Anzahl offene Fenster
    if (countwindow == 2) {
        openall.style.display = "none";
        closeall.style.display = "block";
    } else if (countwindow == 0) {
        openall.style.display = "block";
        closeall.style.display = "none";
    } else {
        openall.style.display = "none";
        closeall.style.display = "none";
    }
}