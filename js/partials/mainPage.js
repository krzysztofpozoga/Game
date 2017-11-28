let MainPage = function(){
  this.storyPage = document.querySelector('#story');
  this.main = document.querySelector('#mainPage');
  this.title = document.querySelector('#mainPage h1');
  this.beginning = () => {
    this.title.classList.add('bloodEffect');
    this.main.classList.add('hidding');
    let	timeout	=	setTimeout(() =>{
      this.main.style.display= 'none';
      this.storyPage.style.display = 'flex';
    },	5000);

  }
  this.title.addEventListener('click', this.beginning);
}

export default MainPage;
