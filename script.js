let drink = {
  fetchDrink: function (letra) {
    letra: "a",
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`)
        .then((response) => response.json())
        .then((data) => this.drinkData(data));
  },
  drinkData: function (data) {
    // Conta;r quantos drinks tem na letra e rodar de 0 até Y para aleatorizar a escolha do drink
    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    if (data.drinks === null) {
      let rndInt;
      console.log("é vazio isso");
      document.querySelector(".outOfMenu").classList.remove("hide");
      document.querySelector(".conteudo-drink").classList.add("hide");
      rndInt = 1;
    } else {
      rndInt = randomIntFromInterval(0, data.drinks.length);
      document.querySelector(".conteudo-drink").classList.remove("hide");
      document.querySelector(".outOfMenu").classList.add("hide");
    }
    console.log(data.drinks.length);
    // Descontruo o objeto e trago alguns primeiros elementos, puxando a posição rndInt do data.drinks
    const { strDrink, strCategory, strAlcoholic, strGlass, strInstructions, ...ingDoses } = data.drinks[rndInt];

    //console.log(strDrink, strCategory, strAlcoholic, strGlass, strInstructions, ingDoses);
    this.organizeIngredMethods(strDrink, strCategory, strAlcoholic, strGlass, strInstructions, ingDoses);
  },
  organizeIngredMethods: function (strDrink, strCategory, strAlcoholic, strGlass, strInstructions, ingDoses) {
    let ingredientesDrink = [];
    let medidasDrink = [];
    // Preciso agora conseguir acessar cada ingDoses.strIngredient[1-15]

    // Transformo o objeto em array para poder acessar, numeradamente, cada propriedade. Com o .values eu puxo todos os valores de cada propriedade do objeto.
    // Preciso então puxar os valores das posições 12 até a 42 e verificar quais são nulos ou não

    const keysDrink = Object.keys(ingDoses); // objeto -> array
    //console.log(ingDoses);
    //console.log(keysDrink[26]); // estou usando para consultar a posição das propriedades

    const valuesDrink = Object.values(ingDoses); // pego os valores e jogo numa array
    //console.log(valuesDrink[1]); // listo o valor que quero

    // Pegar os ingredientes
    for (let i = 12; i < 27; i++) {
      // Aqui to falando pra rodar a partir do primeiro ingrediente até o último ingrediente
      if (valuesDrink[i] === null) {
        // Comparo se o value é null
      } else {
        ingredientesDrink.push(valuesDrink[i]);
      }
    }

    // Pegar as medidas
    for (let i = 26; i < 42; i++) {
      // Aqui to falando pra rodar a partir da primeira medida até a última
      if (valuesDrink[i] === null) {
        // Comparo se o value é null
        //console.log(`O ${keysDrink[i]} é nulo`); // Estou exibindo qual propriedade está sendo iterada
      } else {
        medidasDrink.push(valuesDrink[i]);
      }
    }

    // adicionar a vírgula+espaço como separador
    var addEspacoIngredientes = ingredientesDrink.join(", ");
    var addEspacoMedidas = medidasDrink.join(", ");

    // Unir a medida com o ingrediente
    let joinedIngMed = [];
    function joinIngMed() {
      for (let i = 0; i < medidasDrink.length; i++) {
        joinedIngMed.push([`${medidasDrink[i]} ${ingredientesDrink[i]}`]);
      }
    }
    joinIngMed();

    // adicionar a vírgula+espaço como separador
    var addEspacoIngMed = joinedIngMed.join(", ");

    this.insertData(strDrink, strCategory, strAlcoholic, strGlass, strInstructions, addEspacoIngMed);
  },

  insertData: function (strDrink, strCategory, strAlcoholic, strGlass, strInstructions, addEspacoIngMed) {
    document.querySelector(".strDrink h2").innerHTML = strDrink;
    document.querySelector(".strCategory span").innerHTML = `${strCategory}`;
    document.querySelector(".strAlcoholic span").innerHTML = `${strAlcoholic}`;
    document.querySelector(".strGlass span").innerHTML = `${strGlass}`;
    document.querySelector(".strInstructions span").innerHTML = `${strInstructions}`;
    document.querySelector(".ingredientesDrink span").innerHTML = addEspacoIngMed;
  },

  searchDrink: function () {
    drink.fetchDrink(document.querySelector(".search-bar").value);
    document.querySelector(".search button").innerHTML = "search again";
  },
};
drink.fetchDrink("a");
document.querySelector(".search button").addEventListener("click", drink.searchDrink);
document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    drink.searchDrink();
  }
});

//? ORGANIZAÇÃO

//! O que falta fazer?
//# Finalizar CSS
