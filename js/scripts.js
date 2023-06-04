let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // let space = " ";
    // for (let i = 0; i < pokemonList.length; i++) {
    //     if (pokemonList[i].Height < 1) {
    //         document.write(pokemonList[i].Name + ":" + space + "Height" + space + pokemonList[i].Height + space + "(Small Pokemon)" + space);
    //     } else if (pokemonList[i].Height < 3 && pokemonList[i].Height > 1) {
    //         document.write("<p>" + pokemonList[i].Name + ":" + space + "Height" + space + pokemonList[i].Height + space + "(Median Pokemon)" + space + "</p>");
    //     } else {
    //         document.write("<p>" + pokemonList[i].Name + ":" + space + "Height" + space + pokemonList[i].Height + space +"(Wow That Is Big!)" + space + "</p>");
    //     }
    // }

    // internal anonymous function
    // pokemonList.forEach(function(pokemon) {
    //     document.write(pokemon.Name + ' is ' + pokemon.Height + ' tall and is ' + pokemon.Type[0] + ', ' + pokemon.Type[1] + '<br>')
    //  });

    // arrow function
    // pokemonList.forEach( (pokemon) => document.write(pokemon.Name + ' is ' + pokemon.Height + ' tall and is ' + pokemon.Type[0] + ', ' + pokemon.Type[1] + '<br>'));

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {

        let pokemonListItems = document.querySelector(".pokemon-list");
        pokemonListItems.classList.add("list-group");
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        let button = document.createElement("button");
        button.classList.add("btn-block");
        button.classList.add("btn-lg");
        button.classList.add("btn-primary");
        button.innerText = pokemon.name;
        button.classList.add("pokemonButton");
        listItem.appendChild(button);
        pokemonListItems.appendChild(listItem);

        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    // function showDetails(pokemon) {
    //     console.log(pokemon);
    // }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function showLoadingMessage() {
        document.querySelector("#message").innerHTML="Your Pokemon Data is Being Loaded";
    }

    function hideLoadingMessage() {
        document.querySelector("#message").innerHTML="";
    }

    function loadList() {
        showLoadingMessage()
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
            hideLoadingMessage()
        }).catch(function (e) {
            console.error(e);
        })
    }

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

    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();


// pokemonRepository.getAll().forEach(function (pokemon) {
//     // document.write(pokemon.Name);
//     pokemonRepository.addListItem(pokemon);
// });

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});