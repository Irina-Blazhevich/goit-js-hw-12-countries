const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const refs = {
  stopBtn: document.querySelector('[data-action="stop"]'),
  startBtn: document.querySelector('[data-action="start"]'),
  body: document.querySelector('body'),
};
let colorSwt;
let isActive = false;

function startSwitch() {
  if (!isActive) {
    isActive = true;
    colorSwt = setInterval(() => {
      refs.body.style.backgroundColor = `${
        colors[randomIntegerFromInterval(0, 5)]
      }`;
    }, 1000);
  }
}

function stopSwitch() {
  clearInterval(colorSwt);
  isActive = false;
}

refs.startBtn.addEventListener('click', startSwitch);
refs.stopBtn.addEventListener('click', stopSwitch);
