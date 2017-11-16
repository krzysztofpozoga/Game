console.log('HUrrraa!');

let Walker = function(){
  this.x = Math.floor(Math.random() * 10);
  this.y = 0;
  this.direction = 'bottom';
}

let Game = function(){
  this.board = document.querySelectorAll('#board div');
  this.walker = new Walker();
  this.index = function(x,y) {
    return x + (y * 10);
  }
  this.showWalker = function(){
    this.board[this.index(this.walker.x,this.walker.y) ].classList.add('walker');
  }
}

let game = new Game();
game.showWalker();
