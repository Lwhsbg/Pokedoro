var currentMode = "study";
var timeLeft = 25 * 60;
var timerInterval = null;
var totalXP = Number(localStorage.getItem("pokemonXP")) || 0;
var sessions = Number(localStorage.getItem("pokemonSessions")) || 0;
function getPokemonStage() {
    if (totalXP>=250) {
        return {
            name:"Charizard",
            image: "charizard.jpg",
            level: 3,
            nextXP: 250,
            previousXP: 250
        };
    }
    else if (totalXP >= 100) {
        return {
            name: "Charmeleon",
            image: "charmeleon.jpg",
            level: 2,
            nextXP: 250,
            previousXP: 100
        };
    }
    else{
        return{
            name: "Charmander",
            image: "charmander.jpg",
            level: 1,
            nextXP: 100,
            previousXP: 0
        };
    }
}
function updatePokemon() {
    var pokemon = getPokemonStage();
    document.getElementById("pokemonName").innerHTML = pokemon.name;
    document.getElementById("pokemonImage").src = pokemon.image;
    document.getElementById("pokemonLevel").innerHTML = "Level " + pokemon.level;
    document.getElementById("totalXP").innerHTML = totalXP;
    document.getElementById("sessions").innerHTML = sessions;
    var progress = 0;
    if (totalXP >= 250) {
        progress = 100;
        document.getElementById("evolutionText").innerHTML = "Your little guy reached his final form...maybe?";
    }
    else {
        progress = ((totalXP - pokemon.previousXP) / (pokemon.nextXP - pokemon.previousXP)) * 100;
           document.getElementById("evolutionText").innerHTML = (pokemon.nextXP - totalXP) + "remaining XP till next stage.";
    }
    document.getElementById("xpText").innerHTML = totalXP + " Total XP";
    document.getElementById("xpProgress").style.width = progress + "%";
}
function updateTimer() {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    document.getElementById("timer").innerHTML = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}
function setMode(mode) {
    if (timerInterval !== null) {
        return;
    }
    currentMode = mode;
    if (currentMode == "study") {
        timeLeft = 25 * 60;
        document.getElementById("status").innerHTML = "Lock-in gng.";
    }
    else{
        timeLeft = 5 * 60;
        document.getElementById("status").innerHTML = "Break?? alright.";
    }
    updateTimer();
}
function startTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("startButton").innerHTML = "Start";
        return;
    }
    document.getElementById("startButton").innerHTML = "Pause";
    timerInterval = setInterval(function(){
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            finishSession();
        }

    }, 1000);
}
function finishSession() {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("startButton").innerHTML = "Start";
    if (currentMode == "study") {
        var oldPokemon = getPokemonStage().name;
        totalXP = totalXP + 25;
        sessions++;
        localStorage.setItem("pokemonXP", totalXP);
        localStorage.setItem("pokemonSessions", sessions);
        var newPokemon = getPokemonStage().name;
        if (oldPokemon !== newPokemon){
            document.getElementById("status").innerHTML = "Wow vro really locked in here, charmander is " + newPokemon + "now.";
        }
        else{
            document.getElementById("status").innerHTML = "Lock-in complete, you earned 25 XP.";
        }
        updatePokemon();
    }
    else{
        document.getElementById("status").innerHTML = "Break completed, if you take another one you are a bum.";
    }
    timeLeft = currentMode == "study" ? 25 * 60 : 5 * 60;
    updateTimer();
}
function resetTimer(){
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("startButton").innerHTML = "Start";
    if (currentMode == "study") {
        timeLeft = 25 * 60;
    }
    else{
        timeLeft = 5 * 60;
    }
    document.getElementById("status").innerHTML = "I reset the timer. Now come again if you wanna succeed in life.";
    updateTimer();
}