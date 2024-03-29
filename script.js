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
        let pokemonNumber = String(pokemonsIndex + 1).padStart(3, '0');
        await loadPokemon(actualUrl);
        await capitalizeFirstLetter(actualPokemon, pokemonsIndex);
        await includeTypes(actualUrl, pokemonsIndex);
       
        document.getElementById('pokedex').innerHTML += `
        <div class="soloPokemonContainer" id="soloPokemonContainer${pokemonsIndex}" onclick="openPokemonInfo(${pokemonsIndex}, '${actualUrl}', '${pokemonNumber}')" style="background-color: rgb(247,120,107)">
        <div class="soloPokemonHeadlineContainer">
        <span> ${actualPokemonUsed} </span> <span class="numberOfSinglePokemon">#${pokemonNumber}</span>
        </div>
        <div class="pokemonImageAndTypeContainer">
        <img class="pokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsIndex + 1}.svg">
        <div class="pokemonType"><div class="typeBackgroundColor">${actualTypes[0]}</div><div class="typeBackgroundColorTwo" id="typeBackgroundColorTwo${pokemonsIndex}">${setSecondActualType()}</div></div>
        </div>
        </div>` ;

        await checkSecondActualType(pokemonsIndex);
        await colorOfType(pokemonsIndex);
        actualTypes.splice(0, 2);
        // loadPokemon(actualUrl);
        // renderPokemonInfo(pokemonsIndex, actualUrl);
    }
}

async function includeTypes(actualUrl) {
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

function setSecondActualType() {
    if (actualTypes.length == 2) {
        return actualTypes[1];
    }
}

function checkSecondActualType(pokemonsIndex) { 
   if (actualTypes.length !== 2) {
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


async function openPokemonInfo (pokemonsIndex, actualUrl, pokemonNumber) {
    let body = document.getElementById('body');
    body.innerHTML += '';
    await body.classList.remove('d-none');

    let actualPokemon = pokemons[pokemonsIndex];
    let firstLetter = actualPokemon.charAt(0);
    let remainingLetters = actualPokemon.substring(1);
    let firstLetterCapitalized = firstLetter.toUpperCase();
    let actualPokemonCapitalized = firstLetterCapitalized + remainingLetters;

    await includeTypes(actualUrl);

    
    body.innerHTML += `
    <div class="pokemonInfoContainerAndBorder" id="soloPokemonContainerBig" onclick="closePokemonInfo(${pokemonsIndex})">
        <div class="pokemonInfoContainer">
            <div class="pokemonInfoHeadlineContainer"> 
                <div class="pokemonInfoHeadlineAndNumberContainer">
                <h2 class="pokemonInfoHeadline">${actualPokemonCapitalized}</h2><span class="numberOfPokemonInfo">#${pokemonNumber}</span>
                </div>
                <span class="pokemonInfoTypeContainer"><div class="pokemonInfoTypeBackgroundColor">${actualTypes[0]}</div><div class="pokemonInfoTypeBackgroundColorTwo" id="typeBackgroundColorTwo${pokemonsIndex}">${setSecondActualType()}</div></span>
                </div>
            <div class="pokemonInfoPokemonImageContainer">
                <img class="pokemonInfoPokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsIndex + 1}.svg">
            </div>
            <div class="pokemonInfoBottomContainer">
            </div>    
        </div> 
    </div>
   
    `;
    await checkSecondActualType(pokemonsIndex);
}

async function closePokemonInfo(pokemonsIndex) {

    let pokemonInfoContainerAndBorder = document.getElementById('soloPokemonContainerBig');
    let body = document.getElementById('body');
    let selectedBody =  body.querySelector('soloPokemonContainerBig');
    body.innerHTML += '';
    body.classList.add('d-none');
    let actualSoloPokemonContainer = 'soloPokemonContainer' + pokemonsIndex;
    let actualPokemonContainer = document.getElementById(actualSoloPokemonContainer);
    actualPokemonContainer.classList.remove('d-none');

}




// document.getElementById('teilbereich').addEventListener('click', function(event) {
//     event.stopPropagation(); // Verhindert, dass das Klickereignis auf den Teilbereich weitergeleitet wird
// });

// function entferneText() {
//     var element = document.getElementById('meineDiv');
//     var textElement = element.querySelector('p'); // Selektieren Sie das gewünschte Textelement, z.B. ein <p> Element.
    
//     if (textElement) { // Überprüfen Sie, ob das Element existiert, bevor Sie es entfernen.
//         element.removeChild(textElement); // Entfernen Sie das Textelement aus der Div.
//     }
// }


// <div id="meineDiv">
//     <div id="teilbereich">
//         <p>Dies ist der Teilbereich, der nicht reagieren und nicht gelöscht werden soll.</p>
//     </div>
//     <p>Dies ist der Text, den Sie entfernen möchten.</p>
//     <button onclick="entferneText()">Text entfernen</button>
// </div>