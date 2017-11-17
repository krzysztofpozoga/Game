let Walker = function(){
  this.x = Math.floor(Math.random() * 10);
  this.y = 0;
  this.killMe = function(){
    this.visibleWalker = document.querySelector('.walker');
    this.visibleWalker.classList.remove('walker');
    game.removeInterval();
  }
}

let Game = function(){
  this.board = document.querySelectorAll('#board div');
  this.walker = new Walker();
  this.index = function(x,y) {
    return x + (y * 10);
  }
  this.showWalker = function(){
    this.board[this.index(this.walker.x,this.walker.y) ].classList.add('walker');
    this.killTheWalker();
  }
  this.hideWalker = function(){
    this.visibleWalker = document.querySelector('.walker');
    this.visibleWalker.classList.remove('walker');
    this.board[this.index(this.walker.x,this.walker.y)].removeEventListener('click', this.walker.killMe)
  }
  this.hitTheWall = function(){
    if (this.walker.y > 8) {
      this.removeInterval();
      this.hideWalker();
    }
  }
  this.moveWalker = function(){
    this.hideWalker();
    this.walker.y = this.walker.y + 1;
    this.showWalker();
    this.hitTheWall();
  }

  this.killTheWalker = function(){
    this.board[this.index(this.walker.x,this.walker.y)].addEventListener('click', this.walker.killMe)
  }

  this.removeInterval = function(){
    clearInterval(this.idSetInterval);
    this.board[this.index(this.walker.x,this.walker.y)].removeEventListener('click', this.walker.killMe)
  }

  this.startGame = function(){
    let self = this;
    self.idSetInterval = setInterval(function(){
      self.moveWalker();
    }, 1000);
  }
}

let game = new Game();
game.showWalker();
game.startGame();
