/*
    Objeto é uma estrutura de dados que é implementada por baixos dos panos
    utilizando-se um map/hashmap. Também pode ser chamado de dicionário a
    depender da linguagem.

    Armazenar dados no <chave,valor>

    A syntaxe para declarar um objeto é {
        chave1:valor1,
        chave2:valor2,
        ...
    }

    você pode pensar no objeto como um array, no sentido de que obter
    um dado dele tem complexidade O(1)

    NO array, o nome disso é indice e você acessa com array[i]
    O objeto é """como se fosse""" um array em que os indices(chaves) podem ser
    inteiros, doubles, strings, ou qualquer outra coisa "hasheável" (string unica)
*/

// declara entre {}
// cada <chave, valor> é declarada como "chave": valor
// todas as linhas tem virgula menos a ultima!!!
// chaves devem ser UNICAS!!!!
const favouriteFoods = {
    "joao": "pizza",
    "nelson": "strogonoff",  
    "maria": "sushi",
    "pedro henrique": 'pão com ovo',
    "maria 2": "nuggets"
}

console.log(favouriteFoods)
console.log("=== acessando valores por chave de um objeto ===")
console.log(favouriteFoods.joao)
console.log(favouriteFoods["joao"])
console.log(favouriteFoods["pedro henrique"])

const myName = "nelson"
console.log(favouriteFoods[myName])
console.log(favouriteFoods.maria)
console.log(favouriteFoods["maria 2"])


// custo o(N), você não iterará sobre obj a não ser que PRECISE fazer algo
// com todos os campos
console.log("=== iterar sobre o objeto ===")
// É necessário utilizar Object.values()
// Object.keys()
// Object.entries()
/* NÃO FUNCIONA
for(const value of favouriteFoods){
    console.log(value)
}
*/
console.log("=== iterar sobre valores ===")

for(const myValue of Object.values(favouriteFoods)){
    console.log(myValue)
}

console.log("=== iterar sobre o chaves ===")

for(const myKey of Object.keys(favouriteFoods)){
    console.log(myKey)
}

console.log("=== iterar sobre chaves e valores ===")

//[joao, pizza]
// utilizar sintaxe de desestruturação de arrays
// myKey = array[0] = joao
// myValue = array[1] = pizza
for(const [myKey, myValue] of Object.entries(favouriteFoods)){
    console.log("Key ", myKey, " value : ", myValue)
}


// Os valores podem ser QUALQUER COISA
// isso inclui outros objetos e funções

const animals = {
    mamifero:{
        carnivoro: "tigre",
        herbivoro: "vaca",
        patas: {
            "quadrupede": 4,
            "bipede": 2
        }
    },
    reptil: {
        carnivoro: "jacare",
        onivoro: "jabuti"
    }
}

console.log("=== objetos encadeados ===")
console.log(animals)
console.log("=== iterando sobre objetos encadeados ===")
for(const [key, value] of Object.entries(animals)){
    console.log("key: ", key, " value: ", value)
}