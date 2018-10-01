const animationEl = document.querySelector('.animation');
const sparklesEl = document.querySelector('.sparkles');
const guyEl = document.querySelector('.guy');
let playing = false;
let speed = 300;
const increment = .95;
const limitA = 100;
const limitB = 40;
const limitC = 20;
let bugs = false;
let speedUp = false;
let sparklesAnimation = null;
let guyAnimation = null;
const sparkles = '-.･ﾟ*｡-･ﾟ☆';
const projectiles = ['☆','☃', '⚾︎', '✏︎', '✪', '✿', '-', '.', '･', 'ﾟ', '*', '｡', 'ﾟ', '=', '≡', '✂'];
const guyFramesA = ['( ⊃・ω・)੭', '( ੭・ω・)⊃'];
const guyFramesB = ['( ⊃ •̀ω•́)੭', '( ੭ •̀ω•́)⊃'];
const guyFramesC = ['( ⊃ ○Д○)੭', '( ੭ ○Д○)⊃'];
const colors = [
  '#d50000',
  '#C51162',
  '#AA00FF',
  '#6200EA',
  '#304FFE',
  '#2962FF',
  '#0091EA',
  '#00B8D4',
  '#00BFA5',
  '#00C853',
  '#64DD17',
  '#AEEA00',
  '#FFD600',
  '#FFAB00',
  '#FF6D00',
  '#DD2C00',
];
let counter = sparkles.length;
let guyCounter = 0;
let colorCounter = 0;
let sparklesSpans = [];
 animationEl.addEventListener('click', () => {
  if (!playing) {
    initializeAnimation();
    sparklesAnimation = setInterval(animateSparkles, speed);
    guyAnimation = setInterval(animateGuy, speed);
    playing = true;
  } else if (speed > limitC) {
    speedUp = true;
  }
});
 function initializeAnimation() {
  sparklesSpans = [...sparkles].map(sparkle => {
    const span = document.createElement('span');
    span.textContent = sparkle;
    span.style.color = nextColor();
    return span;
  });
  sparklesEl.innerHTML = '';
  sparklesSpans.forEach(sparkle => {
    sparklesEl.appendChild(sparkle);
  });
}
 function nextColor() {
  if (colorCounter < 0) {
    colorCounter = colors.length - 1;
  }
  const color = colors[colorCounter--];
  return color;
}
 function randomProjectile() {
  return projectiles[getRandomInt(projectiles.length)];
}
 function animateSparkles() {
  counter++;
  const sparkle = sparklesEl.lastChild;
  sparklesEl.removeChild(sparkle);
   if (counter >= sparkles.length) {
    counter = 0;
    const span = document.createElement('span');
    span.textContent = randomProjectile();
    span.style.color = nextColor();
    sparklesEl.insertBefore(span, sparklesEl.firstChild);
  } else {
    sparkle.style.color = nextColor();
    sparklesEl.insertBefore(sparkle, sparklesEl.firstChild);
  }
   if (!bugs && speed < limitB) {
    bugs = true;
    projectiles.push('🐛', '👾');
  }
   if (speedUp) {
    speedUp = false;
    speed *= increment;
    clearInterval(sparklesAnimation);
    sparklesAnimation = setInterval(animateSparkles, speed);
  }
}
 function animateGuy() {
  if (speed > limitA) {
    guyEl.textContent = guyFramesA[guyCounter++];
  } else if (speed < limitA && speed > limitB) {
    guyEl.textContent = guyFramesB[guyCounter++];
  } else if (speed < limitB && speed > limitC) {
    guyEl.textContent = guyFramesC[guyCounter++];
  } else if (speed < limitC) {
    flipTable();
  }
   if (guyCounter >= guyFramesA.length) guyCounter = 0;
   if (speedUp) {
    clearInterval(guyAnimation);
    guyAnimation = setInterval(animateGuy, speed);
  }
}
 function flipTable() {
  clearInterval(sparklesAnimation);
  clearInterval(guyAnimation);
  setInterval(() => {
    const remainingSparkles = [...sparklesEl.textContent];
    remainingSparkles.pop();
    remainingSparkles.unshift(' ');
    sparklesEl.textContent = remainingSparkles.join('');
  }, speed);
  setTimeout(() => {
    guyEl.textContent = '( ノO‿O)ノ';
    sparklesEl.textContent = '';
    const laptop = document.querySelector('.laptop');
    const laptopTop = document.querySelector('.laptop-top');
    laptopTop.textContent = '    ______';
    laptop.textContent = '彡彡/___/';
  }, 1500);
}
 function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
 // -----
 createEmailAnchor(['jefferson','w','lam','@','gmail','.','com'], 'email');
 function createEmailAnchor(array, anchorId) {
  var email = array.join('');
  var elAnchor = document.getElementById(anchorId);
  elAnchor.href = 'mailto:' + email + '?subject=Reaching Out';
  elAnchor.innerHTML = email;
}
