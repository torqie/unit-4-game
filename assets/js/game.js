//Define Global variables
const allCharacters = $('.characters');
const enemiesDiv = $("#enemies");

const marioCardHealth = $(".characters .mario .health");
const luigiCardHealth = $(".characters .luigi .health");
const toadCardHealth = $(".characters .toad .health");
const peachCardHealth = $(".characters .peach .health");

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

    /** -- Player attacks enemy -- **/
    // Pause for 3 seconds
    game.playerAttack();
    setTimeout(function () {game.enemyAttack()}, 1500);

    //enemy attacks player with attack property


  },

  playerAttack() {
    const enemy = this.enemy;
    const player = this.player;
    const attackBox = $("#attack-box");
    // Lower enemy health
    enemy.health = enemy.health - player.attack;
    // Display the dmg to the user
    $(attackBox).append("<p class='text-success'>"+ player.name +" attacks " + enemy.name + " for " + player.attack + " damage!</p>");
    $(attackBox).children().hide().fadeIn(500, function() {
      $(this).fadeOut(1000, function () {
        $(this).remove()
      })
    });
    this.updateGameText();
    // Check if enemy is dead
    // Add the baseAttack to the attack to create the new attack
    player.attack += player.baseAttack;
  },

  enemyAttack() {
    const enemy = this.enemy;
    const player = this.player;
    const attackBox = $("#attack-box");
    // Lower players health
    player.health -= enemy.attack;
    //display the dmg to the user
    $(attackBox).append("<p class='text-danger'>"+ enemy.name +" attacks " + player.name + " for " + enemy.attack + " damage!</p>");
    $(attackBox).children().hide().fadeIn(500, function() {
      $(this).fadeOut(1000, function () {
        $(this).remove()
      })
    });
    this.updateGameText();

    //Check if player is dead
  },

  updateGameText() {
    marioCardHealth.html(this.characters.mario.health);
    luigiCardHealth.html(this.characters.luigi.health);
    toadCardHealth.html(this.characters.toad.health);
    peachCardHealth.html(this.characters.peach.health);
  },

  debug() {
    console.log(this.player);
    console.log(this.enemy);
    console.log("-------------------------------");
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
    $(this).appendTo("#enemySpot");
    $(this).addClass("chosen");
    $(".logo").addClass("battle");
    $("#button-attack").fadeIn("slow");
    $("#attack-box").fadeIn("slow");

  }
});

/** -- Click To Attack Your Enemy -- **/
$('#button-attack').on("click", function() {
  game.attack();
});
  // Attack Enemy and take player.attack away from enemy.health
  //
