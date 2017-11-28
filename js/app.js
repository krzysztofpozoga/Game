import GameVariables from './partials/gameVariables.js';
import Walker from './partials/walker.js';
import MainPage from './partials/mainPage.js';

let gameVariables = new GameVariables();
let mainPage = new MainPage();

let Start = function(){
  this.startButton = document.getElementById('start');
  this.boardSection = document.getElementById('board');
  this.storySection = document.getElementById('story');
  this.themeSong = document.getElementById('themeSong');
  this.start = () =>{
    this.themeSong.pause();
    this.storySection.style.display = 'none';
    this.boardSection.style.display = 'flex';
    this.boardSection.classList.add('showing');
    let	timeout	=	setTimeout(() =>{
      let round = new Round();
    },	4000);

  }
  this.startButton.addEventListener('click', this.start);
}
let start = new Start();

let Round = function(){
  let seconds = 1000;
  this.round = document.getElementById('round');
  this.score = document.getElementById('score');
  this.primaryImage = document.getElementById('primaryImage');
  this.scoreNumber = this.score.querySelector('span');
  this.roundNumber = this.round.querySelector('span');
  this.roundNumber.innerHTML = gameVariables.roundCounter;
  this.score.style.display = 'flex';
  this.round.style.display = 'flex';
  this.primaryImage.style.display = 'flex';
  if (gameVariables.roundCounter === 9 || gameVariables.roundCounter === 10) {
    gameVariables.numOfWalkers = gameVariables.numOfWalkers + 5;
  };
  if (gameVariables.roundCounter >=1 && gameVariables.roundCounter <9) {
    seconds = seconds - 50*(gameVariables.roundCounter-1);
  }
  this.walkersInterval = setInterval(()=>{
    if (gameVariables.i>gameVariables.numOfWalkers) {
      clearInterval(this.walkersInterval);
    } else {
      gameVariables.i++;
      let game = new Game();
      game.showWalker();
      game.startGame();
      game.gunSound();
    }
  }, seconds);
}
let NextRound = function(){
  this.nextButton = document.getElementById('next');
  this.nextRound = () => {
    gameVariables.roundCounter = gameVariables.roundCounter+1;
    gameVariables.i = 0;
    gameVariables.array = [];
    this.nextButton.style.visibility = 'hidden';
    let round = new Round();
  }
  this.nextButton.addEventListener('click', this.nextRound);
}

let nextRound = new NextRound();

