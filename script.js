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
    
}