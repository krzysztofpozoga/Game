/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var i = 0;
var numOfWalkers = 9;
var array = [];
var roundCounter = 1;
var progressBar = document.querySelector('.progressBar .hit');
var progress = 100;
var score = 0;
progressBar.style.width = parseInt(progress) + "%";

var Walker = function Walker() {
  this.x = Math.floor(Math.random() * 10);
  this.y = 0;
  this.gunShot = document.getElementById('gunShot');
};

var Game = function Game() {
  var _this = this;

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
  this.index = function (x, y) {
    return x + y * 10;
  };
  this.showWalker = function () {
    if (_this.board[_this.index(_this.walker.x, _this.walker.y)].hasAttribute('id')) {
      if (_this.walker.x === 9) {
        _this.walker.x = _this.walker.x - 1;
        _this.board[_this.index(_this.walker.x, _this.walker.y)].classList.add(_this.zombies[_this.randomZombie], 'all');
        _this.board[_this.index(_this.walker.x, _this.walker.y)].setAttribute('id', _this.id);
        _this.killTheWalker();
      } else {
        _this.walker.x = _this.walker.x + 1;
        _this.board[_this.index(_this.walker.x, _this.walker.y)].classList.add(_this.zombies[_this.randomZombie], 'all');
        _this.board[_this.index(_this.walker.x, _this.walker.y)].setAttribute('id', _this.id);
        _this.killTheWalker();
      }
    } else {
      _this.board[_this.index(_this.walker.x, _this.walker.y)].classList.add(_this.zombies[_this.randomZombie], 'all');
      _this.board[_this.index(_this.walker.x, _this.walker.y)].setAttribute('id', _this.id);
      _this.killTheWalker();
    }
  };
  this.hideWalker = function () {
    _this.visible = document.getElementById(_this.id);
    _this.visible.classList.remove(_this.zombies[_this.randomZombie], 'all');
    _this.visible.removeAttribute('id');
    _this.board[_this.index(_this.walker.x, _this.walker.y)].removeEventListener('click', _this.killMe);
  };
  this.hitTheWall = function () {
    if (_this.walker.y > 8) {
      array.push(_this.walker);
      _this.removeInterval();
      _this.hideWalker();
      progress = progress - 10;
      progressBar.style.width = parseInt(progress) + "%";
      if (progress <= 100 && progress >= 80) {
        progressBar.style.backgroundColor = "green";
      } else if (progress < 80 && progress >= 60) {
        progressBar.style.backgroundColor = "yellow";
      } else if (progress < 60 && progress >= 40) {
        progressBar.style.backgroundColor = "orange";
      } else if (progress < 40) {
        progressBar.style.backgroundColor = "red";
      }
      if (progress === 0) {
        _this.gameOver();
      }
      if (array.length > numOfWalkers) {
        _this.nextRoundButton.style.visibility = 'visible';
      }
    }
  };

  this.moveWalker = function () {
    _this.hideWalker();
    _this.walker.y = _this.walker.y + 1;
    _this.showWalker();
    _this.hitTheWall();
  };

  this.gunSound = function () {
    for (var _i = 0; _i < _this.boardSpot.length; _i++) {
      _this.boardSpot[_i].addEventListener('click', function () {
        _this.walker.gunShot.currentTime = 0;
        _this.walker.gunShot.play();
      });
    }
  };

  this.gameOver = function () {
    _this.boardPage.style.display = 'none';
    _this.gameOverPage.style.display = 'flex';
    _this.gameOverPage.classList.add('showing');
  };

  this.killMe = function () {
    array.push(_this.walker);
    if (array.length < numOfWalkers + 1) {
      _this.removeInterval();
      _this.hideWalker();
      _this.visible.classList.add('explosion');
      var timeout = setTimeout(function () {
        _this.visible.classList.remove('explosion');
      }, 100);
    } else {
      _this.removeInterval();
      _this.hideWalker();
      _this.visible.classList.add('explosion');
      var _timeout = setTimeout(function () {
        _this.visible.classList.remove('explosion');
      }, 100);
      _this.nextRoundButton.style.visibility = 'visible';
    }
    score = score + 1;
    _this.scoreNumber.innerHTML = score;
  };

  this.killTheWalker = function () {
    _this.board[_this.index(_this.walker.x, _this.walker.y)].addEventListener('click', _this.killMe);
  };

  this.removeInterval = function () {
    clearInterval(_this.idSetInterval);
    _this.board[_this.index(_this.walker.x, _this.walker.y)].removeEventListener('click', _this.killMe);
  };

  this.startGame = function () {
    var number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
    var sec = Number(number);
    var self = _this;
    if (roundCounter === 1) {
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    } else if (roundCounter > 1 && roundCounter < 9) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number) - 50 * (roundCounter - 1);
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    } else if (roundCounter === 9) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number) - 50 * (roundCounter - 2);
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    } else if (roundCounter === 10) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number) - 50 * (roundCounter - 3);
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    } else if (roundCounter > 10 && roundCounter <= 15) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number) - 50 * (roundCounter - 1);
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    }
  };
};

