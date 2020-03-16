//Define Global variables
const allCharacters = $('.characters');
const enemies = $("#enemies");

const game = {
  /** -- Define The Game Objects Variables -- **/
  myCharacter: null,
  enemyCharacter: null,


  /** -- Define Each Character As An Object -- **/
  characters: {
    //Mario
    mario: {
      name: 'Mario',
      health: 100,
      attack: 10,
    },

    //Luigi
    luigi: {
      name: 'luigi',
      health: 120,
      attack: 8,
    },

    //Bowser
    bowser: {
      name: 'Bowser',
      health: 160,
      attack: 5,
    },

    // Princess Peach
    peach: {
      name: 'Princess Peach',
      health: 130,
      attack: 6,
    }
  },

};



/** -- Click To Choose Your Character -- **/
$(".character").on('click', function () {
  // Check if the myCharacter variable is empty
  if(game.myCharacter === null) {
    // Put chosen character into the myCharacter variable.
    game.myCharacter = game.characters[$(this).data("name")];
    console.log(game.myCharacter);

    // Shrink all characters to 500px;
    allCharacters.children().addClass("small");
    allCharacters.removeClass("full");
    // Add the class to the character that was clicked
    $(this).addClass("chosen");
    // Move selected character to the myCharacter Spot
    $(this).appendTo('#myCharacterSpot');
    allCharacters.children().appendTo("#enemies");

  } else if(game.enemyCharacter === null) {

    game.enemyCharacter = game.characters[$(this).data("name")];
    console.log(game.enemyCharacter);
    $(this).appendTo("#enemyCharacterSpot");
    $(this).addClass("chosen");
    $(".logo").addClass("battle");

  }
});

/** -- Click To Attack Your Enemy -- **/
  // Attack Enemy and take myCharacter.attack away from enemyCharacter.health
  //
