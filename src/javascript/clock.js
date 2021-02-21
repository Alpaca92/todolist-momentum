const clockContainer = document.querySelector(".js-clock"),
      currentTime = clockContainer.querySelector("h1"),
      currentDate = clockContainer.querySelector("h3");

function getTime() {
  const date = new Date();

  const years = date.getFullYear(),
        months = date.getMonth() + 1,
        days = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

  currentTime.innerText =
  `${
    hours < 10 ? `0${hours}` : hours 
  }:${
    minutes < 10 ? `0${minutes}` : minutes 
  }:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  currentDate.innerText =
  `${
    years
  }년 ${
    months < 10 ? `0${months}` : months
  }월 ${
    days < 10 ? `0${days}` : days
  }일`;
}
      
function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();