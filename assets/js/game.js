//Define Global variables
const allCharacters = $('.characters');
const enemiesDiv = $("#enemies");
const currentEnemiesDiv = $("#enemySpot");
const buttonAttack = $("#button-attack");
const attackBox = $("#attack-box");
const playerSpot = $("#playerSpot");

const marioCardHealth = $(".characters .mario .health");
const luigiCardHealth = $(".characters .luigi .health");
const toadCardHealth = $(".characters .toad .health");
const peachCardHealth = $(".characters .peach .health");

const game = {
  /** -- Define The Game Objects Variables -- **/
  player: null,
  enemy: null,
  wins: 0,

  /** -- Define Each Character As An Object -- **/
  characters: {
    //Mario
    mario: {
      name: "Mario",
      color: "success",
      health: 120,
      attack: 8,
      baseAttack: 8,
      counterAttack: 7,
    },

    // Princess Peach
    peach: {
      name: "Princess Peach",
      color: "primary",
      health: 100,
      attack: 10,
      baseAttack: 10,
      counterAttack: 6,
    },

    //Luigi
    luigi: {
      name: "luigi",
      color: "danger",
      health: 150,
      attack: 4,
      baseAttack: 4,
      counterAttack: 17,
    },

    //Toad
    toad: {
      name: "Toad",
      color: "warning",
      health: 180,
      attack: 3,
      baseAttack: 3,
      counterAttack: 25,
    },


  },

  // Select Player Character
  selectPlayer(player) {
    // Put chosen character into the player variable.
    this.player = this.characters[$(player).data("name")];
    // Shrink all characters to 500px;
    allCharacters.children().addClass("small");
    allCharacters.removeClass("full");
    // Add the class to the character that was clicked to highlight them
    $(player).appendTo("#playerSpot").addClass("chosen");
    // Add all other characters to the enemies list.
    allCharacters.children().appendTo(enemiesDiv).fadeIn("slow");
  },

  // Select Enemy Character
  selectEnemy(enemy) {
    // Put chosen character into the enemy variable
    this.enemy = this.characters[$(enemy).data("name")];
    // Put character into enemy spot
    $(enemy).appendTo("#enemySpot").addClass("chosen").fadeIn("slow");

    //Fade out anything that is left in the attack box;
    $(attackBox).children().fadeOut("slow", function () {
      $(this).remove();
      // Enable the attack button
      $(buttonAttack).prop("disabled", false);
    });

    // Have the logo slide up.
    $(".logo").addClass("battle");
    $(enemiesDiv).fadeTo(1000, .25);
    //Fade but attack button in
    $(buttonAttack).fadeIn("slow");
    // Fade the attack box in.
    $(attackBox).fadeIn("slow");
  },

  // Go through the attack sequence
  attack() {
    $(buttonAttack).prop("disabled", true);
    // Player attacks enemy
    game.playerAttack();

    // Enemy Attacks Player
    if(!this.checkIfDead(this.enemy)) {
      setTimeout(function () {game.enemyAttack()}, 1500);
      $(buttonAttack).prop("disabled", false);
    }
    this.debug();

  },

  playerAttack() {
    // Lower enemy health
    this.enemy.health -= this.player.attack;
    // Display the dmg to the user
    $(attackBox).append("<p><span class='text-"+this.player.color+"'>" + this.player.name + "</span> attacks <span class='text-"+this.enemy.color+"'>" + this.enemy.name + "</span> for <span class='text-info'>" + this.player.attack + " damage!</span></p>");

    $(attackBox).children().hide().fadeIn(500, function() {
     game.slideFade($(this));
    });
    this.updateGameText();

    // Add the baseAttack to the attack to create the new attack
    this.player.attack += this.player.baseAttack;

    // Check if enemy is dead
    if(this.checkIfDead(this.enemy)) {
      // Disable Attack Button
      $("#button-attack").prop("disabled", true);
      // Remove the enemy from the screen.
      $(currentEnemiesDiv).children().fadeOut().remove();
      //Set to no enemy
      this.enemy = null;
      $(attackBox).append("<h3>Please Choose A New Opponent</h3>");
      $(enemiesDiv).fadeTo(1000, 1);
    }

  },

  enemyAttack() {
    // Lower players health
    this.player.health -= this.enemy.counterAttack;
    //display the dmg to the user
    $(attackBox).append("<p><span class='text-"+this.enemy.color+"'>" + this.enemy.name + "</span> attacks <span class='text-"+this.player.color+"'>" + this.player.name + "</span> for <span class='text-info'>" + this.enemy.counterAttack + " damage!</span></p>");

    $(attackBox).children().fadeIn(500, function() {
      game.slideFade($(this));
    });
    this.updateGameText();

    //Check if player is dead.... I hope not!
    if(this.checkIfDead(this.player)) {
      alert("you lost")
    }
  },

  checkIfDead(player) {
    if(player === null) {
      this.wins++;
      this.checkIfWon();
      return true;
    } else if(player.health <= 0) {
      return true;
    }
    return false;
  },

  checkIfWon() {
    if(this.wins >= 3) {
      $(attackBox).children().fadeOut("slow", function () {
        $(this).remove();
      });
      setTimeout(function () {
        $(".attack").children().fadeOut('slow');

        $(playerSpot).addClass("winner");
        $(playerSpot).css("position", "absolute");
        $(playerSpot).css("top", ( $(window).height() - $(playerSpot).height() ) / 2+ "px");
        $(playerSpot).css("left", ( $(window).width() - $(playerSpot).width() ) / 2 + "px");

      }, 1500);

    }
  },

  updateGameText() {
    marioCardHealth.html(this.characters.mario.health);
    luigiCardHealth.html(this.characters.luigi.health);
    toadCardHealth.html(this.characters.toad.health);
    peachCardHealth.html(this.characters.peach.health);
  },

  slideFade(elem) {
    $(elem).css({'display':'block','opacity':'1'}).animate({'opacity':'0','top':'-=6rem'}, 2000, null, function () {
      $(this).remove();
    });
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
    game.selectPlayer($(this));
  } else if(game.enemy === null && !$(this).hasClass('chosen')) {
    game.selectEnemy($(this));
  }
});

/** -- Click To Attack Your Enemy -- **/
$('#button-attack').on("click", function() {
  game.attack();
});
  // Attack Enemy and take player.attack away from enemy.health
  //
