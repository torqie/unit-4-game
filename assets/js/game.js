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
      baseAttack: 10,
      attack: 10,
    },

    //Luigi
    luigi: {
      name: 'luigi',
      health: 120,
      baseAttack: 8,
      attack: 8,
    },

    //Bowser
    toad: {
      name: 'Toad',
      health: 160,
      baseAttack: 5,
      attack: 5,
    },

    // Princess Peach
    peach: {
      name: 'Princess Peach',
      health: 130,
      baseAttack: 6,
      attack: 6,
    }
  },

  attack() {
    // Player attacks enemy with attack property
    // Display the dmg to the user
    // Lower enemy health
    // Check if enemy is dead
    // Add the baseAttack to the attack to create the new attack

    // Pause for 1 second

    //enemy attacks player with attack property
    //display the dmg to the user
    //lower player health
    //Check if player is dead
  }

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
    allCharacters.children().appendTo(enemiesDiv).fadeIn();

  } else if(game.enemy === null) {

    game.enemy = game.characters[$(this).data("name")];
    console.log(game.enemy);
    $(this).appendTo("#enemySpot");
    $(this).addClass("chosen");
    $(".logo").addClass("battle");
    $("#button-attack").fadeIn("slow");

  }
});

/** -- Click To Attack Your Enemy -- **/
$('#button-attack').on("click", function() {

});
  // Attack Enemy and take player.attack away from enemy.health
  //
