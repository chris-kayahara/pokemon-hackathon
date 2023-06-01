//api

const API_URL = "https://pokeapi.co/api/v2"

let pokemonContainer = document.querySelector(".pokemon__card-container");

class Pokemon {
    constructor (name, types, ability, moves, stats, bst, description, id, spriteUrl) {
        this.name = name;
        this.ability = ability;
        this.moves = moves;
        this.stats = stats;
        this.bst = bst;
        this.description = description;
        this.id = id;
        this.spriteUrl = spriteUrl;
        this.types = types;
    }
}

const newTeam = []

const randomPokemon = () => {
    pokemonContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        axios
        .get(`${API_URL}/pokemon/${Math.floor(Math.random()*1008)}/`)
        .then((result) => {
            const pokemon = result.data;
            console.log(pokemon);
            const moves = []
            let description = ""
            axios
            .get(`${API_URL}/pokemon-species/${pokemon.id}`)
                .then((result) => {
                    for (let i = 0; i < result.data.flavor_text_entries.length; i++) {
                        if (result.data.flavor_text_entries[i].language.name === 'en') {
                            description = result.data.flavor_text_entries[i].flavor_text;
                            return;
                        }
                    }
                })
                .then((result) => {
                    for ( let i = 0; i < 4; i++) {
                        moves.push(
                            pokemon.moves[Math.floor(Math.random()*pokemon.moves.length)].move.name
                        )
                    }
                    let bst = 0
                    for (let i = 0; i < pokemon.stats.length; i++) {
                        bst += pokemon.stats[i].base_stat
                    }
                    const returnPokemon = new Pokemon(
                        pokemon.name, pokemon.types, pokemon.abilities, moves, pokemon.stats, bst, description, pokemon.id, pokemon.sprites.front_default
                    )
                    console.log(returnPokemon);
                    generatePokemon(returnPokemon);
                    // return returnPokemon;
                })
                // .then((result) => {
                //     newTeam.push(result)
                // })
                .catch((error) => {
                    console.log(error)
                });    
        })
    }
}

randomPokemon();


//add event listener for new team
let heroButton = document.querySelector(".hero__btn");
console.log(heroButton);
heroButton.addEventListener('click', (e) => {
    randomPokemon();
    console.log(e);
})



