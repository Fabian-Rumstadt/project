"use strict"
function startingroutine() {
    startTime();
    home();
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var year = today.getFullYear()
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('clock').innerHTML =
        date + "." + month + "." + year + " - " + h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function lock() {
    document.getElementById("unlock").style.display = "block"
    document.getElementById("lock").style.display = "none"

    fetch('http://192.168.0.64:5000/action/lock')
        .then(console.log("done."));
}

function unlock() {
    document.getElementById("lock").style.display = "block"
    document.getElementById("unlock").style.display = "none"

    fetch('http://192.168.0.64:5000/action/unlock')
        .then(console.log("done."));
}


function openLeft() {
    document.getElementById("openleft").style.display = "none";
    document.getElementById("closeleft").style.display = "block";
}

function closeLeft() {
    document.getElementById("openleft").style.display = "block";
    document.getElementById("closeleft").style.display = "none";
}

function openRight() {
    document.getElementById("openright").style.display = "none";
    document.getElementById("closeright").style.display = "block";
}

function closeRight() {
    document.getElementById("openright").style.display = "block";
    document.getElementById("closeright").style.display = "none";
}
/*function openall() {
    document.getElementById("cl").type = "button";
    document.getElementById("cr").type = "button";
    document.getElementById("ca").type = "button";
    document.getElementById("oa").type = "hidden";
    document.getElementById("or").type = "hidden";
    document.getElementById("ol").type = "hidden";
}

function closeall() {
    document.getElementById("cl").type = "hidden";
    document.getElementById("cr").type = "hidden";
    document.getElementById("ca").type = "hidden";
    document.getElementById("oa").type = "button";
    document.getElementById("or").type = "button";
    document.getElementById("ol").type = "button";
}



/*if (document.getElementById("ol").type = visible)
{document.getElementById("oa").type == "button"}
else {document.getElementById("oa").type == "hidden"}*/

var main = document.getElementsByClassName("main")

function displaycar() {
    main[0].innerHTML = "";

    fetch("http://192.168.0.64:5000/status").then(function (response) {
        response.text().then(function (text) {
            //console.log(text);

            var array = JSON.parse(text)
            console.log(array);




            var aktuelleVerbrauchswerte = document.createElement("div1") //div erzeugen
            var currentspeed = document.createElement("div2")
            var consumption = document.createElement("div3")

            var temperature = document.createElement("div4")
            var pressure = document.createElement("div5")
            var humidity = document.createElement("div6")

            var text1 = document.createTextNode("aktuelle Verbrauchswerte")
            var text2 = document.createTextNode("current speed: " + array.speed)
            var text3 = document.createTextNode("consumption: " + array.consumption)
            var text4 = document.createTextNode("temperature: " + Math.round(array.temp))
            var text5 = document.createTextNode("barometric pressure: " + Math.round(array.pressure))
            var text6 = document.createTextNode("humidity: " + Math.round(array.humidity))


            aktuelleVerbrauchswerte.appendChild(text1)
            currentspeed.appendChild(text2)
            consumption.appendChild(text3)
            temperature.appendChild(text4)
            pressure.appendChild(text5)
            humidity.appendChild(text6)


            main[0].appendChild(aktuelleVerbrauchswerte)
            main[0].appendChild(currentspeed)
            main[0].appendChild(consumption)
            main[0].appendChild(temperature)
            main[0].appendChild(pressure)
            main[0].appendChild(humidity)



            main[0].style.gridTemplateRows = "repeat(5, 1fr)";
            main[0].style.gridTemplateColumns = "repeat(5, 1fr)";


            /*main[0].style.gridTemplateRows = "5% 5% 5% 5% 5% 5%";*/
        })


    });
}

function music() {



    fetch('http://192.168.0.64:5000/music').then(function (response) {
        response.text().then(function (musiclist) {
            //console.log(musiclist);

            var musictitle = JSON.parse(musiclist)
            console.log(musictitle[0]);


            main[0].innerHTML = ""
            var div7 = document.createElement("div7")
            var text7 = document.createTextNode("Insert music playser here" + musictitle[0].artist)
            div7.appendChild(text7)
            main[0].appendChild(div7)

        })
    });
}




function settings() {
    main[0].style.gridTemplateRows = "repeat(5, 1fr)"
    main[0].style.gridTemplateColumns = "repeat(7, 1fr)"

    main[0].innerHTML = ""
    main[0].innerHTML = "Settings"

    var lockbutton = document.createElement("button")
    lockbutton.id = 'lock'
    lockbutton.innerHTML = "lock"
    main[0].appendChild(lockbutton)
    lockbutton.addEventListener("click", lock)
    lockbutton.style.display = "block";

    var unlockbutton = document.createElement("button")
    unlockbutton.id = 'unlock'
    unlockbutton.innerHTML = "unlock"
    main[0].appendChild(unlockbutton)
    unlockbutton.addEventListener("click", unlock)
    unlockbutton.style.display = "none";

    var openleft = document.createElement("button");
    openleft.innerHTML = "open left window";
    openleft.id = "openleft";
    main[0].appendChild(openleft)
    openleft.addEventListener("click", openLeft)

    var closeleft = document.createElement("button");
    closeleft.innerHTML = "close left window"
    closeleft.id = "closeleft"
    closeleft.style.display = "none";
    main[0].appendChild(closeleft)
    closeleft.addEventListener("click", closeLeft)

    var openright = document.createElement("button");
    openright.innerHTML = "open right window";
    openright.id = "openright"
    main[0].appendChild(openright)
    openright.addEventListener("click", openRight)

    var closeright = document.createElement("button");
    closeright.innerHTML = "close right window";
    closeright.id = "closeright"
    closeright.style.display = "none";
    main[0].appendChild(closeright)
    closeright.addEventListener("click", closeRight)
}

function navigation() {
    main[0].style.gridTemplateRows = "auto"
    main[0].style.gridTemplateColumns = "auto"
    main[0].innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d658.3668032436588!2d9.656431814721984!3d48.69655026774794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sde!4v1575901748299!5m2!1sde!2sde" width="100%" height="100%" frameborder="auto" style="border:0;" allowfullscreen=""></iframe>'

}

var background = new Image()
background.src = "https://i.pinimg.com/originals/43/e9/69/43e969979dfd8ae4b364f517571aee58.png"


function home() {
    main[0].style.gridTemplateRows = "auto"
    main[0].style.gridTemplateColumns = "auto"
    main[0].innerHTML = ""
    var welcometext = document.createElement("Div");
    welcometext.id = "welcometext";
    welcometext.innerHTML = "Welcome to your TESLA multimedia controll center";


    main[0].appendChild(welcometext);

    main[0].appendChild(background);
}