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
  this.killMe = function () {
    game.removeInterval();
    this.visibleWalker = document.getElementById(this.id);
    this.visibleWalker.classList.remove('walker');
    this.visibleWalker.removeAttribute('id');
  };
  this.id = i;
};

var Game = function Game() {
  this.board = document.querySelectorAll('#board div');
  this.walker = new Walker();
  this.index = function (x, y) {
    return x + y * 10;
  };
  this.showWalker = function () {
    this.board[this.index(this.walker.x, this.walker.y)].classList.add('walker');
    this.board[this.index(this.walker.x, this.walker.y)].setAttribute('id', this.walker.id);
    this.killTheWalker();
  };
  this.hideWalker = function () {
    this.visible = document.getElementById(this.walker.id);
    this.visible.classList.remove('walker');
    this.visible.removeAttribute('id');
    this.board[this.index(this.walker.x, this.walker.y)].removeEventListener('click', this.walker.killMe);
  };
  this.hitTheWall = function () {
    if (this.walker.y > 8) {
      this.removeInterval();
      this.hideWalker();
    }
  };
  this.moveWalker = function () {
    this.hideWalker();
    this.walker.y = this.walker.y + 1;
    this.showWalker();
    this.hitTheWall();
  };

  this.killTheWalker = function () {
    this.board[this.index(this.walker.x, this.walker.y)].addEventListener('click', this.walker.killMe);
  };

  this.removeInterval = function () {
    clearInterval(this.idSetInterval);
    this.board[this.index(this.walker.x, this.walker.y)].removeEventListener('click', this.walker.killMe);
  };

  this.startGame = function () {
    var self = this;
    self.idSetInterval = setInterval(function () {
      self.moveWalker();
    }, 1000);
  };
};

var walkersInterval = setInterval(function () {
  i++;
  var game = new Game();
  game.showWalker();
  game.startGame();
}, 2000);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);