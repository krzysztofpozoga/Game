let i = 0;
let numOfWalkers = 9;
let array = [];
let roundCounter = 1;

let Walker = function(){
  this.x = Math.floor(Math.random() * 10);
  this.y = 0;
}

let Game = function(){
  this.id = i;
  this.board = document.querySelectorAll('#board div');
  this.nextRoundButton = document.getElementById('next');
  this.walker = new Walker();
  this.index = (x,y) => {
    return x + (y * 10);
  }
  this.showWalker = () =>{
    if (this.board[this.index(this.walker.x,this.walker.y) ].hasAttribute('id')) {
      if (this.walker.x === 9) {
        this.walker.x = this.walker.x-1;
        this.board[this.index(this.walker.x,this.walker.y) ].classList.add('walker');
        this.board[this.index(this.walker.x,this.walker.y) ].setAttribute('id' ,this.id);
        this.killTheWalker();
      } else {
        this.walker.x = this.walker.x+1;
        this.board[this.index(this.walker.x,this.walker.y) ].classList.add('walker');
        this.board[this.index(this.walker.x,this.walker.y) ].setAttribute('id' ,this.id);
        this.killTheWalker();
      }
    } else {
      this.board[this.index(this.walker.x,this.walker.y) ].classList.add('walker');
      this.board[this.index(this.walker.x,this.walker.y) ].setAttribute('id' ,this.id);
      this.killTheWalker();
    }

  }
  this.hideWalker = () =>{
    this.visible = document.getElementById(this.id);
    this.visible.classList.remove('walker');
    this.visible.removeAttribute('id');
    this.board[this.index(this.walker.x,this.walker.y)].removeEventListener('click', this.killMe);
  }
  this.hitTheWall = () =>{
    if (this.walker.y > 8) {
      array.push(this.walker);
      this.removeInterval();
      this.hideWalker();
      if (array.length > numOfWalkers) {
        this.nextRoundButton.style.display = 'flex';
      }
    }
  }
  this.moveWalker = () =>{
    this.hideWalker();
    this.walker.y = this.walker.y + 1;
    this.showWalker();
    this.hitTheWall();
  }

  this.killMe = () =>{
    array.push(this.walker);
    if (array.length < numOfWalkers+1) {
      this.removeInterval();
      this.hideWalker();
    } else {
      this.removeInterval();
      this.hideWalker();
      this.nextRoundButton.style.display = 'flex';
    }

  }

  this.killTheWalker = () =>{
    this.board[this.index(this.walker.x,this.walker.y)].addEventListener('click', this.killMe)
  }

  this.removeInterval = () =>{
    clearInterval(this.idSetInterval);
    this.board[this.index(this.walker.x,this.walker.y)].removeEventListener('click', this.killMe)
  }

  this.startGame = () =>{
    let number = parseInt(Math.floor((Math.random() * 6) + 10))+'00';
    let sec = Number(number);
    let self = this;
    if (roundCounter === 1) {
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (roundCounter > 1 && roundCounter < 6) {
      let number = parseInt(Math.floor((Math.random() * 6) + 10))+'00';
      sec = Number(number) - (50*(roundCounter-1));
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (roundCounter === 6) {
      number = parseInt(Math.floor((Math.random() * 4) + 7))+'00';
      sec = Number(number);
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (roundCounter > 6 && roundCounter < 15) {
      number = parseInt(Math.floor((Math.random() * 4) + 7))+'00';
      sec = Number(number) - (50*(roundCounter-6));
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (roundCounter === 15) {
      console.log(roundCounter);
      number = parseInt(Math.floor((Math.random() * 4) + 2))+'00';
      sec = Number(number);
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    }
  }
}

let Round = function(){
  this.walkersInterval = setInterval(()=>{
    if (i>numOfWalkers) {
      clearInterval(this.walkersInterval);
    } else {
      i++;
      let game = new Game();
      game.showWalker();
      game.startGame();
    }
  }, 1000)
}

let Start = function(){
  this.startButton = document.getElementById('start');
  this.boardSection = document.getElementById('board');
  this.start = () =>{
    this.startButton.style.display = 'none';
    this.boardSection.style.display = 'flex';
    let round = new Round();
  }
  this.startButton.addEventListener('click', this.start);
}
let start = new Start();

let NextRound = function(){
  this.nextButton = document.getElementById('next');
  this.nextRound = () => {
    roundCounter = roundCounter+1;
    i = 0;
    array = [];
    this.nextButton.style.display = 'none';
    let round = new Round();
  }
  this.nextButton.addEventListener('click', this.nextRound);
}

let nextRound = new NextRound();