function generatePokemon(pokemon) {
    let pokemonCard = document.createElement("article");
    pokemonCard.classList.add("pokemon");

    // Create Pokemon Name Heading
    createTextElement("h3", pokemon.name, "pokemon__name", pokemonCard); //****** */

    // Create overall content container
    let pokemonContent = document.createElement("div");
    pokemonContent.classList.add("pokemon__content");
    pokemonCard.appendChild(pokemonContent);

    // Create image and append
    let pokemonImage = document.createElement("img");
    pokemonImage.classList.add("pokemon__image");
    pokemonImage.setAttribute("src", pokemon.spriteUrl); //****** */
    pokemonContent.appendChild(pokemonImage);

    // Create decorative buttons
    let decorButton1 = document.createElement("div");
    decorButton1.classList.add("pokemon__decor-button1");
    pokemonContent.appendChild(decorButton1);

    let decorButton2 = document.createElement("div");
    decorButton2.classList.add("pokemon__decor-button2");
    pokemonContent.appendChild(decorButton2);

    let decorButton3 = document.createElement("div");
    decorButton3.classList.add("pokemon__decor-button3");
    pokemonContent.appendChild(decorButton3);
    
    // //TYPES
    let typeDiv = document.createElement('div');
    typeDiv.classList.add('pokemon__type-container')
    pokemonContent.appendChild(typeDiv);
    for (type of pokemon.types) {
        createTextElement('p', type.type.name, `pokemon__type-${type.type.name}`, typeDiv)
        console.log(type.type.name);
    }

    // DESCRIPTION
    // Create description container
    let pokemonDescriptionContainer = document.createElement("div");
    pokemonDescriptionContainer.classList.add("pokemon__description-container");

    let description = pokemon.description.replace(/(\r\n|\n|\r)/gm, " ");
    console.log(description);


    // Create description content
    createTextElement("h4", "DESCRIPTION", "h4", pokemonDescriptionContainer);
    if (description !== "") {
        createTextElement("p", description, "pokemon__description", pokemonDescriptionContainer);
    } else {
        createTextElement("p", "No description available", "pokemon__description", pokemonDescriptionContainer);
    }
    pokemonContent.appendChild(pokemonDescriptionContainer);


    // STATS
    // Create Stats Container
    let pokemonStatsContainer = document.createElement("div");
    pokemonStatsContainer.classList.add("pokemon__stats-container");

    // Create Stats content
    createTextElement("h4", "STATS", "h4", pokemonStatsContainer);
    // HP
    let hpRow = document.createElement("div");
    hpRow.classList.add("pokemon__stat-row");
    createTextElement("p", "HP:", "pokemon__stat", hpRow);
    createTextElement("p", pokemon.stats[0].base_stat, "pokemon__stat-num", hpRow); //****** */
    pokemonStatsContainer.appendChild(hpRow);
    // Attack
    let attackRow = document.createElement("div");
    attackRow.classList.add("pokemon__stat-row");
    createTextElement("p", "Attack:", "pokemon__stat", attackRow);
    createTextElement("p", pokemon.stats[1].base_stat, "pokemon__stat-num", attackRow); //****** */
    pokemonStatsContainer.appendChild(attackRow);
    // Defense
    let defenseRow = document.createElement("div");
    defenseRow.classList.add("pokemon__stat-row");
    createTextElement("p", "Defense:", "pokemon__stat", defenseRow);
    createTextElement("p", pokemon.stats[2].base_stat, "pokemon__stat-num", defenseRow); //****** */
    pokemonStatsContainer.appendChild(defenseRow);
    // Special Attack
    let specialAttackRow = document.createElement("div");
    specialAttackRow.classList.add("pokemon__stat-row");
    createTextElement("p", "Sp. Attack:", "pokemon__stat", specialAttackRow);
    createTextElement("p", pokemon.stats[3].base_stat, "pokemon__stat-num", specialAttackRow); //****** */
    pokemonStatsContainer.appendChild(specialAttackRow);
    // Special Defense
    let specialDefenseRow = document.createElement("div");
    specialDefenseRow.classList.add("pokemon__stat-row");
    createTextElement("p", "Sp. Defense:", "pokemon__stat", specialDefenseRow);
    createTextElement("p", pokemon.stats[4].base_stat, "pokemon__stat-num", specialDefenseRow); //****** */
    pokemonStatsContainer.appendChild(specialDefenseRow);
    // Speed
    let speedRow = document.createElement("div");
    speedRow.classList.add("pokemon__stat-row");
    createTextElement("p", "Speed:", "pokemon__stat", speedRow);
    createTextElement("p", pokemon.stats[5].base_stat, "pokemon__stat-num", speedRow); //****** */
    pokemonStatsContainer.appendChild(speedRow);

    // Base Stat Total
    let bstRow = document.createElement('div');
    bstRow.classList.add('pokemon__stat-row-bst');
    createTextElement('p', 'Total:', 'pokemon__stat', bstRow);
    createTextElement('p', pokemon.bst, 'pokemon__stat-num', bstRow);
    pokemonStatsContainer.appendChild(bstRow);

    pokemonContent.appendChild(pokemonStatsContainer);

    // MOVES
    // Create moves container
    let pokemonMovesContainer = document.createElement("div");
    pokemonMovesContainer.classList.add("pokemon__moves-container");

    // Create Moves Content
    createTextElement("h4", "MOVES", "h4", pokemonMovesContainer);
    let movesList = document.createElement("ul");
    movesList.classList.add("pokemon__moves-list");
    pokemonMovesContainer.appendChild(movesList);

    for (i = 0; i < pokemon.moves.length; i++) {
        createTextElement("li", pokemon.moves[i], "pokemon__move", movesList); //****** */
    }

    pokemonContent.appendChild(pokemonMovesContainer);

    // Append final pokemonCard
    pokemonContainer.appendChild(pokemonCard);
}

// Function to create paragraph elements by providing: content, class, and container
function createTextElement (elementType, paraText, paraClass, container) {
    let paraElement = document.createElement(elementType);
    paraElement.innerText = paraText;
    paraElement.classList.add(paraClass);
    container.appendChild(paraElement);
}