# Node-Batch-Certificate-Generator

## Sobre a aplicação

**Batch** se refere a **programas de processamento em lotes**. Usualmente possuem **pouca ou nenhuma interação com o usuários**, e são **executados manualmente ou agendados** para execução periódica automatizada.

Por exemplo, um programa que lê um arquivo e gera relatórios sobre os dados lidos é um programa em batch. 

A aplicação trata-se de um **processo batch que lê dados dos participantes de minicursos do Codelab, salvos em formato csv, e gera .pdfs a partir dos dados lidos.**

![Exemplo Certificado](https://i.imgur.com/NqnHv4R.png)

## Tecnologias utilizadas
Será utilizado **node.js** para coordenar o processo. 
A leitura do arquivo será feita com o **módulo fs**, nativo do Node. 
A geração automática dos certificados, com a biblioteca **dynamic-html-pdf**, instalável por npm. 

## Sobre os módulos utilizados

### node.js
Node é um ambiente de execução de javascript em servidores. Historicamente javascript roda nos browsers, cada um com sua engine que processa os scripts. Por exemplo, o Firefox utiliza a SpiderMonkey, e o Chrome utiliza o V-8. 


O node encapsula a V-8, engine do chrome, e adiciona funções relevantes ao ambiente do servidor. 


As engines devem implementar as funcionalidades básicas do javascript (Chamado muitas vezes de Vanilla Js) de acordo com as especificações de EcmaScript. 


A EcmaScript é uma entidade de padronização responsável por definir as atuais e futuras funcionalidades básicas do Javascript. Apesar de terem o mesmo comportamento esperado, cada funcionalidade pode ser implementada de maneira diferente em cada engine. Não apenas isso, cada Engine pode ter funcionalidades extras que não estão definidas na Ecma. 


Por exemplo, a versão EcmaScript2015 (Muitas vezes chamada de ES6) definiu uma série de funcionalidades que melhoraram o uso do Javascript:


![ES6 Features](https://i.imgur.com/8Rm7MRD.png)

Um browser atualizado possui as funções mais novas do javascript (Atualmente EcmaScript 2020 - ES11). É por isso que browsers antigos ou desatualizados não conseguem utilizar estas funcionalidades, o javascript evolui continuamente. 

![Browser Hierarchy](https://i.imgur.com/Ndv4IES.png)

Além das funcionalidades da engine, cada ambiente de execução tem funções específicas que fazem sentido naquele contexto. Por exemplo, a função
```javascript
    document.getElementById()
```
Não faz parte do JS Vanilla. É uma função extra implementada nos browsers que permite acesso a elementos HTML do DOM. No ambiente de execução do browser isso faz sentido. 


Já o node é um ambiente de execução de servidor. Ele não possui essa função, pois no backend não há nenhum HTML-DOM sendo renderizado. Mas possui funções que fazem sentido em seu contexto, por exemplo:  
```node
fs.readFile()
```
Lê um arquivo e não existe no navegador, apenas no Node. 

A documentação guiada do Node é amigável e disponível em [nodejs.dev](https://nodejs.dev/learn/introduction-to-nodejs)

### fs
Módulo nativo do node para leitura de um arquivo no servidor. 
O guia para utilizar o módulo está disponível em [Reading Files with Node.js](https://nodejs.dev/learn/reading-files-with-nodejs)

### dynamic-html-pdf
A biblioteca dynamic-html-pdf gera pdfs a partir de:
  - Um objeto options, que define dimensões e orientação do documento
  - Um objeto document, que define:
    - Se a saída será um arquivo ou um Stream de dados
    - Um objeto context, que permite definir variáveis do javascript que serão utilizadas na geração de um documento dinâmico (Com campos variáveis). 

Por exemplo: 
```node
const getCertificatePDF = (name, validValuesData, validValuesQty) => {
    let html = fs.readFileSync('template.html', 'utf8');

    pdf.registerHelper('ifCond', function (v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    })

    let options = {
        orientation: "portrait",
        width: "30cm",
        height: "21cm"
    };

    const totalHours = validValuesQty * 2;
    let document = {
        type: 'file',     // 'file' or 'buffer'
        template: html,
        context: {
            name: name,
            validValuesData: validValuesData,
            totalHours: totalHours
        },
        path: "./certificate.pdf"    // it is not required if type is buffer
    };
    
    pdf.create(document, options)
        .then(res => {
            // console.log(res)
        })
        .catch(error => {
            console.error(error)
        }).then;
}
 ```
A documentação do projeto está disponível em [sua página no npmjs](https://www.npmjs.com/package/dynamic-html-pdf)

## Etapas para o desenvolvimento
### 1. Implementar template.html para doc estático
Antes de descobrir como o dynamic-html-pdf insere dados dinâmicos no template, vale a pena construir um template estático. Isso porque o módulo utiliza um headless browser (navegador sem interface gráfica) para renderizar o template.html e gerar um pdf a partir dele. 


O headless browser embutido no dynamic-html-pdf é antigo, e não possui funcionalidades novas do CSS como flexbox. 


Portanto, a estilização deverá utilizar apenas box-model (border, padding, margin). Em compensação, os certificados tem tamanho fixo (30cm x 21cm) e todas as medidas serão utilizadas em cm, o que facilita o desenvolvimento. 


O certificado está disponivel no [drive do codelab](https://drive.google.com/file/d/18JfeqGIeDuuOtQJSbj999IvMteTzbUxh/view?usp=sharing). Não é necessária uma reprodução 100% fiel, o design é uma base, mas todas seguintes informações devem estar presentes: 


1. Nome da iniciativa (dev.learn 2019 no subtitulo)
2. Nome da pessoa
3. numero USP
4. nome do curso (dev.learn 2019 no corpo)
5. data inicio do curso
6. data final do curso
7. total de horas
8. logo do codelab
9. assinaturas do presidente e sarita

### 2. Definir modelo para dados dinâmicos de document.context
Após ter um design estático pronto, é hora de passar as informações dinâmicas para que os certificados sejam personalizados. 


Das informações em 1,9 algumas são estáticas (não mudam de certificado para certificado) e outras vão mudar a cada usuário(dinâmicas). 


É necessário definir as dinâmicas em document.context 

### 3. Modificar template.html para receber infos dinâmicas
A biblioteca utiliza a sintaxe `{{variable}}` no HTML  para acessar uma variável definia em `document.context.variable`


É necessário modificartemplate.html utilizando a sintaxe específica [verificar documentação](https://www.npmjs.com/package/dynamic-html-pdf).

### 4. Gerar Certificado Dinâmico
Passos: 
1. Importar a biblioteca como pdf
2. armazenar template.html em uma variável utilizando fs.readFile()
3. definir registerHelper de pdf (copia e cola da doc)
4. definir options do pdf (portrait, 30cm width, 21cm height)
5. definir document do pdf com o contexto com tipo, template, context criado em  [2] e path do certificado
6. invocar função pdf.create(), utilizando sintaxe de promises para capturar erros


### 5. Definir CSV com headers e uma linha
CSV significa Comma Separated Values. É um arquivo textual (em oposição a binário, sua terminação é .csv não .txt) que armazena dados tabulares de maneira lível.
    
Por exemplo: 
```csv
name, id, favorite food
quincy, 1, hot dogs
beau, 2, cereal
abbey, 3, pizza
mrugesh, 4, ice cream
```
 
Você pode ler mais sobre csv neste [artigo curto](https://www.freecodecamp.org/portuguese/news/o-que-e-um-arquivo-csv-e-como-abrir-esse-formato-de-arquivo/)


Utilizaremos csv pois uma tabela simples do excel pode ser exportada como csv, e os formulários do google geram tabelas (que geram csvs), os quais utilizamos para guardar informações de inscritos em eventos.

Antes de fazer um csv com todos os casos de teste, é interessante testar com um só para que o escopo dos possíveis erros seja reduzido. Lembre-se de utilizar o modelo definido no passo 2.

### 6. Iplementar função para ler .csv
Utilizar como base artigo [Reading Files with Node.js](https://nodejs.dev/learn/reading-files-with-nodejs)

### 7. Gerar certificado dinâmico usando uma linha do csv

### 8. Modificar .csv para que contenha 10 casos de teste

### 9. Adicionar função que lê todas as linhas do csv 

### 10. Implementar função que gera pdf para cada linha do csv lida
O passo pode envolver a criação de um  **id unico** para o nome do arquivo. Pode-se utilizar o e-mail + nome do curso num primeiro momento

## Bonus
Estamos assumindo que o csv está bem formatado e nenhuma pessoa mal intencionada tentou quebrar a aplicação utilizando campos mal formatados (Ex: \n solto pode quebrar o módulo de leitura do csv) ou mesmo injetar código. 

Caso sobre tempo, poderão ser adicionados os seguintes passos:

### 11. Sanitizar dados do csv
Pode ser utilizada a biblioteca `Joi` para isso

### 12. Enviar certificados por e-mail
Utilizar biblioteca NodeMailer, [ler artigo](https://devdotcode.com/how-to-send-email-from-node-js-api-using-gmail/)


## Exemplo de implementação
Implementamos um [gerador de certificados](https://github.com/nluizsoliveira/Certificate-Generator) que pode ser utilizado para verificar detalhes de implementação 


# Instruções adicionais

## Sobre Github
Não é mais possível clonar e contribuir um repositório sem um Personal Access Token ou chave SSH. 

Recomendo o uso de uma Chave SSH, mas o token é suficiente 

Para isso, leia os tutoriais: 
- https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- https://docs.github.com/en/authentication/connecting-to-github-with-ssh/
## Sobre node
A terminação dos arquivos em node é `.js`.
Por exemplo, você pode criar um arquivo
`main.js` ou `server.js` e executá-lo com 

```
node main.js
```
## Sobre NPM
NPM singifca Node Package Manager. Ele é o programa pelo qual você irá salvar localmente as dependências do seu projeto. Pois é ruim salvar dependencias globalmente 

Para instalar uma dependencia, primeiro utilize:

```bash
npm init
```
Em seguida, utilize o comando
```
npm install library --save
```
Para instalar o pacote e salvar seu nome em package.json

Isso irá criar uma pasta `node_modules/` com os arquivos das dependências e salvar seu nome em `package.json`

**Rodar um script node**
Utilize `npm run script`, sendo script definido em package.json

## Instruções Github
Você precisará criar uma branch para implementar a sua parte do projeto.
Para isto, utilize a interface do VSCode ou utilize o comando:
```bash
git checkout -b branchName
```
E desenvolva normalmente na sua branch.


Pode ser que a branch main tenha sido atualizada. Você não precisa necessariamente atualizar a sua branch com modificações na main caso sua função esteja independente de mudanças na main. Caso contrário, você pode atualizar sua branch com mudanças feitas pelos outros na main com:
```bash
git pull origin main
```

