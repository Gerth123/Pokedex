let pokemons = [
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff",
    "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro",
    "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu",
    "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew",
];
// "mr. mime" nach starmie

const typeColors = {
    'Grass': 'rgb(44,218,177)',
    'Fire': 'rgb(247,120,107)',
    'Water': 'rgb(88,171,246)',
    'Bug': 'rgb(168, 184, 32)',
    'Normal': 'rgb(168, 168, 120)',
    'Poison': 'rgb(160, 64, 160)',
    'Electric': 'rgb(248, 208, 48)',
    'Ground': 'rgb(224, 192, 104)',
    'Fairy': 'rgb(240, 182, 188)',
    'Fighting': 'rgb(192, 48, 40)',
    'Psychic': 'rgb(248, 88, 136)',
    'Rock': 'rgb(184, 160, 56)',
    'Ghost': 'rgb(112, 88, 152)'
};

let url = 'https://pokeapi.co/api/v2/pokemon/';

let currentPokemon;

let actualPokemonUsed = [];

let actualPokemonImgUrl = [];

let actualTypes = [];

async function loadPokemon(actualUrl) {
    let response = await fetch(actualUrl);
    let responseAsJson = await response.json();
    let actualImgUrl = responseAsJson['sprites']['front_shiny'];
    actualPokemonImgUrl.push(actualImgUrl);
}

async function loadPokemonDates(responseAsJson) {
    //abilities
    for (let abilityIndex = 0; abilityIndex < responseAsJson['abilities'].length; abilityIndex++) {
        const actualAbility = responseAsJson['abilities'][abilityIndex]['ability']['name'];
    }
}

async function choosePokemon() {
    for (let pokemonsIndex = 0; pokemonsIndex < pokemons.length; pokemonsIndex++) {
        const actualPokemon = pokemons[pokemonsIndex];
        let actualUrl = url + actualPokemon;
        debugger
        let pokemonNumber = String(pokemonsIndex + 1).padStart(3, '0');
        await loadPokemon(actualUrl);
        await capitalizeFirstLetter(actualPokemon, pokemonsIndex);
        await includeTypes(actualUrl, pokemonsIndex);
       
        document.getElementById('pokedex').innerHTML += `
        <div class="soloPokemonContainer" id="soloPokemonContainer${pokemonsIndex}" onclick="openPokemonInfo(${pokemonsIndex})" style="background-color: rgb(247,120,107)">
        <div class="soloPokemonHeadlineContainer">
        <span> ${actualPokemonUsed} </span> <span class="numberOfSinglePokemon">#${pokemonNumber}</span>
        </div>
        <div class="pokemonImageAndTypeContainer">
        <img class="pokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsIndex + 1}.svg">
        <div class="pokemonType"><div class="typeBackgroundColor">${actualTypes[0]}</div><div class="typeBackgroundColorTwo" id="typeBackgroundColorTwo${pokemonsIndex}">${setSecondActualType(pokemonsIndex)}</div></div>
        </div>
        </div>` ;

        await colorOfType(pokemonsIndex);
        actualTypes.splice(0, 2)
        // loadPokemon(actualUrl);
        // renderPokemonInfo(pokemonsIndex, actualUrl);
    }
}

async function includeTypes(actualUrl, pokemonsIndex) {
    let response = await fetch(actualUrl);
    let responseAsJson = await response.json();
    for (let typeIndex = 0; typeIndex < responseAsJson['types'].length; typeIndex++) {
        const actualType = responseAsJson['types'][typeIndex]['type']['name'];
        let firstLetter = actualType.charAt(0);
        let remainingLetters = actualType.substring(1);
        let firstLetterCapitalized = firstLetter.toUpperCase();
        let actualTypeCapitalized = firstLetterCapitalized + remainingLetters;
        actualTypes.push(actualTypeCapitalized);
        actualTypes.join(' ');
    }

}

function setSecondActualType(pokemonsIndex) {
    if (actualTypes[1] !== '') {
        return actualTypes[1];
    } else {
        let actualIdSecondTypeBackground = 'typeBackgroundColorTwo' + pokemonsIndex;
        document.getElementById(actualIdSecondTypeBackground).classList.add('d-none');
    }
}

function colorOfType(pokemonsIndex) {
    let numberOfSoloPokemonContainer = 'soloPokemonContainer' + pokemonsIndex;
    let soloPokemonContainer = document.getElementById(numberOfSoloPokemonContainer);

    let backgroundColor = typeColors[actualTypes[0]];
    if (backgroundColor) {
        soloPokemonContainer.style.backgroundColor = backgroundColor;
    }
}

function capitalizeFirstLetter(actualPokemon, pokemonsIndex) {
    if (actualPokemon == 'mr-mime') {
        let mrMimeCapitalized = 'Mr. Mime';
        actualPokemonUsed.splice(0, 1);
        actualPokemonUsed.push(mrMimeCapitalized);
    } else {
        let firstLetter = actualPokemon.charAt(0);
        let remainingLetters = actualPokemon.substring(1);
        let firstLetterCapitalized = firstLetter.toUpperCase();
        let actualPokemonCapitalized = firstLetterCapitalized + remainingLetters;
        actualPokemonUsed.splice(0, 1);
        actualPokemonUsed.push(actualPokemonCapitalized);
    }

}

function renderPokemonInfo(pokemonsIndex) {


    document.getElementById('pokemonname').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonnumber').innerHTML = `# ${pokemonsIndex}`;

}

//for Schleife für jedes einzelne Pokemon mit komplettem Datenpaket
//Backgroundcolor anhand Spezies, bereits im Link vorhanden?
