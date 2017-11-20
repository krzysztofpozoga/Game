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
var Walker = function Walker() {
  this.x = Math.floor(Math.random() * 10);
  this.y = 0;
};

var Game = function Game() {
  var _this = this;

  this.id = i;
  this.board = document.querySelectorAll('#board div');
  this.walker = new Walker();
  this.index = function (x, y) {
    return x + y * 10;
  };
  this.showWalker = function () {
    if (_this.board[_this.index(_this.walker.x, _this.walker.y)].hasAttribute('id')) {
      _this.walker.x = _this.walker.x + 1;
      _this.board[_this.index(_this.walker.x, _this.walker.y)].classList.add('walker');
      _this.board[_this.index(_this.walker.x, _this.walker.y)].setAttribute('id', _this.id);
      _this.killTheWalker();
    } else {
      _this.board[_this.index(_this.walker.x, _this.walker.y)].classList.add('walker');
      _this.board[_this.index(_this.walker.x, _this.walker.y)].setAttribute('id', _this.id);
      _this.killTheWalker();
    }
  };
  this.hideWalker = function () {
    _this.visible = document.getElementById(_this.id);
    _this.visible.classList.remove('walker');
    _this.visible.removeAttribute('id');
    _this.board[_this.index(_this.walker.x, _this.walker.y)].removeEventListener('click', _this.killMe);
  };
  this.hitTheWall = function () {
    if (_this.walker.y > 8) {
      _this.removeInterval();
      _this.hideWalker();
    }
  };
  this.moveWalker = function () {
    _this.hideWalker();
    _this.walker.y = _this.walker.y + 1;
    _this.showWalker();
    _this.hitTheWall();
  };

  this.killMe = function () {
    _this.removeInterval();
    _this.hideWalker();
  };

  this.killTheWalker = function () {
    _this.board[_this.index(_this.walker.x, _this.walker.y)].addEventListener('click', _this.killMe);
  };

  this.removeInterval = function () {
    clearInterval(_this.idSetInterval);
    _this.board[_this.index(_this.walker.x, _this.walker.y)].removeEventListener('click', _this.killMe);
  };

  this.startGame = function () {
    var self = _this;
    var number = parseInt(Math.floor(Math.random() * 4 + 7)) + '00';
    var sec = Number(number);
    _this.idSetInterval = setInterval(function () {
      _this.moveWalker();
    }, sec);
  };
};

var Round = function Round() {
  var _this2 = this;

  this.walkersInterval = setInterval(function () {
    if (i > 9) {
      console.log('Koniec rundy!!!');
      clearInterval(_this2.walkersInterval);
    } else {
      i++;
      var game = new Game();
      game.showWalker();
      game.startGame();
    }
  }, 2000);
};

var Start = function Start() {
  var _this3 = this;

  this.startButton = document.getElementById('start');
  this.boardSection = document.getElementById('board');
  this.start = function () {
    _this3.startButton.style.display = 'none';
    _this3.boardSection.style.display = 'flex';
    var round = new Round();
  };
  this.startButton.addEventListener('click', this.start);
};
var runGame = new Start();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);