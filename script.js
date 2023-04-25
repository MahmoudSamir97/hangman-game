// select the dom Elements
const optionsContainer = document.getElementById('options-container');
const letterContainer = document.getElementById('letter-container');
const userInputSection = document.getElementById('user-input-section');
const newGameContainer = document.getElementById('new-game-container');
const resultText = document.getElementById('result-text');
const newGameButton = document.getElementById('new-game-button');
let count = 0;
let winCount = 0;
let chosenWord = "";
let options = {
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
  countries: [
    "India",
    "Hungary",
    "Kyrgyzstan",
    "Switzerland",
    "Zimbabwe",
    "Dominica",
  ],
};

const displayOptions = ()=>{
  optionsContainer.innerHTML = `<h3>Please select an option</h3> `;
  let buttonsDiv = document.createElement('div');
  for (let value in options){
    buttonsDiv.innerHTML += `<button class="options" onclick="generateWord('${value}')" > ${value} </button>`
  }
  optionsContainer.appendChild(buttonsDiv);
}

const generateWord = optionValue => {
  letterContainer.classList.remove('hide');
  const optionButtons = document.querySelectorAll('.options');
  optionButtons.forEach(button=>{
    if(optionValue === button.innerText.toLowerCase()){
      button.classList.add('active');
    }else {
      button.disabled = true;
    }

  });
  let optionsArray = options[optionValue];
  chosenWord = optionsArray[Math.floor(Math.random() * optionsArray.length)];
  chosenWord = chosenWord.toUpperCase();
  // render daches equla to upperCase chosen word
  const dachesString = chosenWord.replace(/./g, `<span class="daches">_</span>`)
  userInputSection.innerHTML = dachesString;


};


const blocker = ()=>{
  let optionButtons = document.querySelectorAll('.options');
  let letterButtons = document.querySelectorAll('.letters');
  optionButtons.forEach(button=>{
    button.disabled = true;
  });
  letterButtons.forEach(button=>{
    button.disabled = true;
  });
  newGameContainer.classList.remove('hide');
}

const initializer = ()=>{
  count = 0;
  winCount = 0;
  letterContainer.innerText = "";
  userInputSection.innerText = "";
  optionsContainer.innerText = "";
  letterContainer.classList.add('hide');
  newGameContainer.classList.add('hide');

  // generate A-Z letters in javaScript 
  for( let i =65 ; i<91 ; i++){
    let button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    button.classList.add('letters');
    button.addEventListener('click',()=>{
      console.log(chosenWord)
      let chosenWordArray = chosenWord.split("");
      let dachesArray = document.querySelectorAll('.daches');
      if(chosenWordArray.includes(button.innerText)){
        chosenWordArray.forEach((char,index)=>{
          if(char === button.innerText){
            winCount += 1;
            dachesArray[index].innerText = char;
            if(winCount === chosenWordArray.length){
              resultText.innerHTML = `<h2 class="win-msg">You Won! </h2><p>The Word was <span>${chosenWord} </span> </p>`;
              blocker();
            }
          }
        } )

      }else {
        count += 1;
        if (count == 6){
          resultText.innerHTML = `<h2 class="lose-msg">Game Over! </h2><p>The Word was <span>${chosenWord} </span> </p>`;
          blocker();
        }
      }
      button.disabled = true;
    })

    letterContainer.appendChild(button);
  }
  displayOptions();
}




window.onload = initializer;
newGameButton.addEventListener('click', initializer);