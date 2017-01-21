//Constants

//Canvas Dimensions
var CANVAS_X = 505;
var CANVAS_Y = 606;
//Players Movement Step Size
var PLAYER_Y_STEP = 83;
var PLAYER_X_STEP = 101;
//Initial Position of the Player
var playerIniPos = {
    x: 305,
    y: 403
};
//Returns true if value of x lies between min and max
function between(x, min, max) {
  return x >= min && x <= max;
}
//Checks Collion of an Enemy with the Player and resets the player to initial position in case if collision
function checkCollWithPlayer(xE,yE) {
    if (between(xE,player.x,player.x+2) && yE ===player.y)
    {
        player.y = playerIniPos.y;
        player.x = playerIniPos.x;
    }
}

//SuperClass Character that contains common properties and functionalities like location coordinates,rendering,etc.
var Character = function(xpos,ypos,imageName) {
    this.x = xpos;
    this.y = ypos;
    this.sprite = `images/${imageName}`;
}
//Draws character on the canvas 
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} 


// Enemies our player must avoid - Subclass of Character
var Enemy = function(xe,ye,speed) {
    Character.call(this,xe,ye,'enemy-bug.png');
    this.speed = speed;
};
//Inheriting Character
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -40;
    }
    checkCollWithPlayer(parseInt(this.x),this.y);
};

//Player Subclass 
var Player = function(xp,yp) {
    Character.call(this,xp,yp,'char-boy.png');
}

//Inheriting Character
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

//Player's Update every dt interval
Player.prototype.update = function(dt) {
    if (this.x < 0) {
        this.x = this.x + PLAYER_X_STEP;
    }
    else if ( this.x > CANVAS_X ) {
        this.x = this.x - PLAYER_X_STEP;
    }
    else if ( this.y < 0 ) {
        alert('You won !');
        this.y = playerIniPos.y;
        this.x = playerIniPos.x;
    }
    else if ( this.y > (CANVAS_Y - 2*PLAYER_Y_STEP) ) {
        this.y = this.y - PLAYER_Y_STEP;
    }
};
//Players movement on up,left,down.right key strokes
Player.prototype.handleInput = function(keyVal) {
    switch(keyVal) {
        case 'left' : this.x = this.x - PLAYER_X_STEP;break;
        case 'right' : this.x = this.x + PLAYER_X_STEP;break;
        case 'up' : this.y = this.y - PLAYER_Y_STEP;break;
        case 'down' : this.y = this.y + PLAYER_Y_STEP;break;
        default: break;
    }
}
//Enemy instances
var allEnemies = [
    new Enemy(0,71,100),
    new Enemy(100,237,150),
    new Enemy(50,71,130),
    new Enemy(0,154,100),
    new Enemy(300,154,65),
    new Enemy(10,237,200),
];
//Player instance
var player = new Player(playerIniPos.x,playerIniPos.y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
