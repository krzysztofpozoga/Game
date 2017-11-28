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


var _gameVariables = __webpack_require__(2);

var _gameVariables2 = _interopRequireDefault(_gameVariables);

var _walker = __webpack_require__(3);

var _walker2 = _interopRequireDefault(_walker);

var _mainPage = __webpack_require__(5);

var _mainPage2 = _interopRequireDefault(_mainPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameVariables = new _gameVariables2.default();
var mainPage = new _mainPage2.default();

var Start = function Start() {
  var _this = this;

  this.startButton = document.getElementById('start');
  this.boardSection = document.getElementById('board');
  this.storySection = document.getElementById('story');
  this.themeSong = document.getElementById('themeSong');
  this.start = function () {
    _this.themeSong.pause();
    _this.storySection.style.display = 'none';
    _this.boardSection.style.display = 'flex';
    _this.boardSection.classList.add('showing');
    var timeout = setTimeout(function () {
      var round = new Round();
    }, 4000);
  };
  this.startButton.addEventListener('click', this.start);
};
var start = new Start();

var Round = function Round() {
  var _this2 = this;

  var seconds = 1000;
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
  if (gameVariables.roundCounter >= 1 && gameVariables.roundCounter < 9) {
    seconds = seconds - 50 * (gameVariables.roundCounter - 1);
  }
  this.walkersInterval = setInterval(function () {
    if (gameVariables.i > gameVariables.numOfWalkers) {
      clearInterval(_this2.walkersInterval);
    } else {
      gameVariables.i++;
      var game = new Game();
      game.showWalker();
      game.startGame();
      game.gunSound();
    }
  }, seconds);
};
var NextRound = function NextRound() {
  var _this3 = this;

  this.nextButton = document.getElementById('next');
  this.nextRound = function () {
    gameVariables.roundCounter = gameVariables.roundCounter + 1;
    gameVariables.i = 0;
    gameVariables.array = [];
    _this3.nextButton.style.visibility = 'hidden';
    var round = new Round();
  };
  this.nextButton.addEventListener('click', this.nextRound);
};

var nextRound = new NextRound();

var Game = function Game() {
  var _this4 = this;

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
  this.walker = new _walker2.default();
  this.index = function (x, y) {
    return x + y * 10;
  };
  this.showWalker = function () {
    if (_this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].hasAttribute('id')) {
      if (_this4.walker.x === 9) {
        _this4.walker.x = _this4.walker.x - 1;
        _this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].classList.add(_this4.zombies[_this4.randomZombie], 'all');
        _this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].setAttribute('id', _this4.id);
        _this4.killTheWalker();
      } else {
        _this4.walker.x = _this4.walker.x + 1;
        _this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].classList.add(_this4.zombies[_this4.randomZombie], 'all');
        _this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].setAttribute('id', _this4.id);
        _this4.killTheWalker();
      }
    } else {
      _this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].classList.add(_this4.zombies[_this4.randomZombie], 'all');
      _this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].setAttribute('id', _this4.id);
      _this4.killTheWalker();
    }
  };
  this.hideWalker = function () {
    _this4.visible = document.getElementById(_this4.id);
    _this4.visible.classList.remove(_this4.zombies[_this4.randomZombie], 'all');
    _this4.visible.removeAttribute('id');
    _this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].removeEventListener('click', _this4.killMe);
  };
  this.hitTheWall = function () {
    if (_this4.walker.y > 8) {
      gameVariables.array.push(_this4.walker);
      _this4.removeInterval();
      _this4.hideWalker();
      gameVariables.progress = gameVariables.progress - 10;
      gameVariables.progressBar.style.width = parseInt(gameVariables.progress) + "%";
      if (gameVariables.progress <= 100 && gameVariables.progress >= 80) {
        gameVariables.progressBar.style.backgroundColor = "green";
      } else if (gameVariables.progress < 80 && gameVariables.progress >= 60) {
        gameVariables.progressBar.style.backgroundColor = "yellow";
      } else if (gameVariables.progress < 60 && gameVariables.progress >= 40) {
        gameVariables.progressBar.style.backgroundColor = "orange";
      } else if (gameVariables.progress < 40) {
        gameVariables.progressBar.style.backgroundColor = "red";
      }
      if (gameVariables.progress === 0) {
        _this4.gameOver();
      }
      if (gameVariables.array.length > gameVariables.numOfWalkers) {
        _this4.nextRoundButton.style.visibility = 'visible';
      }
    }
  };

  this.moveWalker = function () {
    _this4.hideWalker();
    _this4.walker.y = _this4.walker.y + 1;
    _this4.showWalker();
    _this4.hitTheWall();
  };

  this.gunSound = function () {
    for (var i = 0; i < _this4.boardSpot.length; i++) {
      _this4.boardSpot[i].addEventListener('click', function () {
        _this4.walker.gunShot.currentTime = 0;
        _this4.walker.gunShot.play();
      });
    }
  };

  this.gameOver = function () {
    _this4.boardPage.style.display = 'none';
    _this4.gameOverPage.style.display = 'flex';
    _this4.gameOverPage.classList.add('showing');
  };

  this.killMe = function () {
    gameVariables.array.push(_this4.walker);
    if (gameVariables.array.length < gameVariables.numOfWalkers + 1) {
      _this4.removeInterval();
      _this4.hideWalker();
      _this4.visible.classList.add('explosion');
      var timeout = setTimeout(function () {
        _this4.visible.classList.remove('explosion');
      }, 100);
    } else {
      _this4.removeInterval();
      _this4.hideWalker();
      _this4.visible.classList.add('explosion');
      var _timeout = setTimeout(function () {
        _this4.visible.classList.remove('explosion');
      }, 100);
      _this4.nextRoundButton.style.visibility = 'visible';
    }
    gameVariables.score = gameVariables.score + 1;
    _this4.scoreNumber.innerHTML = gameVariables.score;
  };

  this.killTheWalker = function () {
    _this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].addEventListener('click', _this4.killMe);
  };

  this.removeInterval = function () {
    clearInterval(_this4.idSetInterval);
    _this4.board[_this4.index(_this4.walker.x, _this4.walker.y)].removeEventListener('click', _this4.killMe);
  };

  this.startGame = function () {
    var number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
    var sec = Number(number);
    var self = _this4;
    if (gameVariables.roundCounter === 1) {
      _this4.idSetInterval = setInterval(function () {
        _this4.moveWalker();
      }, sec);
    } else if (gameVariables.roundCounter > 1 && gameVariables.roundCounter < 9) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number) - 50 * (gameVariables.roundCounter - 1);
      _this4.idSetInterval = setInterval(function () {
        _this4.moveWalker();
      }, sec);
    } else if (gameVariables.roundCounter === 9) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number) - 50 * (gameVariables.roundCounter - 2);
      _this4.idSetInterval = setInterval(function () {
        _this4.moveWalker();
      }, sec);
    } else if (gameVariables.roundCounter === 10) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number) - 50 * (gameVariables.roundCounter - 3);
      _this4.idSetInterval = setInterval(function () {
        _this4.moveWalker();
      }, sec);
    } else if (gameVariables.roundCounter > 10 && gameVariables.roundCounter <= 15) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number) - 50 * (gameVariables.roundCounter - 1);
      _this4.idSetInterval = setInterval(function () {
        _this4.moveWalker();
      }, sec);
    }
  };
};

