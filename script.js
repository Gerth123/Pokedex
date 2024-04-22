async function loadPokemon(actualUrl) {
    let response = await fetch(actualUrl);
    let responseAsJson = await response.json();
    let actualImgUrl = responseAsJson['sprites']['front_shiny'];
    actualPokemonImgUrl.push(actualImgUrl);
}


async function loadPokemonDates(responseAsJson) {
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

        pokedex.innerHTML += await choosePokemonTemplate(pokemonsIndex, actualUrl, pokemonNumber, actualPokemon);
        await checkSecondActualType(pokemonsIndex);
        await colorOfType(pokemonsIndex);
        actualTypes.splice(0, 2);
    }
    await choosePokemonLoadSet();
}


function choosePokemonLoadSet() {
    choosePokemonLoad = true;
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
        return capitalizedMrMime();
    } else {
        if (actualPokemon == 'nidoran-f') {
            return capitalizedNiorandFemale();
        } else {
            if (actualPokemon == 'nidoran-m') {
                return capitalizedNiorandMale();
            }
            else {
                return capitalizeFirstLetterUniversal(actualPokemon);
            }
        }
    }
}


function capitalizedMrMime() {
    let actualPokemonCapitalized = 'Mr. Mime';
    actualPokemonUsed.splice(0, 1);
    actualPokemonUsed.push(actualPokemonCapitalized);
    return actualPokemonCapitalized;
}

function capitalizedNiorandMale() {
    let actualPokemonCapitalized = 'Nidoran Male';
    actualPokemonUsed.splice(0, 1);
    actualPokemonUsed.push(actualPokemonCapitalized);
    return actualPokemonCapitalized;
}


function capitalizedNiorandFemale() {
    let actualPokemonCapitalized = 'Nidoran Female';
    actualPokemonUsed.splice(0, 1);
    actualPokemonUsed.push(actualPokemonCapitalized);
    return actualPokemonCapitalized;
}


async function openPokemonInfo(pokemonsIndex, actualUrl, pokemonNumber) {
    let body = document.getElementById('body');
    body.innerHTML += '';
    removeDisplayNoneUniversal('body');
    setDisplayNoneUniversal('wholePokedexContainer');
    setDisplayNoneUniversal('loadPokemonButtonContainerId');
    setDisplayNoneUniversal('infoContainer');
    let actualPokemon = pokemons[pokemonsIndex];
    let response = await fetch(actualUrl);
    let responseAsJson = await response.json();
    await includeTypes(actualUrl);
    await capitalizeFirstLetter(actualPokemon);
    let correctWeight = responseAsJson['weight'];
    body.innerHTML = await openPokemonInfoTemplate(pokemonsIndex, actualPokemon, responseAsJson, correctWeight, pokemonNumber, actualUrl);
    await checkSecondActualType(pokemonsIndex);
    await colorOfType2(pokemonsIndex);
    actualTypes.splice(0, 2);
    pokemonsIndexBig.push(pokemonsIndex);
}


function correctDates(value) {
    let correctWeightString = value.toString();
    let lengthOfWeight = correctWeightString.length - 1;
    let lastNumber = correctWeightString.charAt(lengthOfWeight);
    let correctWeightLength = correctWeightString.length;
    if (correctWeightLength === 1) {
        let remainingNumbers = 0;
        let newValue = remainingNumbers + ',' + lastNumber;
        return newValue;
    } else {
        let remainingNumbers = correctWeightString.slice(0, lengthOfWeight);
        let newValue = remainingNumbers + ',' + lastNumber;
        return newValue;
    }
}


async function closePokemonInfo() {
    let body = document.getElementById('body');
    body.classList.add('d-none');
    let wholePokedexContainer = document.getElementById('wholePokedexContainer');
    wholePokedexContainer.classList.remove('d-none');
    let loadPokemonButtonContainerId = document.getElementById('loadPokemonButtonContainerId');
    loadPokemonButtonContainerId.classList.remove('d-none');
    let infoContainer = document.getElementById('infoContainer');
    infoContainer.classList.remove('d-none');
}


function dontClose(event) {
    event.stopPropagation();
}


function colorOfLine(pokemonsIndex) {
    let actualSeparationLine = 'separationLine' + pokemonsIndex;
    let separationLine = document.getElementById(actualSeparationLine);
    let backgroundColor = typeColors[actualTypes[0]];
    if (backgroundColor) {
        separationLine.style.backgroundColor = backgroundColor;
    }
}



async function openAbout(pokemonsIndex) {
    let actualPokemonInfoBottomContainer = 'pokemonInfoBottomAbout' + pokemonsIndex;
    let actualPokemonInfoContainer = 'aboutContainer' + pokemonsIndex;
    await checkInfoContainerUniversal(actualPokemonInfoBottomContainer, actualPokemonInfoContainer, pokemonsIndex);
}


async function openBaseStats(pokemonsIndex, actualUrl) {
    let actualPokemonInfoBottomContainer = 'pokemonInfoBottomBaseStats' + pokemonsIndex;
    let actualPokemonInfoContainer = 'baseStatsContainer' + pokemonsIndex;
    let baseStatsContainer = document.getElementById(actualPokemonInfoContainer);
    baseStatsContainer.innerHTML = '';
    await checkInfoContainerUniversal(actualPokemonInfoBottomContainer, actualPokemonInfoContainer, pokemonsIndex);
    createBarChart(baseStatsContainer, actualUrl);
}


