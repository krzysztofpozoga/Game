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
progressBar.style.width = parseInt(progress) + "%";

var Walker = function Walker() {
  this.x = Math.floor(Math.random() * 10);
  this.y = 0;
};

var Game = function Game() {
  var _this = this;

  this.id = i;
  this.zombies = ['zombieOne', 'zombieTwo', 'zombieThree'];
  this.randomZombie = Math.round(Math.random() * 2);
  this.boardPage = document.querySelector('#board');
  this.board = document.querySelectorAll('#board div');
  this.nextRoundButton = document.getElementById('next');
  this.walker = new Walker();
  console.log(this.walker.x);
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
        _this.boardPage.style.display = 'none';
      }
      if (array.length > numOfWalkers) {
        _this.nextRoundButton.style.display = 'flex';
      }
    }
  };
  this.moveWalker = function () {
    _this.hideWalker();
    _this.walker.y = _this.walker.y + 1;
    _this.showWalker();
    _this.hitTheWall();
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
      _this.nextRoundButton.style.display = 'flex';
    }
  };

  this.killTheWalker = function () {
    _this.board[_this.index(_this.walker.x, _this.walker.y)].addEventListener('click', _this.killMe);
  };

  this.removeInterval = function () {
    clearInterval(_this.idSetInterval);
    _this.board[_this.index(_this.walker.x, _this.walker.y)].removeEventListener('click', _this.killMe);
  };

  this.startGame = function () {
    var number = parseInt(Math.floor(Math.random() * 6 + 10)) + '00';
    var sec = Number(number);
    var self = _this;
    if (roundCounter === 1) {
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    } else if (roundCounter > 1 && roundCounter < 6) {
      var _number = parseInt(Math.floor(Math.random() * 6 + 10)) + '00';
      sec = Number(_number) - 50 * (roundCounter - 1);
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    } else if (roundCounter === 6) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number);
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    } else if (roundCounter > 6 && roundCounter < 15) {
      number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
      sec = Number(number) - 50 * (roundCounter - 6);
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    } else if (roundCounter === 15) {
      console.log(roundCounter);
      number = parseInt(Math.floor(Math.random() * 4 + 2)) + '00';
      sec = Number(number);
      _this.idSetInterval = setInterval(function () {
        _this.moveWalker();
      }, sec);
    }
  };
};

var Round = function Round() {
  var _this2 = this;

  this.walkersInterval = setInterval(function () {
    if (i > numOfWalkers) {
      clearInterval(_this2.walkersInterval);
    } else {
      i++;
      var game = new Game();
      game.showWalker();
      game.startGame();
    }
  }, 1000);
};

var Start = function Start() {
  var _this3 = this;

  this.startButton = document.getElementById('start');
  this.boardSection = document.getElementById('board');
  this.storySection = document.getElementById('story');
  this.start = function () {
    _this3.storySection.style.display = 'none';
    _this3.boardSection.style.display = 'flex';
    _this3.boardSection.classList.add('showing');
    var timeout = setTimeout(function () {
      var round = new Round();
    }, 4000);
  };
  this.startButton.addEventListener('click', this.start);
};
var start = new Start();

var NextRound = function NextRound() {
  var _this4 = this;

  this.nextButton = document.getElementById('next');
  this.nextRound = function () {
    roundCounter = roundCounter + 1;
    i = 0;
    array = [];
    _this4.nextButton.style.display = 'none';
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
  var _this5 = this;

  this.story = new StoryPage();
  this.main = document.querySelector('#mainPage');
  this.title = document.querySelector('#mainPage h1');
  this.beginning = function () {
    _this5.title.classList.add('bloodEffect');
    _this5.main.classList.add('hidding');
    var timeout = setTimeout(function () {
      _this5.main.style.display = 'none';
      _this5.story.page.style.display = 'flex';
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