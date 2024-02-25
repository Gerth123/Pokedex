let pokemons = [
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", 
    "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", 
    "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", 
    "starmie", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew",
];
// "mr. mime" nach starmie

let url = 'https://pokeapi.co/api/v2/pokemon/';

let currentPokemon; 

let actualPokemonUsed = [];

async function loadPokemon(actualUrl) {
    
    let response = await fetch(actualUrl);
    let responseAsJson = await response.json();

    console.log('Loaded Pokemon', currentPokemon);
}

function choosePokemon() {
    for (let pokemonsIndex = 0; pokemonsIndex < pokemons.length; pokemonsIndex++) {
        const actualPokemon = pokemons[pokemonsIndex];
        let actualUrl = url + actualPokemon;
        capitalizeFirstLetter(actualPokemon);
        document.getElementById('pokedex').innerHTML += `
        <div class="soloPokemonContainer">
        <div class="soloPokemonHeadlineContainer">
        <span> ${actualPokemonUsed} </span> <span>#${pokemonsIndex + 1}</span>
        </div>
        </div>` ;
        // loadPokemon(actualUrl);
        // renderPokemonInfo(pokemonsIndex, actualUrl);
    }
}

function capitalizeFirstLetter(actualPokemon) {
    let firstLetter = actualPokemon.charAt(0);
    let remainingLetters = actualPokemon.substring(1);
    let firstLetterCapitalized = firstLetter.toUpperCase();
    let actualPokemonCapitalized = firstLetterCapitalized + remainingLetters;
    // let actualPokemonCapitalized = actualPokemon.charAt(0).toUpperCase() + actualPokemon.slice(1);
    actualPokemonUsed.splice(0, 1);
    actualPokemonUsed.push(actualPokemonCapitalized);
}

function renderPokemonInfo(pokemonsIndex){


    document.getElementById('pokemonname').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonnumber').innerHTML = `# ${pokemonsIndex}`;
}

//for Schleife für jedes einzelne Pokemon mit komplettem Datenpaket
//Backgroundcolor anhand Spezies, bereits im Link vorhanden?
