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


function checkComma() {
    if (actualTypes.length !== 1) {
        let actualComma = ',';
        return actualComma;
    } else {
        let actualComma = '';
        return actualComma;
    }
}


function checkForNoPokemon(searchedPokemon) {
    searchPokemonExists = false;
    for (let searchIndex = 0; searchIndex < pokemons.length; searchIndex++) {
        if (pokemons[searchIndex].includes(searchedPokemon)) {
            searchPokemonExists = true;
            break;
        }
    };
    if (searchPokemonExists === false) {
        pokedex.innerHTML = /*html*/ `
            <div class="noPokemonFoundContainer">
            <h2 class="noPokemonFoundHeadline">No Pokemon found. Please try again.</h2>
            <img src="img/pinkPokemon.png" alt="pink Pokemon" class="pinkPokemonImg">
            </div>
            `;
    }
}


function setFirstActualTypeSearch(responseAsJson) {
    let actualType = responseAsJson['types'][0]['type']['name'];
    return actualType;
}


function setSecondActualTypeSearch(responseAsJson, searchIndex) {
    let actualTypeSearch = responseAsJson['types'];
    if (actualTypeSearch.length == 2) {
        let actualType = responseAsJson['types'][1]['type']['name'];
        return capitalizeFirstLetterUniversal(actualType);;
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


function checkEvolution(evolutionContainer, actualPokemon) {
    if (pokemonsWithEvolution.includes(actualPokemon)) {
        let pokemonNumber = pokemons.indexOf(actualPokemon) + 2;
        evolutionContainer.innerHTML = firstEvolutionTemplate(pokemonNumber);
        checkPokemonEevee(evolutionContainer, pokemonNumber, actualPokemon);
        if (pokemonsWithEvolution.includes(pokemons[pokemonNumber - 1])) {
            let secondPokemonNumber = pokemonNumber + 1;
            evolutionContainer.innerHTML += secondEvolutionTemplate(pokemonNumber, secondPokemonNumber);
        }
    } else {
        evolutionContainer.innerHTML = noEvolutionTemplate();
    }
}


function checkPokemonEevee(evolutionContainer, pokemonNumber, actualPokemon) {
    if (actualPokemon == 'eevee') {
        evolutionContainer.innerHTML += openEeveeTemplate(pokemonNumber);
        let loadPokemonButtonId = 'loadPokemonButtonContainerId';
        setDisplayNoneUniversal(loadPokemonButtonId);
    }
}

