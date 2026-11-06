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
    
}