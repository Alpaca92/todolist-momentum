const body = document.querySelector("body");

const IMG_NUMBER = 2;

function paintImage(imgNumber) {
  const img = new Image();

  img.src = `src/img/${imgNumber + 1}.jpg`;
  img.classList.add("bkg-img");
  body.appendChild(img);
}

function getRandomNum() {
  const number = Math.floor(Math.random() * IMG_NUMBER);

  return number;
}

function init() {
  const randomNumber = getRandomNum();
  paintImage(randomNumber);
}

init();