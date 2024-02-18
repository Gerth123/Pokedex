let currentPokemon; 

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    console.log('Loaded Pokemon', currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo(){
    document.getElementById('pokemonname').innerHTML = currentPokemon['name'];

}