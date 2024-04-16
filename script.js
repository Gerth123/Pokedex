let pokemons = [
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff",
    "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro",
    "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu",
    "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew",
];

let typeColors = {
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
    'Ghost': 'rgb(112, 88, 152)',
    'Dragon': 'rgb(111, 53, 251)',
    'Ice': 'rgb(151, 217, 240)',
};

let pokemonInfoBottom = {
    'About': true,
    'BaseStats': false,
    'Evolution': false,
    'Moves': false,
};

let pokemonInfoBottomForLoop = ['pokemonInfoBottomAbout', 'pokemonInfoBottomBaseStats', 'pokemonInfoBottomEvolution', 'pokemonInfoBottomMoves']

// nidoran-f im großen PokemonContainer

let url = 'https://pokeapi.co/api/v2/pokemon/';

let currentPokemon;

let actualPokemonUsed = [];

let actualPokemonImgUrl = [];

let actualTypes = [];

let pokemonsIndexBig = [];

let correctedWeight = [];



let pokemonCount = {
    'start': 0,
    'end': 20,
}

async function loadPokemon(actualUrl) {
    let response = await fetch(actualUrl);
    let responseAsJson = await response.json();
    let actualImgUrl = responseAsJson['sprites']['front_shiny'];
    actualPokemonImgUrl.push(actualImgUrl);
    // console.log(responseAsJson);
}

async function loadPokemonDates(responseAsJson) {
    //abilities
    for (let abilityIndex = 0; abilityIndex < responseAsJson['abilities'].length; abilityIndex++) {
        const actualAbility = responseAsJson['abilities'][abilityIndex]['ability']['name'];
    }
}

async function choosePokemon() {
    let pokedex = document.getElementById('pokedex');
    for (let pokemonsIndex = pokemonCount['start']; pokemonsIndex < pokemonCount['end']; pokemonsIndex++) {
        const actualPokemon = pokemons[pokemonsIndex];
        let actualUrl = url + actualPokemon;
        let pokemonNumber = String(pokemonsIndex + 1).padStart(3, '0');
        await loadPokemon(actualUrl);
        await capitalizeFirstLetter(actualPokemon);
        await includeTypes(actualUrl);
       
        pokedex.innerHTML += /*html*/`
        <div class="soloPokemonContainer" id="soloPokemonContainer${pokemonsIndex}" onclick="openPokemonInfo(${pokemonsIndex}, '${actualUrl}', '${pokemonNumber}')" style="background-color: rgb(247,120,107)">
        <div class="soloPokemonHeadlineContainer">
        <span> ${actualPokemonUsed} </span> <span class="numberOfSinglePokemon">#${pokemonNumber}</span>
        </div>
        <div class="pokemonImageAndTypeContainer">  
        <img class="pokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonsIndex + 1}.png">
        <div class="pokemonType"><div class="typeBackgroundColor">${actualTypes[0]}</div><div class="typeBackgroundColorTwo" id="typeBackgroundColorTwo${pokemonsIndex}">${setSecondActualType()}</div></div>
        </div>
        </div>` ;
                                                                                                                        // 'dream-world   .svg'
        await checkSecondActualType(pokemonsIndex);
        await colorOfType(pokemonsIndex);
        actualTypes.splice(0, 2);
        // loadPokemon(actualUrl);
        // renderPokemonInfo(pokemonsIndex, actualUrl);
    }
}

