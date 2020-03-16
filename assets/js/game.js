//Define Global variables
const allCharacters = $('.characters');
const enemiesDiv = $("#enemies");

const game = {
  /** -- Define The Game Objects Variables -- **/
  player: null,
  enemy: null,


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
  if(game.player === null) {
    // Put chosen character into the player variable.
    game.player = game.characters[$(this).data("name")];
    // Shrink all characters to 500px;
    allCharacters.children().addClass("small");
    allCharacters.removeClass("full");
    // Add the class to the character that was clicked to highlight them
    $(this).addClass("chosen");
    // Move selected character to the player Spot
    $(this).appendTo('#playerSpot');
    allCharacters.children().appendTo(enemiesDiv);

  } else if(game.enemy === null) {

    game.enemy = game.characters[$(this).data("name")];
    console.log(game.enemy);
    $(this).appendTo("#enemySpot");
    $(this).addClass("chosen");
    $(".logo").addClass("battle");

  }
});

/** -- Click To Attack Your Enemy -- **/
  // Attack Enemy and take player.attack away from enemy.health
  //
