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

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon.name, pokemon.height);
        });
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function showLoadingMessage() {
        document.querySelector("#message").innerHTML = "Your Pokemon Data is Being Loaded";
    }

    function hideLoadingMessage() {
        document.querySelector("#message").innerHTML = "";
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

    function showModal(title, text) {
        let modalContainer = document.querySelector('#modal-container');

        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal();
    });

    document.querySelector('#show-dialog').addEventListener('click', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?');
    });

    let dialogPromiseReject; // This can be set later, by showDialog

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
          }
    }

    function showDialog(title, text) {
        showModal(title, text);

        // We have defined modalContainer here
        let modalContainer = document.querySelector('#modal-container');

        // We want to add a confirm and cancel button to the modal
        let modal = modalContainer.querySelector('.modal');

        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        // We want to focus the confirmButton so that the user can simply press Enter
        confirmButton.focus();

        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () => {
              dialogPromiseReject = null; // Reset this
              hideModal();
              resolve();
            });
          
            // This can be used to reject from other functions
            dialogPromiseReject = reject;
          });
    }

    document.querySelector('#show-dialog').addEventListener('click', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?').then(function () {
            alert('confirmed!');
        }, () => {
            alert('not confirmed');
        });
    });

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //   modalContainer.addEventListener('click', (e) => {
    //     // Since this is also triggered when clicking INSIDE the modal
    //     // We only want to close if the user clicks directly on the overlay
    //     let target = e.target;
    //     if (target === modalContainer) {
    //       hideModal();
    //     }
    //   });

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

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