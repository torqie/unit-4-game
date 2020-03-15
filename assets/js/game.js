//Define Global variables

const game = {
  /** -- Define The Game Objects Variables -- **/
  myCharacter: null,
  enemyCharacter: null,


  /** -- Define Each Character As An Object -- **/
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
  },

};

/** -- Click To Choose Your Character -- **/
$('.character').on('click', function () {
  // Check if the myCharacter variable is empty
  if(this.myCharacter === null) {
    // Put chosen character into the myCharacter variable.
    game.myCharacter = game[this.value];
  }
  // Move Enemies Down and Chosen Character left.
});


/** -- Click To Choose Your Enemy -- **/
$('.character').on('click', function () {
  // Check if the myCharacter variable is empty, if so
  if(this.myCharacter === null) {
    // Put chosen character into the enemyCharacter variable.
    game.enemyCharacter = game[this.value];
  }
});

/** -- Click To Attack Your Enemy -- **/
  // Attack Enemy and take myCharacter.attack away from enemyCharacter.health
  //