function renderReloadAndLoad() {
    let loadPokemonButtonId = 'loadPokemonButtonContainerId';
    removeDisplayNoneUniversal(loadPokemonButtonId);
    let reloadButton = 'reloadPokemon';
    setDisplayNoneUniversal(reloadButton);
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    choosePokemon();
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
    } else {
        let nothing = '';
        return nothing;
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

function colorOfType2(pokemonsIndex) {
    let actualBigPokemonContainer = 'pokemonInfoContainer' + pokemonsIndex;
    let bigPokemonContainer = document.getElementById(actualBigPokemonContainer);

    let backgroundColor = typeColors[actualTypes[0]];
    if (backgroundColor) {
        bigPokemonContainer.style.backgroundColor = backgroundColor;
    }
}


function capitalizeFirstLetter(actualPokemon) {
    if (actualPokemon == 'mr-mime') {
        let actualPokemonCapitalized = 'Mr. Mime';
        actualPokemonUsed.splice(0, 1);
        actualPokemonUsed.push(actualPokemonCapitalized);
        return actualPokemonCapitalized;
    } else { 
    if (actualPokemon == 'nidoran-f'){
        let actualPokemonCapitalized = 'Nidoran Female';
        actualPokemonUsed.splice(0, 1);
        actualPokemonUsed.push(actualPokemonCapitalized);
        return actualPokemonCapitalized;
    }  else {
    if (actualPokemon == 'nidoran-m'){
        let actualPokemonCapitalized = 'Nidoran Male';
        actualPokemonUsed.splice(0, 1);
        actualPokemonUsed.push(actualPokemonCapitalized);
        return actualPokemonCapitalized;
    }
    else {
        let firstLetter = actualPokemon.charAt(0);
        let remainingLetters = actualPokemon.substring(1);
        let firstLetterCapitalized = firstLetter.toUpperCase();
        let actualPokemonCapitalized = firstLetterCapitalized + remainingLetters;
        actualPokemonUsed.splice(0, 1);
        actualPokemonUsed.push(actualPokemonCapitalized);
        return actualPokemonCapitalized;
    } } }
}

async function openPokemonInfo (pokemonsIndex, actualUrl, pokemonNumber) {
    // let audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/'${pokemonsIndex}.ogg`);
    // audio.play();
    let body = document.getElementById('body');
    body.innerHTML += '';
    await body.classList.remove('d-none');

    let actualPokemon = pokemons[pokemonsIndex];
    let response = await fetch(actualUrl);
    let responseAsJson = await response.json();
    await includeTypes(actualUrl);
    await capitalizeFirstLetter(actualPokemon);
    let correctWeight = responseAsJson['weight'];
    
    body.innerHTML = /*html*/`
    <div class="pokemonInfoContainerAndBorder" id="pokemonInfoContainerAndBorder">
        <div class="pokemonInfoContainer"  onclick="dontClose(event)" id="pokemonInfoContainer${pokemonsIndex}">
            <div class="pokemonInfoHeadlineContainer"> 
                <div class="pokemonInfoHeadlineAndNumberContainer">
                <h2 class="pokemonInfoHeadline">${capitalizeFirstLetter(actualPokemon)}</h2><span class="numberOfPokemonInfo">#${pokemonNumber}</span>
                </div>
                <span class="pokemonInfoTypeContainer"><div class="pokemonInfoTypeBackgroundColor">${actualTypes[0]}</div><div class="pokemonInfoTypeBackgroundColorTwo" id="typeBackgroundColorTwo${pokemonsIndex}">${setSecondActualType()}</div></span>
                </div>
            <div class="pokemonInfoPokemonImageContainer">
                <img class="pokemonInfoPokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsIndex + 1}.svg">
            </div>
            <div class="pokemonInfoBottomContainer" id="pokemonInfoBottomContainer">
                <div class="pokemonInfoBottomHeadlineContainer">
                    <span class="pokemonInfoBottomAbout pokemonInfoBottomOpened" id="pokemonInfoBottomAbout${pokemonsIndex}" onclick="openAbout('${pokemonsIndex}', '${responseAsJson}')">About</span>
                    <span class="pokemonInfoBottomBaseStats" id="pokemonInfoBottomBaseStats${pokemonsIndex}" onclick="openBaseStats(${pokemonsIndex})">Base Stats</span>
                    <span class="pokemonInfoBottomEvolution" id="pokemonInfoBottomEvolution${pokemonsIndex}" onclick="openEvolution(${pokemonsIndex})">Evolution</span>
                    <span class="pokemonInfoBottomMoves" id="pokemonInfoBottomMoves${pokemonsIndex}" onclick="openMoves(${pokemonsIndex})">Moves</span>
                </div>
                <div class="wholeIntegratedElementsAndTypesInfoBottomContainer" id="wholeIntegratedElementsAndTypesInfoBottomContainer">
                    <div class="integratedElementsAndTypesInfoBottomContainer" id="integratedElementsAndTypesInfoBottomContainer">
                        <div class="typesForIntegratedElementsBottomContainer">
                            <span>Species:</span>
                            <span>Height:</span>
                            <span>Weight:</span>
                            <span>Abilities:</span>
                        </div>
                        <div class="integratedElementsInfoBottomContainer">
                            <span>${actualTypes[0]}${checkComma()} ${setSecondActualType()}</span>
                            <span>${await correctDates(responseAsJson['height'])} Metres</span>
                            <span>${await correctDates(correctWeight)} Kilogramm</span>
                            <span>${await capitalizeFirstLetterUniversal(responseAsJson['abilities']['0']['ability']['name'])}</span>
                        </div>
                    </div>
                    <div class="separationLine" id="separationLine${pokemonsIndex}"></div>
                    <div class="secondIntegratedElementsAndTypesInfoBottomContainer">
                        <h2 class="secondIntegratedElementsAndTypesInfoBottomHeadline">Breeding</h2>
                        <div class="secondIntegratedElementsAndTypesInfoBottom">    
                            <div class="typesForIntegratedElementsBottomContainer">
                                <span>Gender:</span>
                                <span>Egg Group:</span>
                                <span>Egg Cycle:</span>
                            </div>
                            <div class="integratedElementsInfoBottomContainer"> 
                                <span>Male</span>
                                <span>Egg</span>
                                <span>Eggcycle</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div> 
    </div>
    `;
    
    await checkSecondActualType(pokemonsIndex);
    await colorOfType2(pokemonsIndex);
    await colorOfLine(pokemonsIndex);
    actualTypes.splice(0, 2);
    pokemonsIndexBig.push(pokemonsIndex);
}

function correctDates(value) {
    let correctWeightString = value.toString(); // Konvertiere die Zahl in eine Zeichenkette
    let lengthOfWeight = correctWeightString.length - 1;
    let lastNumber = correctWeightString.charAt(lengthOfWeight);
    let correctWeightLength = correctWeightString.length;
    if(correctWeightLength === 1){
        let remainingNumbers = 0;
        let newValue = remainingNumbers + ',' + lastNumber;
        return newValue;
    } else{
        let remainingNumbers = correctWeightString.slice(0, lengthOfWeight);
        let newValue = remainingNumbers + ',' + lastNumber;
        return newValue;
    }
    
}

function capitalizeFirstLetterUniversal(value){
    let firstLetter = value.charAt(0);
    let remainingLetters = value.substring(1);
    let firstLetterCapitalized = firstLetter.toUpperCase();
    let actualValue = firstLetterCapitalized + remainingLetters;
    return actualValue;
}

function setDisplayNoneUniversal(value) {
    let newValue = document.getElementById(value);
    newValue.classList.add('d-none');
}

function removeDisplayNoneUniversal(value) {
    let newValue = document.getElementById(value);
    newValue.classList.remove('d-none');
}

async function closePokemonInfo() {
    let body = document.getElementById('body');
    body.classList.add('d-none');
}

function dontClose(event) {
    event.stopPropagation();
}

function colorOfLine(pokemonsIndex) {
    let actualSeparationLine = 'separationLine' + pokemonsIndex;
    let separationLine = document.getElementById(actualSeparationLine);
    // let actualPokemonInfoBottomAbout = 'pokemonInfoBottomAbout' + pokemonsIndex;
    // let pokemonInfoBottomAbout = document.getElementById(actualPokemonInfoBottomAbout);

    let backgroundColor = typeColors[actualTypes[0]];
    if (backgroundColor) {
        separationLine.style.backgroundColor = backgroundColor;
        // pokemonInfoBottomAbout.style.textDecorationColor = backgroundColor;
    }
}

function checkComma() {
    if(actualTypes.length !== 1){
        let actualComma = ',';
        return actualComma;
    } else {
        let actualComma = '';
        return actualComma;
    }
}

function openAbout(pokemonsIndex, responseAsJson) {
    let container = document.getElementById('wholeIntegratedElementsAndTypesInfoBottomContainer');
    container.classList.remove('d-none');
    let actualPokemonInfoBottomAbout = 'pokemonInfoBottomAbout' + pokemonsIndex;
    let pokemonInfoBottomAbout = document.getElementById(actualPokemonInfoBottomAbout);
    setPokemonInfoBottomFalse();
    pokemonInfoBottom[0] = true;
    removeBottomOpened(pokemonsIndex);
    pokemonInfoBottomAbout.classList.add('pokemonInfoBottomOpened');
    let actualTypeForBackground = responseAsJson['types'][0]['type']['name'];
    let actualTypeForBackgroundCapitalized = capitalizeFirstLetterUniversal(actualTypeForBackground);
    let backgroundColor = typeColors[actualTypes[actualTypeForBackgroundCapitalized]];
    pokemonInfoBottomAbout.style.textDecorationColor = backgroundColor;
}

function openBaseStats(pokemonsIndex) {
    let container = document.getElementById('wholeIntegratedElementsAndTypesInfoBottomContainer');
    container.classList.add('d-none');
    let actualPokemonInfoBottomBaseStats = 'pokemonInfoBottomBaseStats' + pokemonsIndex;
    let pokemonInfoBottomBaseStats = document.getElementById(actualPokemonInfoBottomBaseStats);
    let backgroundColor = typeColors[actualTypes[0]];
    pokemonInfoBottomBaseStats.style.textDecorationColor = backgroundColor;
    setPokemonInfoBottomFalse();
    pokemonInfoBottom[1] = true;
    removeBottomOpened(pokemonsIndex);
    pokemonInfoBottomBaseStats.classList.add('pokemonInfoBottomOpened');
}

function openEvolution(pokemonsIndex) {
    let container = document.getElementById('wholeIntegratedElementsAndTypesInfoBottomContainer');
    container.classList.add('d-none');
    let actualPokemonInfoBottomEvolution = 'pokemonInfoBottomEvolution' + pokemonsIndex;
    let pokemonInfoBottomEvolution = document.getElementById(actualPokemonInfoBottomEvolution);
    let backgroundColor = typeColors[actualTypes[0]];
    pokemonInfoBottomEvolution.style.textDecorationColor = backgroundColor;
    setPokemonInfoBottomFalse();
    pokemonInfoBottom[2] = true;
    removeBottomOpened(pokemonsIndex);
    pokemonInfoBottomEvolution.classList.add('pokemonInfoBottomOpened');
}

function openMoves(pokemonsIndex) {
    let container = document.getElementById('wholeIntegratedElementsAndTypesInfoBottomContainer');
    container.classList.add('d-none');
    let actualPokemonInfoBottomMoves = 'pokemonInfoBottomMoves' + pokemonsIndex;
    let pokemonInfoBottomMoves = document.getElementById(actualPokemonInfoBottomMoves);
    let backgroundColor = typeColors[actualTypes[0]];
    pokemonInfoBottomMoves.style.textDecorationColor = backgroundColor;
    setPokemonInfoBottomFalse();
    pokemonInfoBottom[3] = true;
    removeBottomOpened(pokemonsIndex);
    pokemonInfoBottomMoves.classList.add('pokemonInfoBottomOpened');
}

function setPokemonInfoBottomFalse() {
    for (let pokemonInfoFalseIndex = 0; pokemonInfoFalseIndex < pokemonInfoBottom.length; pokemonInfoFalseIndex++) {
        pokemonInfoBottom[pokemonInfoFalseIndex] = false;
    }
}

function removeBottomOpened(pokemonsIndex) {
    for (let pokemonInfoBottomIndex = 0; pokemonInfoBottomIndex < pokemonInfoBottomForLoop.length; pokemonInfoBottomIndex++) {
        let actualPokemonInfoBottomOpened = pokemonInfoBottomForLoop[pokemonInfoBottomIndex];
        if (actualPokemonInfoBottomOpened !== true) {
            let pokemonInfoBottomOpenedForId = pokemonInfoBottomForLoop[pokemonInfoBottomIndex] + pokemonsIndex;
            let getElementByIdPokemonInfoBottom = document.getElementById(pokemonInfoBottomOpenedForId);
            getElementByIdPokemonInfoBottom.classList.remove('pokemonInfoBottomOpened');
        }
    }
}

async function showMorePokemon() {
    
    if (pokemonCount['start'] !== 140) {
        pokemonCount['start'] += 20;
        pokemonCount['end'] += 20;
    } else {
        pokemonCount['start'] += 20;
        pokemonCount['end'] += 11;
    }
    if (pokemonCount['end'] == 151) {
        let showMorePokemonButton = document.getElementById('showMorePokemonButton');
        showMorePokemonButton.classList.add('d-none'); 
    }
    await setTimeout(choosePokemon(), 2000);
}

async function searchPokemon(){
    let searchedPokemon = document.getElementById('pokemonSearchField').value.toLowerCase();
    let searchedPokemonString = String(searchedPokemon);
    let pokemonsIndex = pokemons.indexOf(searchedPokemonString);
    let pokemonNumber = String(pokemonsIndex + 1).padStart(3, '0');
    let actualUrl = url + pokemons[pokemonsIndex];
    let response = await fetch(actualUrl);
    let responseAsJson = await response.json();

    if(pokemonsIndex >= 0) {
        let firstActualType = setFirstActualTypeSearch(responseAsJson);
        let actualId = 'soloPokemonContainerSearch' + pokemonsIndex;
        const actualPokemon = pokemons[pokemonsIndex];
        let pokedex = document.getElementById('pokedex');
        pokedex.innerHTML = '';
        pokedex.innerHTML += /*html*/`
        <div class="soloPokemonContainerSearch" id='${actualId}' onclick="openPokemonInfo(${pokemonsIndex}, '${actualUrl}', '${pokemonNumber}')" style="background-color: rgb(247,120,107)">
        <div class="soloPokemonHeadlineContainer">
        <span> ${capitalizeFirstLetterUniversal(actualPokemon)} </span> <span class="numberOfSinglePokemon">#${pokemonNumber}</span>
        </div>
        <div class="pokemonImageAndTypeContainer">  
        <img class="pokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonsIndex + 1}.png">
        <div class="pokemonType"><div class="typeBackgroundColor">${capitalizeFirstLetterUniversal(firstActualType)}</div><div class="typeBackgroundColorTwoSearch" id="typeBackgroundColorTwoSearch${pokemonsIndex}">${setSecondActualTypeSearch(responseAsJson)}</div></div>
        </div>
        </div>` ; 
        setRightBackgroundColorUniversal(firstActualType, actualId);
        let loadPokemonButtonId = 'loadPokemonButtonContainerId';
        setDisplayNoneUniversal(loadPokemonButtonId);
        let reloadButton = 'reloadPokemon';
        removeDisplayNoneUniversal(reloadButton);
        checkSecondActualTypeSearch(pokemonsIndex, responseAsJson);
        }
        // else{
        //     let pokedex = document.getElementById('pokedex');
        // pokedex.innerHTML = '';
        // pokedex.innerHTML += /*html*/`
        // <h2>No Pokemon Found</h2>
        // `
        // let loadPokemonButtonId = 'loadPokemonButtonContainerId';
        // setDisplayNoneUniversal(loadPokemonButtonId);
        // let reloadButton = 'reloadPokemon';
        // removeDisplayNoneUniversal(reloadButton);
        // }
    }

    function setFirstActualTypeSearch(responseAsJson) {
        let actualType = responseAsJson['types'][0]['type']['name'];
        return actualType;
    }

    function setSecondActualTypeSearch(responseAsJson) {
        let actualTypeSearch = responseAsJson['types'][0]['type']['name'];
        if (actualTypeSearch.length == 2) {
            let actualType = responseAsJson['types'][0]['type']['name'];
            capitalizeFirstLetterUniversal(actualType);
            return actualType;
        } else {
            let nothing = '';
            return nothing;
        }
    }

    function checkSecondActualTypeSearch(pokemonsIndex, responseAsJson) {
        let actualTypeSearch = responseAsJson['types'][0]['type']['name'];
        if (actualTypeSearch.length !== 2) {
            let actualId = 'typeBackgroundColorTwoSearch' + pokemonsIndex;
            setDisplayNoneUniversal(actualId);
        } 
    }

    function setRightBackgroundColorUniversal(value, actualId) {
        let newValue = capitalizeFirstLetterUniversal(value);
        let backgroundColorSearch = typeColors[newValue];
        let actualIdToUse = document.getElementById(actualId);
        if (backgroundColorSearch) {
            actualIdToUse.style.backgroundColor = backgroundColorSearch;
        }
    }