let Game = function(){
  this.id = gameVariables.i;
  this.zombies = ['zombieOne', 'zombieTwo', 'zombieThree'];
  this.randomZombie = Math.round(Math.random() * 2);
  this.boardPage = document.querySelector('#board');
  this.gameOverPage = document.getElementById('gameOver');
  this.board = document.querySelectorAll('#board div');
  this.boardSpot = document.querySelectorAll('.grass');
  this.nextRoundButton = document.getElementById('next');
  this.score = document.getElementById('score');
  this.scoreNumber = this.score.querySelector('span');
  this.walker = new Walker();
  this.index = (x,y) => {
    return x + (y * 10);
  }
  this.showWalker = () =>{
    if (this.board[this.index(this.walker.x,this.walker.y) ].hasAttribute('id')) {
      if (this.walker.x === 9) {
        this.walker.x = this.walker.x-1;
        this.board[this.index(this.walker.x,this.walker.y) ].classList.add(this.zombies[this.randomZombie], 'all');
        this.board[this.index(this.walker.x,this.walker.y) ].setAttribute('id' ,this.id);
        this.killTheWalker();
      } else {
        this.walker.x = this.walker.x+1;
        this.board[this.index(this.walker.x,this.walker.y) ].classList.add(this.zombies[this.randomZombie], 'all');
        this.board[this.index(this.walker.x,this.walker.y) ].setAttribute('id' ,this.id);
        this.killTheWalker();
      }
    } else {
      this.board[this.index(this.walker.x,this.walker.y) ].classList.add(this.zombies[this.randomZombie], 'all');
      this.board[this.index(this.walker.x,this.walker.y) ].setAttribute('id' ,this.id);
      this.killTheWalker();
    }

  }
  this.hideWalker = () =>{
    this.visible = document.getElementById(this.id);
    this.visible.classList.remove(this.zombies[this.randomZombie], 'all');
    this.visible.removeAttribute('id');
    this.board[this.index(this.walker.x,this.walker.y)].removeEventListener('click', this.killMe);
  }
  this.hitTheWall = () =>{
    if (this.walker.y > 8) {
      gameVariables.array.push(this.walker);
      this.removeInterval();
      this.hideWalker();
      gameVariables.progress = gameVariables.progress - 10;
      gameVariables.progressBar.style.width = parseInt(gameVariables.progress)+"%";
      if (gameVariables.progress <=100 && gameVariables.progress >=80) {
        gameVariables.progressBar.style.backgroundColor = "green";
      } else if (gameVariables.progress <80 && gameVariables.progress >=60) {
        gameVariables.progressBar.style.backgroundColor = "yellow";
      } else if (gameVariables.progress <60 && gameVariables.progress >=40) {
        gameVariables.progressBar.style.backgroundColor = "orange";
      } else if (gameVariables.progress <40) {
        gameVariables.progressBar.style.backgroundColor = "red";
      }
      if (gameVariables.progress === 0) {
        this.gameOver();
      }
      if (gameVariables.array.length > gameVariables.numOfWalkers) {
        this.nextRoundButton.style.visibility = 'visible';
      }
    }
  }

  this.moveWalker = () =>{
    this.hideWalker();
    this.walker.y = this.walker.y + 1;
    this.showWalker();
    this.hitTheWall();
  }

  this.gunSound = () =>{
    for( let i = 0; i<this.boardSpot.length; i++) {
      this.boardSpot[i].addEventListener('click', ()=>{
        this.walker.gunShot.currentTime = 0;
        this.walker.gunShot.play();
      })
    }
  }

  this.gameOver = () => {
    this.boardPage.style.display = 'none';
    this.gameOverPage.style.display = 'flex';
    this.gameOverPage.classList.add('showing');
  }

  this.killMe = () =>{
    gameVariables.array.push(this.walker);
    if (gameVariables.array.length < gameVariables.numOfWalkers+1) {
      this.removeInterval();
      this.hideWalker();
      this.visible.classList.add('explosion');
      let	timeout	=	setTimeout(() =>{
        this.visible.classList.remove('explosion');
      },	100);
    } else {
      this.removeInterval();
      this.hideWalker();
      this.visible.classList.add('explosion');
      let	timeout	=	setTimeout(() =>{
        this.visible.classList.remove('explosion');
      },	100);
      this.nextRoundButton.style.visibility = 'visible';
    }
    gameVariables.score = gameVariables.score +1;
    this.scoreNumber.innerHTML=gameVariables.score;
  }

  this.killTheWalker = () =>{
    this.board[this.index(this.walker.x,this.walker.y)].addEventListener('click', this.killMe)
  }

  this.removeInterval = () =>{
    clearInterval(this.idSetInterval);
    this.board[this.index(this.walker.x,this.walker.y)].removeEventListener('click', this.killMe)
  }

  this.startGame = () =>{
    let number = parseInt(Math.floor((Math.random() * 4) + 7))+'00';
    let sec = Number(number);
    let self = this;
    if (gameVariables.roundCounter === 1) {
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (gameVariables.roundCounter > 1 && gameVariables.roundCounter < 9) {
      number = parseInt(Math.floor((Math.random() * 4) + 7))+'00';
      sec = Number(number) - (50*(gameVariables.roundCounter-1));
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (gameVariables.roundCounter === 9) {
      number = parseInt(Math.floor((Math.random() * 4) + 7))+'00';
      sec = Number(number) - (50*(gameVariables.roundCounter-2));
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (gameVariables.roundCounter === 10) {
      number = parseInt(Math.floor((Math.random() * 4) + 7))+'00';
      sec = Number(number) - (50*(gameVariables.roundCounter-3));
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (gameVariables.roundCounter > 10 && gameVariables.roundCounter <= 15) {
      number = parseInt(Math.floor((Math.random() * 4) + 7))+'00';
      sec = Number(number) - (50*(gameVariables.roundCounter-1));
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    }
  }
}


let Again = function(){
  this.round = document.getElementById('round');
  this.score = document.getElementById('score');
  this.scoreNumber = this.score.querySelector('span');
  this.roundNumber = this.round.querySelector('span');
  this.againButton = document.getElementById('again');
  this.boardSection = document.getElementById('board');
  this.gameOverPage = document.getElementById('gameOver');
  this.start = () =>{
    gameVariables.i = 0;
    gameVariables.numOfWalkers = 9;
    gameVariables.array = [];
    gameVariables.roundCounter = 1;
    gameVariables.progress = 100;
    gameVariables.score = 0;
    this.roundNumber.innerHTML = gameVariables.roundCounter;
    this.scoreNumber.innerHTML = gameVariables.score;
    gameVariables.progressBar.style.width = parseInt(gameVariables.progress)+"%";
    gameVariables.progressBar.style.backgroundColor = 'green';
    nextRound.nextButton.style.visibility = 'hidden';
    this.gameOverPage.style.display = 'none';
    this.boardSection.style.display = 'flex';
    this.boardSection.classList.add('showing');
    let	timeout	=	setTimeout(() =>{
      let round = new Round();
    },	4000);

  }
  this.againButton.addEventListener('click', this.start);
}
let again = new Again();
