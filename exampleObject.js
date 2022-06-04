// Estrutura de dados, assim como array
// No array, você acessa a informação com array[index], index int
// "Como se fosse" um array em que o indice não precisa ser int

// "Chave" pode ser int, double, string, qualquer objeto "hasheavel"
// Gerar um identificador (preferencialmente unico) a partir de um objeto. 

// Objeto que guarda comidas favoritas de pessoas
// Sintaxe de declaração chaves {}
// Linhas de duplas de chave: valor,

// dicionario(python), objeto, hashmap, map (estruturas por tras)
const favouriteFoods = {
    "joao 1": "pizza",
    "maria": "strogonoff",
    "joao 2": "pão com ovo"
}

console.log(favouriteFoods)
// acesso em O[1]
// Assim como no array, se você tem o index de um valor, você
// consegue acessar em O[1], no objeto se você tem chave você consegue
// acessar uma chave em O[1]. 

//CHAVES DEVEM SER UNICAS! 
console.log(favouriteFoods["joao 1"]);
console.log(favouriteFoods["joao 2"]);

const meuNome = "joao 1";

console.log(favouriteFoods[meuNome]);

// Objeto (Instância de classe) built-in chamado Object que provê
// Metodos para manipular objetos.

console.log(" ======== Iterando sobre Chaves do Obj ==== ")
// Saiba que não necessariamente isso está na ordem que vc salvou. 
for(const key of Object.keys(favouriteFoods)){
    console.log(key)
}

console.log(" ======== Iterando sobre Chaves do obj ==== ")

for(const value of Object.values(favouriteFoods)){
    console.log(value)
}

console.log(" ======== Iterando sobre Chaves, valores do obj ==== ")
for(const [key, value] of Object.entries(favouriteFoods)){
    console.log("chave: ", key, " valor: ", value)
}

// Objetos podem ter outros objetos e mesmo funções como valores

const animals = {
    mamifero: {
        carnivoro: "baleia",
        "herbivoro": "vaca", // se o nome da chave seguir as regras de variavel, é possivel declarar como variável
    },
    aves: {
        carnivoro: "gavião",
        grande: "harpia"
    }
}

console.log("=== Trabalhando sobre animals ===")
console.log(animals.mamifero.carnivoro)
console.log(animals.aves.grande)

