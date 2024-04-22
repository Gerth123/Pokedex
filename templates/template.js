function choosePokemonTemplate(pokemonsIndex, actualUrl, pokemonNumber, actualPokemon) {
    let template = /*html*/`
    <div class="soloPokemonContainer" id="soloPokemonContainer${pokemonsIndex}" onclick="openPokemonInfo(${pokemonsIndex}, '${actualUrl}', '${pokemonNumber}')" style="background-color: rgb(247,120,107)">
    <div class="soloPokemonHeadlineContainer">
    <span> ${capitalizeFirstLetter(actualPokemon)} </span> <span class="numberOfSinglePokemon">#${pokemonNumber}</span>
    </div>
    <div class="pokemonImageAndTypeContainer">  
    <img class="pokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonsIndex + 1}.png">
    <div class="pokemonType"><div class="typeBackgroundColor">${actualTypes[0]}</div><div class="typeBackgroundColorTwo" id="typeBackgroundColorTwo${pokemonsIndex}">${setSecondActualType()}</div></div>
    </div>
    </div>` ;
    return template;
}


async function openPokemonInfoTemplate(pokemonsIndex, actualPokemon, responseAsJson, correctWeight, pokemonNumber, actualUrl) {
    let template = /*html*/`
    <div class="pokemonInfoContainerAndBorder" id="pokemonInfoContainerAndBorder">
        <div class="pokemonInfoContainer"  onclick="dontClose(event)" id="pokemonInfoContainer${pokemonsIndex}">
            <div class="pokemonInfoHeadlineContainer"> 
                <div class="pokemonInfoHeadlineAndNumberContainer">
                <h2 class="pokemonInfoHeadline">${capitalizeFirstLetter(actualPokemon)}</h2>
                <div class="closePokemonAndNumberContainer"><img src="img/clos.png" onclick="closePokemonInfo()" class="closePokemonInfoResponsive"><span class="numberOfPokemonInfo">#${pokemonNumber}</span></div>
                </div>
                <span class="pokemonInfoTypeContainer"><div class="pokemonInfoTypeBackgroundColor">${actualTypes[0]}</div><div class="pokemonInfoTypeBackgroundColorTwo" id="typeBackgroundColorTwo${pokemonsIndex}">${setSecondActualType()}</div></span>
                </div>
            <div class="pokemonInfoPokemonImageContainer">
                <div><img class="arrowImgLeft" src="img/arrowLeft.png" alt="Previous Pokemon" onclick="openPreviousPokemonInfo(${pokemonsIndex})"></div>
                <img class="pokemonInfoPokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsIndex + 1}.svg">
                <div><img class="arrowImgRight" src="img/arrowRight.png" alt="Next Pokemon" onclick="openNextPokemonInfo(${pokemonsIndex})"></div>
            </div>
            <div class="pokemonInfoBottomContainer" id="pokemonInfoBottomContainer">
                 <div class="pokemonInfoBottomHeadlineContainer">
                    <span class="pokemonInfoBottomAbout pokemonInfoBottomOpened" id="pokemonInfoBottomAbout${pokemonsIndex}" onload="openAbout('${pokemonsIndex}', '${responseAsJson}', '${correctWeight}')" onclick="openAbout('${pokemonsIndex}', '${responseAsJson}', '${correctWeight}')">About</span>
                    <span class="pokemonInfoBottomBaseStats" id="pokemonInfoBottomBaseStats${pokemonsIndex}" onclick="openBaseStats(${pokemonsIndex}, '${actualUrl}')">Stats</span>
                    <span class="pokemonInfoBottomEvolution" id="pokemonInfoBottomEvolution${pokemonsIndex}" onclick="openEvolution(${pokemonsIndex}, '${actualPokemon}')">Evolution</span>
                    <span class="pokemonInfoBottomMoves" id="pokemonInfoBottomMoves${pokemonsIndex}" onclick="openMoves(${pokemonsIndex}, '${actualUrl}')">Moves</span>
                </div>
                <div class="wholeIntegratedElementsAndTypesInfoBottomContainer" id="aboutContainer${pokemonsIndex}">
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
                            <span>${await capitalizeFirstLetterUniversal(responseAsJson['abilities']['0']['ability']['name'])}${checkSecondAbility(responseAsJson)}</span>
                        </div>
                    </div>
                </div>
                <div class="baseStatsContainer d-none" id="baseStatsContainer${pokemonsIndex}">
                </div>
                <div class="evolutionContainer d-none" id="evolutionContainer${pokemonsIndex}"></div>
                <div class="movesContainer d-none" id="movesContainer${pokemonsIndex}">
                    <div id="moves${pokemonsIndex}" class="moves"></div>
                </div>
            </div>    
        </div> 
    </div>
     `;
    return template;
}


