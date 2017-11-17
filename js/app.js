let i = 0;
let Walker = function(){
  this.x = Math.floor(Math.random() * 10);
  this.y = 0;
  this.killMe = function(){
    game.removeInterval();
    this.visibleWalker = document.getElementById(this.id);
    this.visibleWalker.classList.remove('walker');
    this.visibleWalker.removeAttribute('id');
  }
  this.id = i;
}

let Game = function(){
  this.board = document.querySelectorAll('#board div');
  this.walker = new Walker();
  this.index = function(x,y) {
    return x + (y * 10);
  }
  this.showWalker = function(){
    this.board[this.index(this.walker.x,this.walker.y) ].classList.add('walker');
    this.board[this.index(this.walker.x,this.walker.y) ].setAttribute('id' ,this.walker.id);
    this.killTheWalker();
  }
  this.hideWalker = function(){
    this.visible = document.getElementById(this.walker.id);
    this.visible.classList.remove('walker');
    this.visible.removeAttribute('id');
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

let walkersInterval = setInterval(function(){
  i++;
  let game = new Game();
  game.showWalker();
  game.startGame();
}, 2000)