async function createBarChart(baseStatsContainer, actualUrl) {
    const response = await fetch(actualUrl);
    const responseAsJson = await response.json();
    const baseStatsArray = responseAsJson['stats'];
    let baseStatName = [];
    let baseStatValue = [];
    pushBaseStatNameAndValue(baseStatsArray, baseStatName, baseStatValue);
    let labels = [baseStatName[0], baseStatName[1], baseStatName[2], baseStatName[3], baseStatName[4], baseStatName[5]];
    let config = returnCanvasConfig(labels, baseStatValue);
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    baseStatsContainer.appendChild(canvas);
    new Chart(canvas, config);
}

function pushBaseStatNameAndValue(baseStatsArray, baseStatName, baseStatValue) {
    for (let baseStatsIndex = 0; baseStatsIndex < baseStatsArray.length; baseStatsIndex++) {
        const actualBaseStatName = baseStatsArray[baseStatsIndex]['stat']['name'];
        let actualBaseStatValue = baseStatsArray[baseStatsIndex]['base_stat'];
        baseStatName.push(capitalizeFirstLetterUniversal(actualBaseStatName));
        baseStatValue.push(actualBaseStatValue);
    }
}


function returnCanvasConfig(labels, baseStatValue) {
    let config = {
        type: 'bar',
        data: returnCanvasData(labels, baseStatValue),
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    ticks: {
                        maxTicksLimit: 6,
                    }
                }
            }
        }
    };
    return config;
}


function returnCanvasData(labels, baseStatValue) {
    let data = {
        labels: labels,
        datasets: [{
            axis: 'y',
            label: 'Base Stats',
            data: baseStatValue.slice(0, 6),
            fill: false,
            backgroundColor: backgroundColorCanvasOne(),
            borderColor: backgroundColorCanvasTwo(),
            borderWidth: 1
        }]
    };
    return data;
}


function backgroundColorCanvasOne() {
    let backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
    ];
    return backgroundColor;
}


function backgroundColorCanvasTwo() {
    let backgroundColorTwo = [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
    ];
    return backgroundColorTwo;
}


async function openEvolution(pokemonsIndex, actualPokemon) {
    let actualPokemonInfoBottomContainer = 'pokemonInfoBottomEvolution' + pokemonsIndex;
    let actualPokemonInfoContainer = 'evolutionContainer' + pokemonsIndex;
    await checkInfoContainerUniversal(actualPokemonInfoBottomContainer, actualPokemonInfoContainer, pokemonsIndex);
    let evolutionContainer = document.getElementById(actualPokemonInfoContainer);
    evolutionContainer.innerHTML = '';
    checkEvolution(evolutionContainer, actualPokemon);
}


async function openMoves(pokemonsIndex, actualUrl) {
    let actualPokemonInfoBottomContainer = 'pokemonInfoBottomMoves' + pokemonsIndex;
    let actualPokemonInfoContainer = 'movesContainer' + pokemonsIndex;
    await checkInfoContainerUniversal(actualPokemonInfoBottomContainer, actualPokemonInfoContainer, pokemonsIndex);

    let response = await fetch(actualUrl);
    let responseAsJson = await response.json();
    let movesArray = responseAsJson['moves'];
    let innerMovesContainer = document.getElementById('moves' + pokemonsIndex);
    innerMovesContainer.innerHTML = '';
    for (let movesIndex = 0; movesIndex < movesArray.length; movesIndex++) {
        const actualMove = movesArray[movesIndex]['move']['name'];
        innerMovesContainer.innerHTML += `
         <span class="singleMoves">${capitalizeFirstLetterUniversal(actualMove)}</span> 
    `
    };
}


async function showMorePokemon() {
    if (pokemonCount['start'] !== 140) {
        pokemonCount['start'] += 20;
        pokemonCount['end'] += 20;
    } else {
        pokemonCount['start'] += 20;
        pokemonCount['end'] += 11;
    }
    if (pokemonCount['end'] === 151) {
        let showMorePokemonButton = document.getElementById('showMorePokemonButton');
        showMorePokemonButton.classList.add('d-none');
    }
    await setTimeout(choosePokemon(), 2000);
}


async function searchPokemon() {
    if (choosePokemonLoad === true) {
        let searchedPokemon = document.getElementById('pokemonSearchField').value.toLowerCase();
        if (searchedPokemon.length > 1) {
            pokedex.innerHTML = '';
            createPokemonContainerForSearch(searchedPokemon);
        }
        let loadPokemonButtonId = 'loadPokemonButtonContainerId';
        setDisplayNoneUniversal(loadPokemonButtonId);
        await checkForNoPokemon(searchedPokemon);
        if (searchedPokemon.trim() === '') {
        renderReloadAndLoad();
        };
    };
    
};


async function createPokemonContainerForSearch(searchedPokemon) {
    for (let searchIndex = 0; searchIndex < pokemons.length; searchIndex++) {
        if (pokemons[searchIndex].includes(searchedPokemon)) {
            let actualId = 'soloPokemonContainerSearch' + searchIndex;
            let actualUrl = url + pokemons[searchIndex];
            let response = await fetch(actualUrl);
            let responseAsJson = await response.json();
            let pokemonNumber = String(searchIndex + 1).padStart(3, '0');
            let actualPokemon = pokemons[searchIndex];
            let firstActualType = responseAsJson['types'][0]['type']['name'];
            let firstActualTypeCapitalized = capitalizeFirstLetterUniversal(firstActualType);
            pokedex.innerHTML += searchPokemonTemplate(searchIndex, actualUrl, pokemonNumber, actualPokemon, firstActualTypeCapitalized, actualId, responseAsJson);
            checkSecondActualTypeSearch(searchIndex, responseAsJson);
            setRightBackgroundColorUniversal(firstActualTypeCapitalized, actualId);
        };
    };
}