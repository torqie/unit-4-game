//Define Global variables
const allCharacters = $('.characters');
const enemiesDiv = $("#enemies");
const currentEnemiesDiv = $("#enemySpot");
const buttonAttack = $("#button-attack");
const attackBox = $("#attack-box");
const playerSpot = $("#playerSpot");

const marioCard = $(".characters .mario");
const luigiCard = $(".characters .luigi");
const toadCard = $(".characters .toad");
const peachCard = $(".characters .peach");

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
      name: "Peach",
      color: "primary",
      health: 100,
      attack: 10,
      baseAttack: 10,
      counterAttack: 6,
    },

    //Luigi
    luigi: {
      name: "Luigi",
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
    $(".start").animate({top:110}, 1500);
    $(".start h1").html("Select An Enemy");
  },

  // Select Enemy Character
  selectEnemy(enemy) {
    // Put chosen character into the enemy variable
    this.enemy = this.characters[$(enemy).data("name")];
    // Put character into enemy spot
    $(enemy).appendTo("#enemySpot").addClass("chosen").fadeIn("slow");
    $(".start").fadeOut(function () {
      $(this).remove();
    });

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

    $('body').addClass(this.player.name.toLowerCase()).fadeIn(3000);
  },

  // Go through the attack sequence
  attack() {
    $(buttonAttack).prop("disabled", true);
    // Player attacks enemy
    game.playerAttack();

    // Enemy Attacks Player
    if(!this.checkIfEnemyDead(this.enemy)) {
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
    if(this.checkIfEnemyDead()) {

      // Disable Attack Button
      $("#button-attack").prop("disabled", true);
      // Remove the enemy from the screen.
      $(currentEnemiesDiv).children().fadeOut().remove();
      //Set to no enemy
      this.enemy = null;
      $(attackBox).append("<h3>Please Choose A New Opponent</h3>");
      $(attackBox.children("h3").hide().fadeIn(1000));
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
    if(this.checkIfLost()) {
      alert("you lost")
    }
  },

  checkIfEnemyDead() {
    if(this.enemy === null) {
      return true;
    }

    if(this.enemy.health <= 0) {
      this.wins++;
      this.checkIfWon();
      return true;
    }
    return false;
  },

  checkIfLost() {
    if(this.player.health <= 0) {
      $(".character").fadeOut(1500);
      $(attackBox).fadeOut(1500);
      $(buttonAttack).fadeOut(1500);
      $(".logo").fadeOut(1500);
      $("body").css("background-color", "#2c2c2c");
      setTimeout(function () {
        alert("Sorry, you lost");
        game.newGame();
      }, 1500);
    }
  },

  checkIfWon() {
    if(this.wins >= 3) {
      $(attackBox).children().fadeOut("slow", function () {
        $(this).remove();
      });
      setTimeout(function () {
        $(".attack").children().fadeOut('slow');

        $(playerSpot).prepend("<h1 class='text-light'>Gnarly, You Won!</h1>");
        $(playerSpot).addClass("winner");
        $(playerSpot).css("position", "absolute");
        $(playerSpot).css("top", ( $(window).height() - $(playerSpot).height() ) / 2+ "px");
        $(playerSpot).css("left", ( $(window).width() - $(playerSpot).width() ) / 2 + "px");
          setTimeout(function () {game.newGame();}, 2000);
      }, 500);
    }
  },

  newGame() {
    const ng = confirm("Would you like to start a new game?");
    if(ng) {
      location.reload();
    }
  },

  updateGameText() {
    $(".mario .health").html(this.characters.mario.health);
    $(".peach .health").html(this.characters.peach.health);
    $(".luigi .health").html(this.characters.luigi.health);
    $(".toad .health").html(this.characters.toad.health);
  },

  slideFade(elem) {
    $(elem).css({'display':'block','opacity':'1'}).animate({'opacity':'0','top':'-=6rem'}, 2000, null, function () {
      $(this).remove();
    });
  },

  debug() {
    console.log("Player: " + this.player);
    console.log("Enemy: " + this.enemy);
    console.log("Wins: " + this.wins);
    console.log("-------------------------------");
  },

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