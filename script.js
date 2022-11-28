const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let count = 0
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // My work
    count++
    newDiv.dataset.id = count

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// My work:
let hasFlippedCard = false
let cardClass_1, cardClass_2, innerCard_1, innerCard_2, card1_dataID, card2_dataID, clickedCount = 0
let cardContainer = []
// TODO: Implement this function!
function handleCardClick(event) {
  if(event.target.classList != "solved"){
    clickedCount++
  if(clickedCount % 2 === 0) {
    for(const child of gameContainer.children) {
      setTimeout(function() {
        child.addEventListener("click", handleCardClick)
      }, 1100)
      child.removeEventListener("click", handleCardClick)
    }
  }
  if(!hasFlippedCard) {
    // first click
    hasFlippedCard = true
    innerCard_1 = event.target
    innerCard_1.removeEventListener("click", handleCardClick)
    card1_dataID = innerCard_1.dataset.id
    cardClass_1 = event.target.getAttribute('class')
    cardContainer.push(innerCard_1)
    // colors current card
    event.target.style.backgroundColor = cardClass_1
  } else {
    // second click
    innerCard_2 = event.target
    card2_dataID = innerCard_2.dataset.id
    // check if the data-id are the same
    if(card2_dataID != card1_dataID){
      hasFlippedCard = false
      cardClass_2 = event.target.getAttribute('class')
      cardContainer.push(innerCard_2)
      // colors current card
      event.target.style.backgroundColor = cardClass_2
      // compare to see if firstCard is equal to secondCard
      if(cardClass_1 === cardClass_2) {
        // then there is a match!
        cardContainer.forEach(card => card.style.backgroundColor = cardClass_1)
        setTimeout(function(){
          innerCard_1.style.backgroundColor = cardClass_1
          innerCard_2.style.backgroundColor = cardClass_2
          innerCard_1.setAttribute("class", "solved")
          innerCard_2.setAttribute("class", "solved")
          innerCard_1.removeEventListener("click", handleCardClick)
          innerCard_2.removeEventListener("click", handleCardClick)
        }, 1000)
        cardContainer = []
      } else {
        // no match, clear the array and reset
        setTimeout(function() {
          cardContainer.forEach(card => card.style.backgroundColor = 'white')
          cardContainer = []
        }, 1000)
      }
    }
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  }
  
};

// when the DOM loads
createDivsForColors(shuffledColors);

/* */