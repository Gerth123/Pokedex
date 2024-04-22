let pokemons = [
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff",
    "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro",
    "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu",
    "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew",
];


let pokemonsWithEvolution = ["bulbasaur", "ivysaur", "charmander", "charmeleon", "squirtle", "wartortle", "caterpie", "metapod", "weedle", "kakuna", "pidgey", "pidgeotto", "rattata", "spearow", "ekans", "pikachu", "sandshrew", "nidoran-f", "nidorina", "nidoran-m", "nidorino", "clefairy", "vulpix", "jigglypuff", "zubat", "oddish", "gloom", "paras", "venonat", "diglett", "meowth", "psyduck", "mankey", "growlithe", "poliwag", "poliwhirl", "abra", "kadabra", "machop", "machoke", "bellsprout", "weepinbell", "tentacool", "geodude", "graveler", "ponyta", "slowpoke", "magnemite", "farfetchd", "doduo", "seel", "grimer", "shellder", "gastly", "haunter", "onix", "drowzee", "krabby", "voltorb", "exeggcute", "cubone", "lickitung", "koffing", "rhyhorn", "chansey", "tangela", "horsea", "goldeen", "staryu", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "eevee", "porygon", "omanyte", "kabuto", "aerodactyl", "snorlax", "dratini"];


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


let url = 'https://pokeapi.co/api/v2/pokemon/';


let actualPokemonUsed = [];


let actualPokemonImgUrl = [];


let actualTypes = [];


let pokemonsIndexBig = [];


let correctedWeight = [];


let searchPokemonExists = false;


let pokemonCount = {
    'start': 0,
    'end': 20,
}


let pokemonInfoBottomStatus = {
    'pokemonInfoBottomAbout': true,
    'pokemonInfoBottomBaseStats': false,
    'pokemonInfoBottomEvolution': false,
    'pokemonInfoBottomMoves': false,
}


let pokemonInfoBottom = ['pokemonInfoBottomAbout', 'pokemonInfoBottomBaseStats', 'pokemonInfoBottomEvolution', 'pokemonInfoBottomMoves']


let pokemonInfoContainer = ['aboutContainer', 'baseStatsContainer', 'evolutionContainer', 'movesContainer']


let choosePokemonLoad = false;