let GameVariables = function(){
  this.i = 0;
  this.numOfWalkers = 9;
  this.array = [];
  this.roundCounter = 1;
  this.progressBar = document.querySelector('.progressBar .hit');
  this.progress = 100;
  this.score = 0;
  this.progressBar.style.width = parseInt(this.progress)+"%";
}

export default GameVariables;