function checkSecondAbility(responseAsJson) {
    if (responseAsJson['abilities'][1] == null) {
        return '';
    } else {
        return `, ${capitalizeFirstLetterUniversal(responseAsJson['abilities'][1]['ability']['name'])}`;
    }
}


function firstEvolutionTemplate(pokemonNumber) {
    let template = `
            <div class="pokemonInfoPokemonImageEvolutionContainer">
            <img class="pokemonInfoPokemonImageEvolution" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber}.svg">
            <span>${capitalizeFirstLetterUniversal(pokemons[pokemonNumber - 1])}</span>
            </div>
        `;
    return template;
}


function openEeveeTemplate(pokemonNumber) {
    let template = `<div class="pokemonInfoPokemonImageEvolutionContainer">
            <img class="pokemonInfoPokemonImageEvolution" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber + 1}.svg">
            <span>${capitalizeFirstLetterUniversal(pokemons[pokemonNumber])}</span>
            </div>
            <div class="pokemonInfoPokemonImageEvolutionContainer">
            <img class="pokemonInfoPokemonImageEvolution" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber + 2}.svg">
            <span>${capitalizeFirstLetterUniversal(pokemons[pokemonNumber + 1])}</span>
            </div>
        `;
    return template;
}


function secondEvolutionTemplate(pokemonNumber, secondPokemonNumber) {
    let template = /*html*/`	
            <div class="pokemonInfoPokemonImageEvolutionContainer">
            <img class="pokemonInfoPokemonImageEvolution" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${secondPokemonNumber}.svg">
            <span>${capitalizeFirstLetterUniversal(pokemons[pokemonNumber])}</span>
            </div>
            `;
    return template;
}


function noEvolutionTemplate() {
    let template = `<div class="pokemonInfoNoEvolutionContainer">
        <img class="noEvolutionImg" src="img/noEvolution.png" alt="no evolution">
        <h2>End evolution!</h2>
        </div>
        `;
    return template;
}


function searchPokemonTemplate(searchIndex, actualUrl, pokemonNumber, actualPokemon, firstActualTypeCapitalized, actualId, responseAsJson) {
    let template = /*html*/`
            <div class="soloPokemonContainerSearch" id='${actualId}' onclick="openPokemonInfo(${searchIndex}, '${actualUrl}', '${pokemonNumber}')" style="background-color: rgb(247,120,107)">
            <div class="soloPokemonHeadlineContainer">
            <span> ${capitalizeFirstLetter(actualPokemon)} </span> <span class="numberOfSinglePokemon">#${pokemonNumber}</span>
            </div>
            <div class="pokemonImageAndTypeContainer">  
            <img class="pokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${searchIndex + 1}.png">
            <div class="pokemonType"><div class="typeBackgroundColor">${firstActualTypeCapitalized}</div><div class="typeBackgroundColorTwoSearch" id="typeBackgroundColorTwoSearch${searchIndex}">${setSecondActualTypeSearch(responseAsJson, searchIndex)}</div></div>
            </div>
            </div>
            ` ;
    return template;
}
