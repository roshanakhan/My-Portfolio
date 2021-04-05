const deckCards = ["Agent.png", "Agent.png", "Pink-PowerRanger.png", "Pink-PowerRanger.png", "Flash.png", "Flash.png", "Mario.png", "Mario.png", "Mario2.png", "Mario2.png", "Police.png", "Police.png", "Blue-PowerRanger.png", "Blue-PowerRanger.png", "Chef.png", "Chef.png", "Musician.png", "Musician.png"];

const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal"); // win modal
const loseModal = document.getElementById("loseModal"); // lose modal
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn"); // win play again btn
const losePlayAgain = document.querySelector(".lose-play-again-btn"); // lose play again btn
const movesCount = document.querySelector(".moves-counter");
let moves = 0;

const timeCounter = document.querySelector(".timer");
let time;
let seconds = 60;
let timeStart = false;

// To shuffle the cards
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function startGame() {
    // To shuffle cards
    const shuffledDeck = shuffle(deckCards); 
    // Iterate over deck of cards array
    for (let i = 0; i < shuffledDeck.length; i++) {
      // Create the <li> tags
      const liTag = document.createElement('LI');
      // Give <li> class of card
      liTag.classList.add('card');
      // Create the <img> tags
      const addImage = document.createElement("IMG");
      // Append <img> to <li>
      liTag.appendChild(addImage);
      // Set the img src path with the shuffled deck
      addImage.setAttribute("src", "img/" + shuffledDeck[i]);
      // Add an alt tag to the image
      addImage.setAttribute("alt", "");
      // Update the new <li> to the deck <ul>
      deck.appendChild(liTag);
    }
  }
  startGame();

  function removeCard() {
    // As long as <ul> deck has a child node, remove it
    while (deck.hasChildNodes()) {
      deck.removeChild(deck.firstChild);
    }
  }

  function timer() {
    time = setInterval(function() {

      if (seconds > 0) {
        seconds--;
        
      timeCounter.innerHTML = " Countdown Timer: " +  seconds + " Seconds" ;
      }

        if (seconds === 0) {
        timeCounter.innerHTML = " Timeout" ;
        loseGame(); //new
      }
    }, 1000);
  }

  function stopTime() {
    clearInterval(time);
  }

  function resetEverything() {
    stopTime();
    timeStart = false;
    seconds = 60;
    timeCounter.innerHTML = " Countdown: 00:60";
    moves = 0;
    movesCount.innerHTML = 0;
    matched = [];
    opened = [];
    // Clear the deck
    removeCard();
    // Create a new shuffled deck
    startGame();
  }

  
  function movesCounter() {
    // Update the html for the moves counter
    movesCount.innerHTML ++;
    // Keep track of the number of moves for every pair checked
    moves ++;
  }

  function compareTwo() {
    // When there are 2 cards in the opened array
    if (opened.length === 2) {
        // Disable any further mouse clicks on other cards
        document.body.style.pointerEvents = "none";
    }
    // Compare the two images src
    if (opened.length === 2 && opened[0].src === opened[1].src) {
      // If matched call match()
      match();
      // console.log("It's a Match!");
    } else if (opened.length === 2 && opened[0].src != opened[1].src) {
      // If No match call noMatch()
      noMatch();
      // console.log("NO Match!");
    }
  }

  function match() {
    /* Access the two cards in opened array and add
    the class of match to the imgages parent: the <li> tag
    */
    setTimeout(function() {
      opened[0].parentElement.classList.add("match");
      opened[1].parentElement.classList.add("match");
      // Push the matched cards to the matched array
      matched.push(...opened);
      // Allow for further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Check to see if the game has been won with all 8 pairs
      winGame();
      // Clear the opened array
      opened = [];
    }, 600);
    // Call movesCounter to increment by one
    movesCounter();
  }

  function noMatch() {
    /* After 700 miliseconds the two cards open will have
    the class of flip removed from the images parent element <li>*/
    setTimeout(function() {
      // Remove class flip on images parent element
      opened[0].parentElement.classList.remove("flip");
      opened[1].parentElement.classList.remove("flip");
      // Allow further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Remove the cards from opened array
      opened = [];
    }, 700);
    // Call movesCounter to increment by one
    movesCounter();
  }

  function AddStats() {
    // Access the modal content div
    const stats = document.querySelector(".modal-content");
    // Create three different paragraphs
    for (let i = 1; i <= 3; i++) {
      // Create a new Paragraph
      const statsElement = document.createElement("p");
      // Add a class to the new Paragraph
      statsElement.classList.add("stats");
      // Add the new created <p> tag to the modal content
      stats.appendChild(statsElement);
    }
    // Select all p tags with the class of stats and update the content
    let p = stats.querySelectorAll("p.stats");
        // Set the new <p> to have the content of stats (time and moves)
      p[0].innerHTML = "Time Left: "  + seconds + " Seconds";
      p[1].innerHTML = "Moves Taken: " + moves;
  }

  // Display after winning
  function displayModal() {
    // Access the modal <span> element (x) that closes the modal
    const modalClose = document.getElementsByClassName("close")[0];
      // When the game is won set modal to display block to show it
      modal.style.display= "block";
      // When the user clicks on <span> (x), close the modal
      modalClose.onclick = function() {
        modal.style.display = "none";
      };
    // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }

    // Display after losing
    function displayLoseModal() {
        // Access the modal <span> element (x) that closes the modal
        const loseModalClose = document.getElementsByClassName("loseClose")[0];
          // When the game is lost set modal to display block to show it
          loseModal.style.display= "block";
          // When the user clicks on <span> (x), close the modal
          loseModalClose.onclick = function() {
            loseModal.style.display = "none";
          };
        // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
            if (event.target == loseModal) {
              loseModal.style.display = "none";
            }
          };
        }
  
    function loseGame() {
        if (seconds === 0) {
          stopTime();
          displayLoseModal();
          AddStats();
        }
      }

  function winGame() {
    if (matched.length === 18) {
      stopTime();
      displayModal();
      AddStats();
    }
  }

  deck.addEventListener("click", function(evt) {
    if (evt.target.nodeName === "LI") {
      // To console if I was clicking the correct element 
      console.log(evt.target.nodeName + " Was clicked");
      // Start the timer after the first click of one card
    // Executes the timer() function
      if (timeStart === false) {
        timeStart = true; 
        timer();
      }
      // Call flipCard() function
      flipCard();
    }
    //Flip the card and display cards img
    function flipCard() {
      // When <li> is clicked add the class .flip to show img
      evt.target.classList.add("flip");
      // Call addToOpened() function
      addToOpened();
    }
     
    //Add the fliped cards to the empty array of opened
    function addToOpened() {
      /* If the opened array has zero or one other img push another 
      img into the array so we can compare these two to be matched
      */
      if (opened.length === 0 || opened.length === 1) {
        // Push that img to opened array
        opened.push(evt.target.firstElementChild);
      }
      // Call compareTwo() function
      compareTwo();
    }
  });
  reset.addEventListener('click', resetEverything);
  playAgain.addEventListener('click',function() {
    modal.style.display = "none";
    resetEverything();
  });

  losePlayAgain.addEventListener('click',function() {
    loseModal.style.display = "none";
    resetEverything();
  });
 
// Ref:
  // Some soure code from: https://ourcodesolution.com/blog/card-matching-game-memory-card-game-in-javascript/
  // Character images from: https://logomakr.com/
