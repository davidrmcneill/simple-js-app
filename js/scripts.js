let pokemonList = [
    {Name: 'Abra', Height: .9, Type: ['Normal', 'Rock']},
    {Name: 'Arbok', Height: 3.5, Type: ['Rock', 'Ghost']},
    {Name: 'Staryu', Height: 1.8, Type: ['Normal','Ghost']}
]

let space = " ";
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].Height < 1) {
        document.write(pokemonList[i].Name + ":" + space + "Height" + space + pokemonList[i].Height + space + "(Small Pokemon)" + space + "<br>");
    } else if (pokemonList[i].Height < 3 && pokemonList[i].Height > 1) {
        document.write(pokemonList[i].Name + ":" + space + "Height" + space + pokemonList[i].Height + space + "(Median Pokemon)" + space + "<br>");
    } else {
        document.write(pokemonList[i].Name + ":" + space + "Height" + space + pokemonList[i].Height + space +"(Wow That Is Big!)" + space + "<br>");
    }
}