let i = 0;
let numOfWalkers = 9;
let array = [];
let roundCounter = 1;
let progressBar = document.querySelector('.progressBar .hit');
let progress = 100;
let score = 0;
progressBar.style.width = parseInt(progress)+"%";

let Walker = function(){
  this.x = Math.floor(Math.random() * 10);
  this.y = 0;
  this.gunShot = document.getElementById('gunShot');
}

let Game = function(){
  this.id = i;
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
      array.push(this.walker);
      this.removeInterval();
      this.hideWalker();
      progress = progress - 50;
      progressBar.style.width = parseInt(progress)+"%";
      if (progress <=100 && progress >=80) {
        progressBar.style.backgroundColor = "green";
      } else if (progress <80 && progress >=60) {
        progressBar.style.backgroundColor = "yellow";
      } else if (progress <60 && progress >=40) {
        progressBar.style.backgroundColor = "orange";
      } else if (progress <40) {
        progressBar.style.backgroundColor = "red";
      }
      if (progress === 0) {
        this.gameOver();
      }
      if (array.length > numOfWalkers) {
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
    array.push(this.walker);
    if (array.length < numOfWalkers+1) {
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
    score = score +1;
    this.scoreNumber.innerHTML=score;
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
    if (roundCounter === 1) {
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (roundCounter > 1 && roundCounter < 6) {
      number = parseInt(Math.floor((Math.random() * 4) + 7))+'00';
      sec = Number(number) - (50*(roundCounter-1));
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (roundCounter === 6) {
      number = parseInt(Math.floor((Math.random() * 4) + 2))+'00';
      sec = Number(number);
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (roundCounter > 6 && roundCounter < 15) {
      number = parseInt(Math.floor((Math.random() * 4) + 2))+'00';
      sec = Number(number) - (50*(roundCounter-6));
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    } else if (roundCounter === 15) {
      number = parseInt(Math.floor((Math.random() * 5) + 1))+'00';
      sec = Number(number);
      this.idSetInterval = setInterval(()=>{
        this.moveWalker();
      }, sec);
    }
  }
}

let Round = function(){
  this.round = document.getElementById('round');
  this.score = document.getElementById('score');
  this.scoreNumber = this.score.querySelector('span');
  this.roundNumber = this.round.querySelector('span');
  this.roundNumber.innerHTML = roundCounter;
  this.score.style.display = 'flex';
  this.round.style.display = 'flex';
  this.walkersInterval = setInterval(()=>{
    if (i>numOfWalkers) {
      clearInterval(this.walkersInterval);
    } else {
      i++;
      let game = new Game();
      game.showWalker();
      game.startGame();
      game.gunSound();
    }
  }, 1000)
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
    i = 0;
    numOfWalkers = 9;
    array = [];
    roundCounter = 1;
    progress = 100;
    score = 0;
    this.roundNumber.innerHTML = roundCounter;
    this.scoreNumber.innerHTML = score;
    progressBar.style.width = parseInt(progress)+"%";
    progressBar.style.backgroundColor = 'green';
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

let NextRound = function(){
  this.nextButton = document.getElementById('next');
  this.nextRound = () => {
    roundCounter = roundCounter+1;
    i = 0;
    array = [];
    this.nextButton.style.visibility = 'hidden';
    let round = new Round();
  }
  this.nextButton.addEventListener('click', this.nextRound);
}

let nextRound = new NextRound();


///////////MAIN Page///////////

let StoryPage = function(){
  this.page = document.querySelector('#story');
}

let MainPage = function(){
  this.story = new StoryPage();
  this.main = document.querySelector('#mainPage');
  this.title = document.querySelector('#mainPage h1');
  this.beginning = () => {
    this.title.classList.add('bloodEffect');
    this.main.classList.add('hidding');
    let	timeout	=	setTimeout(() =>{
      this.main.style.display= 'none';
      this.story.page.style.display = 'flex';
    },	5000);

  }
  this.title.addEventListener('click', this.beginning);
}

let mainPage = new MainPage();
