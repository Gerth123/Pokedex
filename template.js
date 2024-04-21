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
                 <img class="pokemonInfoPokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsIndex + 1}.svg">
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
                             <span>${await capitalizeFirstLetterUniversal(responseAsJson['abilities']['0']['ability']['name'])}, ${await capitalizeFirstLetterUniversal(responseAsJson['abilities']['1']['ability']['name'])}</span>
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