var Round = function Round() {
  var _this2 = this;

  var seconds = 1000;
  this.round = document.getElementById('round');
  this.score = document.getElementById('score');
  this.primaryImage = document.getElementById('primaryImage');
  this.scoreNumber = this.score.querySelector('span');
  this.roundNumber = this.round.querySelector('span');
  this.roundNumber.innerHTML = roundCounter;
  this.score.style.display = 'flex';
  this.round.style.display = 'flex';
  this.primaryImage.style.display = 'flex';
  if (roundCounter === 9 || roundCounter === 10) {
    numOfWalkers = numOfWalkers + 5;
  };
  if (roundCounter >= 1 && roundCounter < 9) {
    seconds = seconds - 50 * (roundCounter - 1);
  }
  this.walkersInterval = setInterval(function () {
    if (i > numOfWalkers) {
      clearInterval(_this2.walkersInterval);
    } else {
      i++;
      var game = new Game();
      game.showWalker();
      game.startGame();
      game.gunSound();
    }
  }, seconds);
};

var Again = function Again() {
  var _this3 = this;

  this.round = document.getElementById('round');
  this.score = document.getElementById('score');
  this.scoreNumber = this.score.querySelector('span');
  this.roundNumber = this.round.querySelector('span');
  this.againButton = document.getElementById('again');
  this.boardSection = document.getElementById('board');
  this.gameOverPage = document.getElementById('gameOver');
  this.start = function () {
    i = 0;
    numOfWalkers = 9;
    array = [];
    roundCounter = 1;
    progress = 100;
    score = 0;
    _this3.roundNumber.innerHTML = roundCounter;
    _this3.scoreNumber.innerHTML = score;
    progressBar.style.width = parseInt(progress) + "%";
    progressBar.style.backgroundColor = 'green';
    nextRound.nextButton.style.visibility = 'hidden';
    _this3.gameOverPage.style.display = 'none';
    _this3.boardSection.style.display = 'flex';
    _this3.boardSection.classList.add('showing');
    var timeout = setTimeout(function () {
      var round = new Round();
    }, 4000);
  };
  this.againButton.addEventListener('click', this.start);
};
var again = new Again();

var Start = function Start() {
  var _this4 = this;

  this.startButton = document.getElementById('start');
  this.boardSection = document.getElementById('board');
  this.storySection = document.getElementById('story');
  this.themeSong = document.getElementById('themeSong');
  this.start = function () {
    _this4.themeSong.pause();
    _this4.storySection.style.display = 'none';
    _this4.boardSection.style.display = 'flex';
    _this4.boardSection.classList.add('showing');
    var timeout = setTimeout(function () {
      var round = new Round();
    }, 4000);
  };
  this.startButton.addEventListener('click', this.start);
};
var start = new Start();

var NextRound = function NextRound() {
  var _this5 = this;

  this.nextButton = document.getElementById('next');
  this.nextRound = function () {
    roundCounter = roundCounter + 1;
    i = 0;
    array = [];
    _this5.nextButton.style.visibility = 'hidden';
    var round = new Round();
  };
  this.nextButton.addEventListener('click', this.nextRound);
};

var nextRound = new NextRound();

///////////MAIN Page///////////

var StoryPage = function StoryPage() {
  this.page = document.querySelector('#story');
};

var MainPage = function MainPage() {
  var _this6 = this;

  this.story = new StoryPage();
  this.main = document.querySelector('#mainPage');
  this.title = document.querySelector('#mainPage h1');
  this.beginning = function () {
    _this6.title.classList.add('bloodEffect');
    _this6.main.classList.add('hidding');
    var timeout = setTimeout(function () {
      _this6.main.style.display = 'none';
      _this6.story.page.style.display = 'flex';
    }, 5000);
  };
  this.title.addEventListener('click', this.beginning);
};

var mainPage = new MainPage();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);