var Again = function Again() {
  var _this5 = this;

  this.round = document.getElementById('round');
  this.score = document.getElementById('score');
  this.scoreNumber = this.score.querySelector('span');
  this.roundNumber = this.round.querySelector('span');
  this.againButton = document.getElementById('again');
  this.boardSection = document.getElementById('board');
  this.gameOverPage = document.getElementById('gameOver');
  this.start = function () {
    gameVariables.i = 0;
    gameVariables.numOfWalkers = 9;
    gameVariables.array = [];
    gameVariables.roundCounter = 1;
    gameVariables.progress = 100;
    gameVariables.score = 0;
    _this5.roundNumber.innerHTML = gameVariables.roundCounter;
    _this5.scoreNumber.innerHTML = gameVariables.score;
    gameVariables.progressBar.style.width = parseInt(gameVariables.progress) + "%";
    gameVariables.progressBar.style.backgroundColor = 'green';
    nextRound.nextButton.style.visibility = 'hidden';
    _this5.gameOverPage.style.display = 'none';
    _this5.boardSection.style.display = 'flex';
    _this5.boardSection.classList.add('showing');
    var timeout = setTimeout(function () {
      var round = new Round();
    }, 4000);
  };
  this.againButton.addEventListener('click', this.start);
};
var again = new Again();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GameVariables = function GameVariables() {
  this.i = 0;
  this.numOfWalkers = 9;
  this.array = [];
  this.roundCounter = 1;
  this.progressBar = document.querySelector('.progressBar .hit');
  this.progress = 100;
  this.score = 0;
  this.progressBar.style.width = parseInt(this.progress) + "%";
};

exports.default = GameVariables;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Walker = function Walker() {
  this.x = Math.floor(Math.random() * 10);
  this.y = 0;
  this.gunShot = document.getElementById('gunShot');
};

exports.default = Walker;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MainPage = function MainPage() {
  var _this = this;

  this.storyPage = document.querySelector('#story');
  this.main = document.querySelector('#mainPage');
  this.title = document.querySelector('#mainPage h1');
  this.beginning = function () {
    _this.title.classList.add('bloodEffect');
    _this.main.classList.add('hidding');
    var timeout = setTimeout(function () {
      _this.main.style.display = 'none';
      _this.storyPage.style.display = 'flex';
    }, 5000);
  };
  this.title.addEventListener('click', this.beginning);
};

exports.default = MainPage;

/***/ })
/******/ ]);