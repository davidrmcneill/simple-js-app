let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    /**
     * Adds one pokemon button to the UL element
     * @param {*} pokemon 
     */
    function addListItem(pokemon) {

        let pokemonListItems = document.querySelector(".pokemon-list");
        pokemonListItems.classList.add("list-group");

        // create one LI and set its class
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        // create the button with the pokemon name
        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.classList.add("pokemonButton");
        // set Bootstrap modal required attributes to run
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
        button.innerText = pokemon.name;

        // add the button to the LI
        listItem.appendChild(button);

        // add the LI to the UL
        pokemonListItems.appendChild(listItem);

        // attach an event listener to the newly created button so it opens the modal when clicked
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }


    /**
     * Loads the details of the pokemon from the API and changes the modal content 
     * @param {*} pokemon 
     */
    function showDetails(pokemon) {

        // get details for this pokemon from the API and then...
        loadDetails(pokemon).then(function () {

            console.log(pokemon); // so we can see what the info looks like

            // build and IMG and set its source to whatever the API responded e.g. https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png
            let myImage = document.createElement('img');
            myImage.src = pokemon.imageUrl;

            // add the pokemon name as the title of the modal
            document.querySelector('#pokemonModalTitle').innerText = pokemon.name;
            // add the pokemon image as the modal content
            document.querySelector('#pokemonInfo').replaceChildren(myImage);
        });
    }



    /**
     * Loads the whole list of pokemons and adds them to the UL element as Bootstrap buttons
     * @returns 
     */
    function loadList() {
        document.querySelector("#message").innerHTML = "Your Pokemon Data is Being Loaded";
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            document.querySelector("#message").innerHTML = "";
        }).catch(function (e) {
            console.error(e);
        })
    }



    /**
     * Will call the pokemon API and respond with pokemon info in Json format like this:
     * {name: 'charmeleon', detailsUrl: 'https://pokeapi.co/api/v2/pokemon/5/', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png', height: 11, types: Array(1)}
     * @param {*} item 
     * @returns 
     */
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    /**
     * Adds one pokemon to the pokemon list
     * @param {*} pokemon 
     */
    function add(pokemon) {
        pokemonList.push(pokemon);
    }


    /**
     * @returns the whole list of pokemons
     */
    function getAll() {
        return pokemonList;
    }


    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();



// this will run when the page loads and populates the pokemon list
pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});