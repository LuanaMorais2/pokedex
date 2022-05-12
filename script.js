const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = () => {
  const pokemonPromises = [];

  for (let i = 1; i <= 25; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }

  Promise.all(pokemonPromises).then((pokemons) => {
    const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      accumulator += `
      <li class="card">
      <img class="card-image ${types[0]}" alt="${
        pokemon.name
      }" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${
        pokemon.id
      }.png">
      <h2 class="card-title">${pokemon.name}</h2>
      <p class="id-title">ID: ${pokemon.id}</p>
      <p class="card-subtitle">${types.join(" | ")}</p>
      </li>`;

      return accumulator;
    }, "");

    const ul = document.querySelector('[data-js="pokedex"]');

    ul.innerHTML = lisPokemons;
  });
};

fetchPokemon();
