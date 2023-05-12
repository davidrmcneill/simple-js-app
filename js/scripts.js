let pokemonRepository = (function () {

let pokemonList = [
    {Name: 'Abra', Height: .9, Type: ['Normal','Rock']},
    {Name: 'Arbok', Height: 3.5, Type: ['Rock','Ghost']},
    {Name: 'Staryu', Height: 1.8, Type: ['Normal','Ghost']}
]

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
    button.innerText = pokemon.Name;
    button.classList.add("pokemonButton");
    listItem.appendChild(button);
    pokemonListItems.appendChild(listItem);

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

function showDetails(pokemon) {
console.log(pokemon);
}

function add(pokemon) {
    pokemonList.push(pokemon);
}

return {
    add: add,
    addListItem: addListItem,
    getAll: getAll
};

})();


pokemonRepository.getAll().forEach(function(pokemon) {
    // document.write(pokemon.Name);
    pokemonRepository.addListItem(pokemon);
     });