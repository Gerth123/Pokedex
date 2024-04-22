function renderReloadAndLoad() {
    pokemonCount['start'] = 0;
    pokemonCount['end'] = 20;
    let loadPokemonButtonId = 'loadPokemonButtonContainerId';
    removeDisplayNoneUniversal(loadPokemonButtonId);
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    choosePokemon();
}


function capitalizeFirstLetterUniversal(value) {
    let words = value.split('-');
    let capitalizedWords = words.map(word => {
        if (word.includes('-')) {
            let parts = word.split('-');
            let capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
            return capitalizedParts.join(' ');
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    });
    return capitalizedWords.join(' ');
}


function setRightBackgroundColorUniversal(value, actualId) {
    let newValue = capitalizeFirstLetterUniversal(value);
    let backgroundColorSearch = typeColors[newValue];
    let actualIdToUse = document.getElementById(actualId);
    if (backgroundColorSearch) {
        actualIdToUse.style.backgroundColor = backgroundColorSearch;
    }
}


function setDisplayNoneUniversal(value) {
    let newValue = document.getElementById(value);
    newValue.classList.add('d-none');
}


function removeDisplayNoneUniversal(value) {
    let newValue = document.getElementById(value);
    newValue.classList.remove('d-none');
}


function checkInfoContainerUniversal(value, secondValue, pokemonsIndex) {
    for (let pokemonInfoBottomStatusIndex = 0; pokemonInfoBottomStatusIndex < pokemonInfoBottomStatus.length; pokemonInfoBottomStatusIndex++) {
        pokemonInfoBottomStatus[pokemonInfoBottomIndex] = false;
    };
    pokemonInfoBottomStatus[value] = true;
    for (let pokemonInfoBottomIndex = 0; pokemonInfoBottomIndex < pokemonInfoBottom.length; pokemonInfoBottomIndex++) {
        if (pokemonInfoBottom[pokemonInfoBottomIndex] !== value) {
            let pokemonInfoBottomId = pokemonInfoBottom[pokemonInfoBottomIndex] + pokemonsIndex;
            let pokemonInfoBottomContainerId = pokemonInfoContainer[pokemonInfoBottomIndex] + pokemonsIndex;
            document.getElementById(pokemonInfoBottomId).classList.remove('pokemonInfoBottomOpened');
            document.getElementById(pokemonInfoBottomContainerId).classList.add('d-none');
        }
    };
    document.getElementById(value).classList.add('pokemonInfoBottomOpened');
    document.getElementById(secondValue).classList.remove('d-none');
}